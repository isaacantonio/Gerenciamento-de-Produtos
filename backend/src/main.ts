import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products/products.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
