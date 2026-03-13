import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServersModule } from './servers/servers.module';
import { DaemonModule } from './daemon/daemon.module';
import { MinecraftModule } from './minecraft/minecraft.module';
import { BackupsModule } from './backups/backups.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { WebsocketModule } from './websocket/websocket.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV === 'development',
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    AuthModule,
    UsersModule,
    ServersModule,
    DaemonModule,
    MinecraftModule,
    BackupsModule,
    AnalyticsModule,
    WebsocketModule,
    StorageModule,
  ],
})
export class AppModule {}
