import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ServersService } from './servers.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('servers')
@UseGuards(JwtAuthGuard)
export class ServersController {
  constructor(private readonly serversService: ServersService) {}

  @Post()
  create(@Body() createData: any, @Request() req) {
    return this.serversService.create({ ...createData, owner: { id: req.user.userId } });
  }

  @Get()
  findAll(@Request() req) {
    if (req.user.role === 'admin') {
      return this.serversService.findAll();
    }
    return this.serversService.findByUser(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serversService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.serversService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serversService.remove(+id);
  }

  @Post(':id/start')
  start(@Param('id') id: string) {
    return this.serversService.start(+id);
  }

  @Post(':id/stop')
  stop(@Param('id') id: string) {
    return this.serversService.stop(+id);
  }

  @Post(':id/restart')
  restart(@Param('id') id: string) {
    return this.serversService.restart(+id);
  }

  @Post(':id/command')
  sendCommand(@Param('id') id: string, @Body() body: { command: string }) {
    return this.serversService.sendCommand(+id, body.command);
  }
}
