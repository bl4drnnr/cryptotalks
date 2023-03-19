import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);
  const port = process.env.API_PORT;

  await app.listen(port, () => {
    console.log(`Main API has been successfully started on port: ${port}.`);
  });
})();
