import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport, GrpcOptions } from '@nestjs/microservices';
import { AuthModule } from './auth.module';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { protobufPackage as AUTH_PROTOBUF_PACKAGE_NAME} from 'proto/generated/proto/auth';

// Configuração do cliente gRPC com reflexão
export const grpcClientOptions: GrpcOptions = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: 'localhost:5577',
    package: AUTH_PROTOBUF_PACKAGE_NAME,
    protoPath: join(__dirname, '../../../proto/auth.proto'),
  },
});

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  // Conecta o microserviço com a configuração gRPC
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
