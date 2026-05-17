import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  app.useLogger(new ConsoleLogger({
    prefix: configService.get("app.name"),
    logLevels: [configService.get("app.logLevel")],
    timestamp: false
  }));

  const docBuilder = new DocumentBuilder()
    .setTitle("Stock Management")
    .setDescription("Stock & Category Management API")
    .setVersion('1.0')
    //    .addTag('')
    .build();

  const options: SwaggerCustomOptions = {
    ui: configService.get("app.env") != "production",
    raw: configService.get("app.env") != "production" ? ['json'] : [],
    explorer: configService.get("app.env") != "production",
  }

  const documentFactory = () => SwaggerModule.createDocument(app, docBuilder);
  SwaggerModule.setup('api', app, documentFactory, options);

  await app.listen(configService.get("app.port")!);
}
bootstrap();
