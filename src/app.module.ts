import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FlavorsModule } from './flavors/flavors.module';

@Module({
  imports: [PrismaModule, ProductsModule, AuthModule, FlavorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
