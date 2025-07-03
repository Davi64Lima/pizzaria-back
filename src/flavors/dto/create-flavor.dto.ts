import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFlavorDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  slug: string;
  @IsString()
  description: string;
  @IsNotEmpty()
  prices: FlavorPrices;
}

export interface FlavorPrices {
  medium: number;
  large: number;
  family: number;
}
