import { Injectable } from '@nestjs/common';
import { CreateFlavorDto } from './dto/create-flavor.dto';
import { UpdateFlavorDto } from './dto/update-flavor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { InputJsonValue } from 'generated/prisma/runtime/library';

@Injectable()
export class FlavorsService {
  constructor(private prismaService: PrismaService) {}

  async create(createFlavorDto: CreateFlavorDto) {
    const existingFlavor = await this.prismaService.flavor.findFirst({
      where: { name: createFlavorDto.slug },
    });

    if (existingFlavor) {
      throw new Error(
        `Flavor with slug ${createFlavorDto.slug} already exists`,
      );
    }

    return this.prismaService.flavor.create({
      data: {
        ...createFlavorDto,
        prices: createFlavorDto.prices as unknown as InputJsonValue,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  findAll() {
    return this.prismaService.flavor.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} flavor`;
  }

  update(id: number, updateFlavorDto: UpdateFlavorDto) {
    return `This action updates a #${id} flavor`;
  }

  remove(id: number) {
    return `This action removes a #${id} flavor`;
  }
}
