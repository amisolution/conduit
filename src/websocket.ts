import * as WebSocket from 'ws';
import { Request, NextFunction } from 'express';
import { Logger } from './util/logger';

export class WebSocketFeed {
  private websockets: Set<WebSocket>;
  private logger?: Logger;
  private wss: WebSocket.Server;

  constructor({ logger, wss }: { logger?: Logger; wss: WebSocket.Server }) {
    this.websockets = new Set();
    this.logger = logger;
    this.wss = wss;
  }

  public acceptConnection(ws: WebSocket, req: Request, next: NextFunction): void {
    try {
      this.log('debug', `Websocket connection connected and registered`);
      this.websockets.add(ws);
      ws.on('close', () => this.removeConnection(ws));
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  private removeConnection(ws: WebSocket) {
    this.log('debug', 'Websocket disconnected, unregistering');
    this.websockets.delete(ws);
  }

  private log(level: string, message: string, meta?: any) {
    if (!this.logger) {
      return;
    }
    this.logger.log(level, message, meta);
  }
}
