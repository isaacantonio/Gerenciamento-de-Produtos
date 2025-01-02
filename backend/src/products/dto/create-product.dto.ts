import { IsString, IsNumber, IsPositive, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  nome: string;

  @IsNumber()
  @IsPositive()
  preco: number;

  @IsNumber()
  @Min(0)
  quantidade: number;
}
