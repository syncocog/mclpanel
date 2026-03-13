import { Controller, Post, Delete, Param, Body, Get, UseGuards } from '@nestjs/common';
import { MinecraftService } from './minecraft.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('minecraft')
@UseGuards(JwtAuthGuard)
export class MinecraftController {
  constructor(private readonly minecraftService: MinecraftService) {}

  @Post(':serverId/whitelist')
  addToWhitelist(@Param('serverId') serverId: string, @Body() body: { playerName: string }) {
    return this.minecraftService.addToWhitelist(+serverId, body.playerName);
  }

  @Delete(':serverId/whitelist/:playerName')
  removeFromWhitelist(@Param('serverId') serverId: string, @Param('playerName') playerName: string) {
    return this.minecraftService.removeFromWhitelist(+serverId, playerName);
  }

  @Post(':serverId/ban')
  banPlayer(@Param('serverId') serverId: string, @Body() body: { playerName: string; reason?: string }) {
    return this.minecraftService.banPlayer(+serverId, body.playerName, body.reason);
  }

  @Delete(':serverId/ban/:playerName')
  unbanPlayer(@Param('serverId') serverId: string, @Param('playerName') playerName: string) {
    return this.minecraftService.unbanPlayer(+serverId, playerName);
  }

  @Post(':serverId/kick')
  kickPlayer(@Param('serverId') serverId: string, @Body() body: { playerName: string; reason?: string }) {
    return this.minecraftService.kickPlayer(+serverId, body.playerName, body.reason);
  }

  @Get(':serverId/players')
  getOnlinePlayers(@Param('serverId') serverId: string) {
    return this.minecraftService.getOnlinePlayers(+serverId);
  }

  @Get(':serverId/tps')
  getServerTPS(@Param('serverId') serverId: string) {
    return this.minecraftService.getServerTPS(+serverId);
  }
}
