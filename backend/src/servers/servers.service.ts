import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Server } from './entities/server.entity';
import { DaemonService } from '../daemon/daemon.service';

@Injectable()
export class ServersService {
  constructor(
    @InjectRepository(Server)
    private serversRepository: Repository<Server>,
    private daemonService: DaemonService,
  ) {}

  async create(serverData: Partial<Server>): Promise<Server> {
    const server = this.serversRepository.create({
      ...serverData,
      identifier: this.generateIdentifier(),
      status: 'installing',
    });
    const saved = await this.serversRepository.save(server);
    
    await this.daemonService.createServer(saved);
    
    return saved;
  }

  async findAll(): Promise<Server[]> {
    return this.serversRepository.find({ relations: ['owner'] });
  }

  async findOne(id: number): Promise<Server> {
    return this.serversRepository.find({ where: { id }, relations: ['owner'] })[0];
  }

  async findByUser(userId: number): Promise<Server[]> {
    return this.serversRepository.find({ where: { owner: { id: userId } } });
  }

  async update(id: number, serverData: Partial<Server>): Promise<Server> {
    await this.serversRepository.update(id, serverData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const server = await this.findOne(id);
    await this.daemonService.deleteServer(server.identifier);
    await this.serversRepository.delete(id);
  }

  async start(id: number): Promise<void> {
    const server = await this.findOne(id);
    await this.daemonService.startServer(server.identifier);
    await this.update(id, { status: 'starting' });
  }

  async stop(id: number): Promise<void> {
    const server = await this.findOne(id);
    await this.daemonService.stopServer(server.identifier);
    await this.update(id, { status: 'stopping' });
  }

  async restart(id: number): Promise<void> {
    await this.stop(id);
    setTimeout(() => this.start(id), 3000);
  }

  async sendCommand(id: number, command: string): Promise<void> {
    const server = await this.findOne(id);
    await this.daemonService.sendCommand(server.identifier, command);
  }

  private generateIdentifier(): string {
    return `srv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
