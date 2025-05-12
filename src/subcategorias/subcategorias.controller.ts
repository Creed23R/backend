import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SubcategoriasService } from './subcategorias.service';
import { CreateSubcategoriaDto } from './dto/create-subcategoria.dto';
import { UpdateSubcategoriaDto } from './dto/update-subcategoria.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('subcategorias')
export class SubcategoriasController {
  constructor(private readonly subcategoriasService: SubcategoriasService) { }

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  create(
    @Body('createSubcategoriaDto') createSubcategoriaDtoString: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    const createSubcategoriaDto: CreateSubcategoriaDto = JSON.parse(createSubcategoriaDtoString);
    return this.subcategoriasService.create(createSubcategoriaDto, file);
  }

  @Get()
  findAll() {
    return this.subcategoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoriasService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('imagen'))
  update(
    @Param('id') id: string,
    @Body('updateSubcategoriaDto') updateSubcategoriaDtoString: string,
    @UploadedFile() file?: Express.Multer.File
  ) {
    const updateSubcategoriaDto: UpdateSubcategoriaDto = JSON.parse(updateSubcategoriaDtoString);
    return this.subcategoriasService.update(id, updateSubcategoriaDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcategoriasService.remove(+id);
  }
}
