import { Injectable } from '@nestjs/common';
import { ServersService } from '../servers/servers.service';
import { DaemonService } from '../daemon/daemon.service';

@Injectable()
export class MinecraftService {
  constructor(
    private serversService: ServersService,
    private daemonService: DaemonService,
  ) {}

  async addToWhitelist(serverId: number, playerName: string): Promise<void> {
    await this.serversService.sendCommand(serverId, `whitelist add ${playerName}`);
  }

  async removeFromWhitelist(serverId: number, playerName: string): Promise<void> {
    await this.serversService.sendCommand(serverId, `whitelist remove ${playerName}`);
  }

  async banPlayer(serverId: number, playerName: string, reason?: string): Promise<void> {
    const command = reason ? `ban ${playerName} ${reason}` : `ban ${playerName}`;
    await this.serversService.sendCommand(serverId, command);
  }

  async unbanPlayer(serverId: number, playerName: string): Promise<void> {
    await this.serversService.sendCommand(serverId, `pardon ${playerName}`);
  }

  async kickPlayer(serverId: number, playerName: string, reason?: string): Promise<void> {
    const command = reason ? `kick ${playerName} ${reason}` : `kick ${playerName}`;
    await this.serversService.sendCommand(serverId, command);
  }

  async installPlugin(serverId: number, pluginUrl: string): Promise<void> {
    // Implementation would download plugin and place in plugins folder
    // This is a simplified version
    return;
  }

  async getOnlinePlayers(serverId: number): Promise<string[]> {
    // Would parse server logs or use RCON to get player list
    return [];
  }

  async getServerTPS(serverId: number): Promise<number> {
    // Would query server metrics
    return 20.0;
  }
}
