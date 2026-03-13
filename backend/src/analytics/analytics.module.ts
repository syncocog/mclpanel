import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { ServersModule } from '../servers/servers.module';
import { DaemonModule } from '../daemon/daemon.module';

@Module({
  imports: [ServersModule, DaemonModule],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
