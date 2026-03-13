import { Module } from '@nestjs/common';
import { MinecraftService } from './minecraft.service';
import { MinecraftController } from './minecraft.controller';
import { ServersModule } from '../servers/servers.module';
import { DaemonModule } from '../daemon/daemon.module';

@Module({
  imports: [ServersModule, DaemonModule],
  providers: [MinecraftService],
  controllers: [MinecraftController],
})
export class MinecraftModule {}
