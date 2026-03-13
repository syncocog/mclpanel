import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DaemonService {
  private daemonUrl = process.env.DAEMON_URL || 'http://daemon:8080';
  private daemonSecret = process.env.DAEMON_SECRET;

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.daemonSecret}`,
      'Content-Type': 'application/json',
    };
  }

  async createServer(server: any): Promise<void> {
    await axios.post(`${this.daemonUrl}/servers`, {
      identifier: server.identifier,
      image: server.dockerImage || 'itzg/minecraft-server:latest',
      resources: server.resources,
      ports: server.ports,
      environment: {
        EULA: 'TRUE',
        TYPE: server.minecraftConfig?.serverType || 'PAPER',
        VERSION: server.minecraftConfig?.version || 'LATEST',
      },
    }, { headers: this.getHeaders() });
  }

  async startServer(identifier: string): Promise<void> {
    await axios.post(`${this.daemonUrl}/servers/${identifier}/start`, {}, { headers: this.getHeaders() });
  }

  async stopServer(identifier: string): Promise<void> {
    await axios.post(`${this.daemonUrl}/servers/${identifier}/stop`, {}, { headers: this.getHeaders() });
  }

  async deleteServer(identifier: string): Promise<void> {
    await axios.delete(`${this.daemonUrl}/servers/${identifier}`, { headers: this.getHeaders() });
  }

  async sendCommand(identifier: string, command: string): Promise<void> {
    await axios.post(`${this.daemonUrl}/servers/${identifier}/command`, { command }, { headers: this.getHeaders() });
  }

  async getServerStats(identifier: string): Promise<any> {
    const response = await axios.get(`${this.daemonUrl}/servers/${identifier}/stats`, { headers: this.getHeaders() });
    return response.data;
  }

  async getServerLogs(identifier: string, lines: number = 100): Promise<string[]> {
    const response = await axios.get(`${this.daemonUrl}/servers/${identifier}/logs?lines=${lines}`, { headers: this.getHeaders() });
    return response.data;
  }
}
