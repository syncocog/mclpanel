import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from './entities/server.entity';
import { ServersService } from './servers.service';
import { ServersController } from './servers.controller';
import { DaemonModule } from '../daemon/daemon.module';

@Module({
  imports: [TypeOrmModule.forFeature([Server]), DaemonModule],
  providers: [ServersService],
  controllers: [ServersController],
  exports: [ServersService],
})
export class ServersModule {}
