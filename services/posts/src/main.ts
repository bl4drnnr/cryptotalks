import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);
  const port = process.env.POSTS_SERVICE_PORT;

  await app.listen(port, () => {
    console.log(`Posts API has been successfully started on port: ${port}.`);
  });
})();
