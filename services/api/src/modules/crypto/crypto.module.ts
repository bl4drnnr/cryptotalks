import { Module } from '@nestjs/common';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CRYPTO_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'crypto',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'crypto-consumer'
          }
        }
      }
    ])
  ],
  controllers: [CryptoController],
  providers: [CryptoService]
})
export class CryptoModule {}
