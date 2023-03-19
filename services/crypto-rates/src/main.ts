import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);
  const port = process.env.CRYPTO_RATES_SERVICE_PORT;

  await app.listen(port, () => {
    console.log(
      `Cryptocurrencies rates API has been successfully started on port: ${port}.`
    );
  });
})();
