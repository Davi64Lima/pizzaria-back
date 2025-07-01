import { Injectable } from '@nestjs/common';
import { CreateFlavorDto } from './dto/create-flavor.dto';
import { UpdateFlavorDto } from './dto/update-flavor.dto';

@Injectable()
export class FlavorsService {
  create(createFlavorDto: CreateFlavorDto) {
    return 'This action adds a new flavor';
  }

  findAll() {
    return `This action returns all flavors`;
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
