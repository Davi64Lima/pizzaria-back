import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { InvalidCredentialsError } from './errors';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = bcrypt.hashSync(dto.password, 10);

    const existingUser = await this.prismaService.user.findFirst({
      where: {
        email: dto.phone,
      },
    });

    if (existingUser) {
      throw new Error('Phone already in use');
    }

    const Address = await this.prismaService.address.create({
      data: {
        street: dto.address.street,
        number: dto.address.number,
        complement: dto.address.complement,
        city: dto.address.city,
        state: dto.address.state,
        zipCode: dto.address.zipCode,
      },
    });

    const user = await this.prismaService.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        address: { connect: { id: Address.id } },
        password: hashedPassword,
      },
    });

    const payload = {
      sub: user.uuid,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: dto.email,
        password: dto.password,
      },
    });

    if (!user || !bcrypt.compareSync(dto.password, user.password)) {
      throw new InvalidCredentialsError();
    }

    const payload = {
      sub: user.uuid,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
