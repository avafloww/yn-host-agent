import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiKeyGuard } from './auth/api-key.guard';
import { SanitizePipe } from './sanitize.pipe';

async function bootstrapApp() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new SanitizePipe());
  app.useGlobalGuards(new ApiKeyGuard());

  await app.listen(4001);
}

if (process.argv.length > 2) {
  require('./console');
} else {
  bootstrapApp();
}
