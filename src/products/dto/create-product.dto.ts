/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Matches(/^[a-z0-9-]+$/, {
    message:
      'Slug must be lowercase and can only contain letters, numbers, and hyphens.',
  })
  @MaxLength(300)
  @IsString()
  @IsNotEmpty()
  slug: string;

  @MaxLength(500)
  @IsString()
  @IsNotEmpty()
  description: string;

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @MaxLength(500)
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  isActive: boolean;
}
