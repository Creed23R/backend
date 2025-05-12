import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProductosService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService
  ) { }

  async create(createProductoDto: CreateProductoDto, file: Express.Multer.File) {
    try {
      let fotoUrl = null;
      if (file) {
        const uploadResult = await this.cloudinary.uploadImage(file, 'prueba/productos');
        if (!uploadResult || !uploadResult.secure_url) {
          throw new BadRequestException('Error al subir la imagen a Cloudinary');
        }
        fotoUrl = uploadResult.secure_url;
      }

      const newProducto = await this.prisma.producto.create({
        data: {
          codigo: createProductoDto.codigo,              // Se pasa directamente el valor desestructurado
          descripcion: createProductoDto.descripcion,         // Se pasa directamente el valor desestructurado
          unidadVenta: createProductoDto.unidadVenta,         // Se pasa directamente el valor desestructurado
          subcategoriaId: createProductoDto.subcategoriaId,      // Se pasa directamente el valor desestructurado
          confUnidadVenta: createProductoDto.confUnidadVenta,     // Se pasa directamente el valor desestructurado
          infoAdicional: createProductoDto.infoAdicional,       // Se pasa directamente el valor desestructurado
          estado: createProductoDto.estado,              // Se pasa directamente el valor desestructurado
          foto: fotoUrl || undefined, // Foto opcional
          moneda: createProductoDto.moneda,              // Se pasa directamente el valor desestructurado
          valorVenta: createProductoDto.valorVenta,
          tasaImpuesto: createProductoDto.tasaImpuesto,
          precioVenta: createProductoDto.precioVenta
        },
        include: {
          subcategoria: true,
          stockRegistro: true,
        }
      });

      // Crear registro de stock inicial para el producto
      await this.prisma.stock.create({
        data: {
          productoId: newProducto.id,
          stockFisico: 0,
          stockComprometido: 0,
        }
      });

      return newProducto;
    } catch (error) {
      console.error('Error al crear producto:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }


  async findAll(
    page: number = 1,
    limit: number = 6,
    search: string = '',
    sortBy: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc'
  ) {
    try {
      const skip = (page - 1) * limit;

      const orderBy: Record<string, 'asc' | 'desc'> = {};
      orderBy[sortBy] = sortOrder;

      // Contar total de productos que coinciden con la búsqueda
      const totalProducts = await this.prisma.producto.count({
        where: {
          descripcion: {
            contains: search,
            mode: 'insensitive',
          }
        }
      });

      // Obtener productos paginados
      const productosRaw = await this.prisma.producto.findMany({
        where: {
          descripcion: {
            contains: search,
            mode: 'insensitive',
          }
        },
        include: {
          subcategoria: {
            select: {
              nombre: true
            }
          },
          stockRegistro: {
            select: {
              stockComprometido: true,
              stockFisico: true
            }
          }
        },
        orderBy,
        skip,
        take: limit
      });

      // Calcular el total de páginas
      const totalPages = Math.ceil(totalProducts / limit);

      // Formatear productos para la respuesta
      const productos = productosRaw.map(producto => {
        const { subcategoria, stockRegistro, ...rest } = producto;
        return {
          ...rest,
          subcategoria: subcategoria?.nombre || '',
          stockFisico: stockRegistro?.stockFisico || 0,
          stockComprometido: stockRegistro?.stockComprometido || 0
        };
      });

      // Devolver respuesta con metadatos de paginación
      return {
        productos,
        totalProducts,
        totalPages,
        currentPage: page,
      };
    } catch (error) {
      console.error('Error en findAll:', error);
      throw new InternalServerErrorException('Error al obtener los productos');
    }
  }

  async findOne(id: string) {
    try {
      const producto = await this.prisma.producto.findUnique({
        where: { id },
        include: {
          subcategoria: {
            include: {
              categoria: true
            }
          },
          stockRegistro: true
        }
      });

      if (!producto) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }

      return producto;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al obtener el producto');
    }
  }

  async update(id: string, updateProductoDto: UpdateProductoDto, file?: Express.Multer.File) {
    try {
      // Verificar que el producto existe
      const productoExists = await this.prisma.producto.findUnique({
        where: { id }
      });

      if (!productoExists) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }

      // Si hay un archivo nuevo, subir a Cloudinary
      let fotoUrl = updateProductoDto.foto;
      if (file) {
        const uploadResult = await this.cloudinary.uploadImage(file, 'prueba/productos');
        if (!uploadResult || !uploadResult.secure_url) {
          throw new BadRequestException('Error al subir la imagen a Cloudinary');
        }
        fotoUrl = uploadResult.secure_url;
      }

      // Actualizar el producto
      return await this.prisma.producto.update({
        where: { id },
        data: {
          ...updateProductoDto,
          foto: fotoUrl
        },
        include: {
          subcategoria: true,
          stockRegistro: true
        }
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar el producto');
    }
  }

  async remove(id: string) {
    try {
      // Verificar que el producto existe
      const producto = await this.prisma.producto.findUnique({
        where: { id }
      });

      if (!producto) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }

      // Eliminar el registro de stock asociado primero
      await this.prisma.stock.delete({
        where: { productoId: id }
      });

      // Eliminar el producto
      return await this.prisma.producto.delete({
        where: { id }
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al eliminar el producto');
    }
  }
}
