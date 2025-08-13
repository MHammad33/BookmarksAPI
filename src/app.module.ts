import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoConnectionService } from './db/mongo-connection.service';

@Module({
  imports: [
    // Load .env variables
    ConfigModule.forRoot({ isGlobal: true }),

    // Connect to MongoDB using the env variable
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
  ],
  providers: [AppService, MongoConnectionService],
})
export class AppModule {}
