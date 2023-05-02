import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import * as yaml from 'yaml';

(async () => {
  const app = await NestFactory.create(AppModule);
  const port = process.env.API_PORT;

  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('Cryptotalks - API Gateway')
    .setDescription("Documentation of Cryptotalks' API Gateway.")
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const yamlString: string = yaml.stringify(document, {});

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  fs.writeFileSync('./docs/swagger-spec.json', JSON.stringify(document));
  fs.writeFileSync('./docs/swagger-spec.yaml', yamlString);

  SwaggerModule.setup('docs', app, document);

  await app.listen(port, () => {
    console.log(`Main API has been successfully started on port: ${port}.`);
  });
})();
