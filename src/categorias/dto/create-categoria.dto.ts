import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EstadoRegistro } from '../../../generated/prisma';

export class CreateCategoriaDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    icon: string;

    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @IsOptional()
    @IsString()
    foto?: string;

    @IsNotEmpty()
    @IsEnum(EstadoRegistro)
    estado: EstadoRegistro;
}
