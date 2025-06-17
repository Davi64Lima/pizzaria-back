export class CreateProductDto {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
