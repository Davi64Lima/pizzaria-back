import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductSlugAlreadyExistsErrorFilter } from './products/filters/product-slug-already-exists.filter';
import { NotFoundErrorFilter } from './common/filters/not-found-error.filter';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useGlobalFilters(
    new ProductSlugAlreadyExistsErrorFilter(),
    new NotFoundErrorFilter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/uploads/',
  });

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
