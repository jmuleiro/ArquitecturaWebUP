import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.useLogger(new ConsoleLogger({
    prefix: configService.get("app.name"),
    logLevels: [configService.get("app.logLevel")],
    timestamp: false
  }))
  await app.listen(configService.get("app.port")!);
}
bootstrap();
