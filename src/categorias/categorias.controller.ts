import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFile, ParseUUIDPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) { }

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  create(
    @Body('createCategoriaDto') createCategoriaDtoString: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    const createCategoriaDto: CreateCategoriaDto = JSON.parse(createCategoriaDtoString);
    return this.categoriasService.create(createCategoriaDto, file);
  }

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('imagen'))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('updateCategoriaDto') updateCategoriaDtoString: string,
    @UploadedFile() file?: Express.Multer.File
  ) {
    const updateCategoriaDto: UpdateCategoriaDto = JSON.parse(updateCategoriaDtoString);
    return this.categoriasService.update(id, updateCategoriaDto, file);
  }

  @Patch(':id')
  updateEstado(
    @Param('id') id: string,
  ) {
    return this.categoriasService.updateEstado(id);
  }

}
