import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeedModule } from './seed/seed.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriasModule } from './categorias/categorias.module';
import { SubcategoriasModule } from './subcategorias/subcategorias.module';
import { ProductosModule } from './productos/productos.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    SeedModule,
    CategoriasModule,
    SubcategoriasModule,
    ProductosModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaModule],
})
export class AppModule { }
