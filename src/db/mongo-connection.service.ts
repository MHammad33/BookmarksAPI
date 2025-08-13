import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class MongoConnectionService implements OnApplicationBootstrap {
  private readonly logger = new Logger(MongoConnectionService.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}

  onApplicationBootstrap() {
    if (Number(this.connection.readyState) === 1) {
      this.logger.log(`✅ MongoDB Connected to: ${this.connection.name}`);
    }

    this.connection.on('connected', () => {
      this.logger.log('✅ MongoDB connection established successfully.');
    });

    this.connection.on('error', (error) => {
      this.logger.error('❌ MongoDB connection error:', error);
    });

    this.connection.on('disconnected', () => {
      this.logger.warn('⚠️ MongoDB Disconnected');
    });
  }
}
