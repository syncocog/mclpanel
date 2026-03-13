import { Controller, Post, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { BackupsService } from './backups.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('backups')
@UseGuards(JwtAuthGuard)
export class BackupsController {
  constructor(private readonly backupsService: BackupsService) {}

  @Post('server/:serverId')
  createBackup(@Param('serverId') serverId: string) {
    return this.backupsService.createBackup(+serverId);
  }

  @Get('server/:serverId')
  listBackups(@Param('serverId') serverId: string) {
    return this.backupsService.listBackups(+serverId);
  }

  @Post('restore/:serverId/:backupId')
  restoreBackup(@Param('serverId') serverId: string, @Param('backupId') backupId: string) {
    return this.backupsService.restoreBackup(+serverId, backupId);
  }

  @Delete(':backupId')
  deleteBackup(@Param('backupId') backupId: string) {
    return this.backupsService.deleteBackup(backupId);
  }
}
