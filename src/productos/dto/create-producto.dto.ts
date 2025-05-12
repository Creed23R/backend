import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';
import { EstadoRegistro, Moneda, UnidadVenta } from '../../../generated/prisma';

export class CreateProductoDto {
  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsEnum(UnidadVenta)
  unidadVenta: UnidadVenta;

  @IsNotEmpty()
  @IsUUID()
  subcategoriaId: string;

  @IsNotEmpty()
  @IsString()
  confUnidadVenta: string;

  @IsOptional()
  @IsString()
  infoAdicional?: string;

  @IsNotEmpty()
  @IsEnum(EstadoRegistro)
  estado: EstadoRegistro = 'A';

  @IsOptional()
  @IsString()
  foto?: string;

  @IsNotEmpty()
  @IsEnum(Moneda)
  moneda: Moneda;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  valorVenta: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  tasaImpuesto: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  precioVenta: number;

  //add stcok
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stockFisico: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stockComprometido: number;

}
