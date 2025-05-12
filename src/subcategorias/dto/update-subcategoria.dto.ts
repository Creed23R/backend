import { PartialType } from '@nestjs/mapped-types';
import { CreateSubcategoriaDto } from './create-subcategoria.dto';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { EstadoRegistro } from '../../../generated/prisma';

export class UpdateSubcategoriaDto extends PartialType(CreateSubcategoriaDto) {
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

    @IsOptional()
    @IsUUID()
    categoriaId?: string;
}
