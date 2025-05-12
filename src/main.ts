import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:8081'], // Permite solo solicitudes desde localhost:3000
    methods: 'GET,POST,PUT,DELETE,PATCH', // Permite solo ciertos métodos
    allowedHeaders: 'Content-Type, Accept', // Permite solo ciertos encabezados
  });
  await app.listen(3001);
}
bootstrap();
