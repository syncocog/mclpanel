import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('server/:serverId/metrics')
  getServerMetrics(@Param('serverId') serverId: string, @Query('identifier') identifier: string) {
    return this.analyticsService.getServerMetrics(+serverId, identifier);
  }

  @Get('server/:serverId/history')
  getHistoricalData(@Param('serverId') serverId: string, @Query('range') range: string) {
    return this.analyticsService.getHistoricalData(+serverId, range);
  }

  @Get('server/:serverId/players')
  getPlayerActivity(@Param('serverId') serverId: string) {
    return this.analyticsService.getPlayerActivity(+serverId);
  }
}
