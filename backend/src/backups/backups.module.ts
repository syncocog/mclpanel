import { Module } from '@nestjs/common';
import { BackupsService } from './backups.service';
import { BackupsController } from './backups.controller';
import { StorageModule } from '../storage/storage.module';
import { ServersModule } from '../servers/servers.module';

@Module({
  imports: [StorageModule, ServersModule],
  providers: [BackupsService],
  controllers: [BackupsController],
})
export class BackupsModule {}
