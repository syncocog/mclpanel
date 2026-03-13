import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { ServersModule } from '../servers/servers.module';

@Module({
  imports: [ServersModule],
  providers: [WebsocketGateway],
})
export class WebsocketModule {}
