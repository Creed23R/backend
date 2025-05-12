import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSubcategoriaDto } from './dto/create-subcategoria.dto';
import { UpdateSubcategoriaDto } from './dto/update-subcategoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '../../generated/prisma';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class SubcategoriasService {

  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService
  ) { }

  async create(createSubcategoriaDto: CreateSubcategoriaDto, file: Express.Multer.File) {

    try {

      let fotoUrl = null;
      if (file) {
        const uploadResult = await this.cloudinary.uploadImage(file, 'prueba/subcategorias');
        if (!uploadResult || !uploadResult.secure_url) {
          throw new BadRequestException('Error al subir la imagen a Cloudinary');
        }
        fotoUrl = uploadResult.secure_url;
      }

      const newSubcategoria = await this.prisma.subcategoria.create({
        data: {
          nombre: createSubcategoriaDto.nombre,
          descripcion: createSubcategoriaDto.descripcion,
          foto: fotoUrl || undefined,
          estado: createSubcategoriaDto.estado,
          categoriaId: createSubcategoriaDto.categoriaId,
          icon: createSubcategoriaDto.icon,
        },
        include: {
          categoria: true
        }
      });

      return newSubcategoria;

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Ya existe una subcategoría con ese nombre');
        }
      }
      throw new InternalServerErrorException('Error al crear la subcategoría');
    }
  }

  async findAll() {
    try {
      const categorias = await this.prisma.subcategoria.findMany({
        include: {
          categoria: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      return categorias;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las subcategorías');
    }
  }

  async findOne(id: string) {
    const subcategoria = await this.prisma.subcategoria.findUnique({
      where: {
        id: id,
      },
      include: {
        categoria: true,
      },
    });
    return subcategoria
  }

  async update(id: string, updateSubcategoriaDto: UpdateSubcategoriaDto, file?: Express.Multer.File) {
    try {

      const subcategoriaExists = await this.prisma.subcategoria.findUnique({
        where: { id }
      });

      if (!subcategoriaExists) {
        throw new BadRequestException(`Subcategoría con ID ${id} no encontrada`);
      }

      let fotoUrl = null;

      if (file) {
        const uploadResult = await this.cloudinary.uploadImage(file, 'prueba/subcategorias');
        if (!uploadResult || !uploadResult.secure_url) {
          throw new BadRequestException('Error al subir la imagen a Cloudinary');
        }
        fotoUrl = uploadResult.secure_url;
      }

      const updatedSubcategoria = await this.prisma.subcategoria.update({
        where: { id },
        data: {
          nombre: updateSubcategoriaDto.nombre,
          descripcion: updateSubcategoriaDto.descripcion,
          foto: fotoUrl || undefined,
          estado: updateSubcategoriaDto.estado,
          categoriaId: updateSubcategoriaDto.categoriaId,
          icon: updateSubcategoriaDto.icon,
        },
        include: {
          categoria: true
        }
      });

      return updatedSubcategoria;

    } catch (error) {

    }
  }

  remove(id: number) {
    return `This action removes a #${id} subcategoria`;
  }
}
