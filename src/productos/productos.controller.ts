import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseUUIDPipe, Query, Put } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) { }

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  create(
    @Body('createProductoDto') createProductoDtoString: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    const createProductoDto: CreateProductoDto = JSON.parse(createProductoDtoString);
    return this.productosService.create(createProductoDto, file);
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc'
  ) {
    const pageNumber = page ? parseInt(page) : 1;
    const limitNumber = limit ? parseInt(limit) : 6;

    return this.productosService.findAll(
      pageNumber,
      limitNumber,
      search,
      sortBy,
      sortOrder
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('imagen'))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('updateProductoDto') updateProductoDtoString: string,
    @UploadedFile() file?: Express.Multer.File
  ) {
    const updateProductoDto: CreateProductoDto = JSON.parse(updateProductoDtoString);
    return this.productosService.update(id, updateProductoDto, file);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosService.remove(id);
  }

  @Post('update-state')
  updateState(
    @Body('productIds') ids: string[],
  ) {
    return this.productosService.updateEstado(ids);
  }

  @Post('update-prices')
  updatePrices(
    @Body('productIds') ids: string[],
    @Body('percentageIncrease') percentageIncrease: number,
  ) {
    return this.productosService.updatePrices(ids, percentageIncrease);
  }

}
