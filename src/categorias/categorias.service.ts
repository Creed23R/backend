import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EstadoRegistro, Prisma } from '../../generated/prisma';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class CategoriasService {

  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService
  ) { }

  async create(createCategoriaDto: CreateCategoriaDto, file: Express.Multer.File) {
    try {
      let fotoUrl = null;
      if (file) {
        const uploadResult = await this.cloudinary.uploadImage(file, 'prueba/categorias');
        if (!uploadResult || !uploadResult.secure_url) {
          throw new BadRequestException('Error al subir la imagen a Cloudinary');
        }
        fotoUrl = uploadResult.secure_url;
      }

      const newCategoria = await this.prisma.categoria.create({
        data: {
          nombre: createCategoriaDto.nombre,
          descripcion: createCategoriaDto.descripcion,
          foto: fotoUrl || undefined,
          icon: '',
          estado: createCategoriaDto.estado,
        },
        include: {
          subcategorias: true
        }
      });

      return newCategoria;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Ya existe una categoría con ese nombre');
        }
      }
      throw new InternalServerErrorException('Error al crear la categoría');
    }
  }

  async findAll() {
    try {
      const categorias = await this.prisma.categoria.findMany({
        include: {
          subcategorias: {
            orderBy: {
              createdAt: 'desc'
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      return categorias;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las categorías');
    }
  }

  async findOne(id: string) {
    try {
      const categoria = await this.prisma.categoria.findUnique({
        where: {
          id: id.toString()
        },
        include: {
          subcategorias: true
        }
      });

      if (!categoria) {
        throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
      }
      return categoria;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al obtener la categoría');
    }
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto, file?: Express.Multer.File) {
    try {
      const categoriaExists = await this.prisma.categoria.findUnique({
        where: { id: id.toString() }
      });
      if (!categoriaExists) {
        throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
      }
      let fotoUrl = null;

      if (file) {
        const uploadResult = await this.cloudinary.uploadImage(file, 'prueba/categorias');
        if (!uploadResult || !uploadResult.secure_url) {
          throw new BadRequestException('Error al subir la imagen a Cloudinary');
        }
        fotoUrl = uploadResult.secure_url;
      }

      const updatedCategoria = await this.prisma.categoria.update({
        where: { id },
        data: {
          nombre: updateCategoriaDto.nombre,
          descripcion: updateCategoriaDto.descripcion,
          foto: fotoUrl || undefined,
          estado: updateCategoriaDto.estado,
        },
        include: {
          subcategorias: true
        }
      });

      return updatedCategoria;

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar el producto');
    }
  }

  async updateEstado(id: string) {
    try {
      const categoriaExists = await this.prisma.categoria.findUnique({
        where: { id: id.toString() }
      });
      if (!categoriaExists) {
        throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
      }

      const estado = categoriaExists.estado === EstadoRegistro.A ? EstadoRegistro.I : EstadoRegistro.A;

      const updatedCategoria = await this.prisma.categoria.update({
        where: { id },
        data: {
          estado: estado,
        }
      });

      return updatedCategoria;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar el estado de la categoría');
    }
  }


}
