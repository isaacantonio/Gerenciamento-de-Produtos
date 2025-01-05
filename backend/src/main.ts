import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products/products.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
