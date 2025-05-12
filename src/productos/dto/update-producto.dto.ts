import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';
import { EstadoRegistro, Moneda, UnidadVenta } from '../../../generated/prisma';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
    @IsOptional()
    @IsString()
    codigo?: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsEnum(UnidadVenta)
    unidadVenta?: UnidadVenta;

    @IsOptional()
    @IsUUID()
    subcategoriaId?: string;

    @IsOptional()
    @IsString()
    confUnidadVenta?: string;

    @IsOptional()
    @IsString()
    infoAdicional?: string;

    @IsOptional()
    @IsEnum(EstadoRegistro)
    estado?: EstadoRegistro;

    @IsOptional()
    @IsString()
    foto?: string;

    @IsOptional()
    @IsEnum(Moneda)
    moneda?: Moneda;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    valorVenta?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    tasaImpuesto?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    precioVenta?: number;
}
