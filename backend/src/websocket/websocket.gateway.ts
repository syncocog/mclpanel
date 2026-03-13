import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients = new Map<string, Socket>();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.connectedClients.set(client.id, client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedClients.delete(client.id);
  }

  @SubscribeMessage('subscribe-server')
  handleSubscribeServer(client: Socket, serverId: string) {
    client.join(`server-${serverId}`);
    return { event: 'subscribed', data: serverId };
  }

  @SubscribeMessage('unsubscribe-server')
  handleUnsubscribeServer(client: Socket, serverId: string) {
    client.leave(`server-${serverId}`);
    return { event: 'unsubscribed', data: serverId };
  }

  emitServerStatus(serverId: number, status: string) {
    this.server.to(`server-${serverId}`).emit('server-status', { serverId, status });
  }

  emitConsoleOutput(serverId: number, output: string) {
    this.server.to(`server-${serverId}`).emit('console-output', { serverId, output });
  }

  emitServerMetrics(serverId: number, metrics: any) {
    this.server.to(`server-${serverId}`).emit('server-metrics', { serverId, metrics });
  }

  emitNotification(userId: number, notification: any) {
    this.server.to(`user-${userId}`).emit('notification', notification);
  }
}
