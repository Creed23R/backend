import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Get('categorias')
  findAllCategorias() {
    return this.clientService.findAllCategorias();
  }

  @Get('subcategorias')
  findAllSubcategorias() {
    return this.clientService.findAllSubcategorias();
  }

  @Get('productos')
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc'
  ) {
    const pageNumber = page ? parseInt(page) : 1;
    const limitNumber = limit ? parseInt(limit) : 6;

    return this.clientService.findAllProducts(
      pageNumber,
      limitNumber,
      search,
      sortBy,
      sortOrder
    );
  }

}
