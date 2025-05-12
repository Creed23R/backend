import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { EstadoRegistro } from '../../../generated/prisma';

export class CreateSubcategoriaDto {
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

    @IsNotEmpty()
    @IsUUID()
    categoriaId: string;
}
