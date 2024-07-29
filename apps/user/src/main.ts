import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(__dirname, '../../../apps/user/proto/user.proto'),
      url: 'localhost:50061',
    },
  });
  await app.listen();
}
bootstrap();
