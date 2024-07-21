import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

const LIMITE_MIN = 10;
const LIMITE_MAX = 50;
const PAGINA_MIN = 1;

export class PaginacionQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(LIMITE_MIN, {
    message: `El valor mínimo para $property debe ser ${LIMITE_MIN}.`,
  })
  @Max(LIMITE_MAX, {
    message: `El valor máximo para $property debe ser ${LIMITE_MAX}.`,
  })
  @IsOptional()
  readonly limite: number = LIMITE_MIN;

  @Type(() => Number)
  @IsInt()
  @Min(PAGINA_MIN, {
    message: `El valor mínimo para $property debe ser ${PAGINA_MIN}.`,
  })
  @IsOptional()
  readonly pagina: number = PAGINA_MIN;

  @IsOptional()
  @IsString()
  readonly t?: string;

  @IsOptional()
  @IsString()
  readonly y?: string;

  @IsOptional()
  @IsString()
  readonly i?: string;

  @IsOptional()
  @IsString()
  readonly filtro?: string;

  get saltar(): number {
    return (this.pagina - 1) * this.limite;
  }
}
