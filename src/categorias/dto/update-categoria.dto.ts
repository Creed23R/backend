import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from './create-categoria.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EstadoRegistro } from '../../../generated/prisma';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsString()
    icon?: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsString()
    foto?: string;

    @IsOptional()
    @IsEnum(EstadoRegistro)
    estado?: EstadoRegistro;
}
