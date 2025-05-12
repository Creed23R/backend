import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientService {

  constructor(
    private prisma: PrismaService,
  ) { }

  async findAllSubcategorias() {
    try {
      const subcategorias = await this.prisma.subcategoria.findMany({
        include: {
          categoria: {
            select: {
              nombre: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        where: {
          estado: 'A'
        }
      });
      return subcategorias;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las subcategorías');
    }
  }

  async findAllCategorias() {
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
        },
        where: {
          estado: 'A'
        }
      });
      return categorias;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las categorías');
    }
  }

  async findAllProducts(
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
          },
          estado: 'A'
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
}
