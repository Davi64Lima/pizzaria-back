import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductSlugAlreadyExistsError } from './errors';
import { NotFoundError } from 'src/common/errors';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const existingProduct = await this.prismaService.product.findFirst({
      where: { name: createProductDto.name },
    });

    if (existingProduct) {
      throw new ProductSlugAlreadyExistsError(createProductDto.slug);
    }

    return this.prismaService.product.create({
      data: {
        ...createProductDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  async findOne(id: number) {
    const product = await this.prismaService.product.findFirst({
      where: { id },
    });

    if (!product) {
      throw new NotFoundError('Product', id);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    let product = await this.prismaService.product.update({
      where: { id },
      data: {
        ...updateProductDto,
        updatedAt: new Date(),
      },
    });

    if (product && product.id !== id && updateProductDto.slug) {
      throw new ProductSlugAlreadyExistsError(updateProductDto.slug);
    }

    product =
      product && product.id === id
        ? product
        : await this.prismaService.product.findFirst({
            where: { id },
          });

    if (!product) {
      throw new NotFoundError('Product', id);
    }

    return product;
  }

  async remove(id: number) {
    const product = await this.prismaService.product.delete({
      where: { id },
    });

    if (!product) {
      throw new NotFoundError('Product', id);
    }

    return product;
  }
}
