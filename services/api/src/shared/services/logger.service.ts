import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { LogEvent } from '@events/log.event';

@Injectable()
export class LoggerService {
  constructor(
    @Inject('USERS_SERVICE') private readonly userClient: ClientKafka,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    @Inject('CRYPTO_SERVICE') private readonly cryptoClient: ClientKafka,
    @Inject('POSTS_SERVICE') private readonly postClient: ClientKafka
  ) {}

  log({
    action,
    event,
    status,
    payload
  }: {
    action: 'log_user_action' | 'log_auth_action' | 'log_post_action';
    event:
      | 'SIGN_IN'
      | 'SIGN_UP'
      | 'CONFIRMATION'
      | 'POST'
      | 'CLOSE_ACC'
      | 'USER'
      | 'CRYPTO';
    status: 'SUCCESS' | 'ERROR';
    payload: any;
  }) {
    let clientKafka: ClientKafka;
    let message: string;

    switch (action) {
      case 'log_auth_action':
        clientKafka = this.authClient;
        break;
      case 'log_post_action':
        clientKafka = this.postClient;
        break;
      case 'log_user_action':
        clientKafka = this.userClient;
        break;
      default:
        return;
    }

    switch (status) {
      case 'ERROR':
        switch (event) {
          case 'CLOSE_ACC':
            break;
          case 'CONFIRMATION':
            break;
          case 'CRYPTO':
            break;
          case 'POST':
            break;
          case 'SIGN_IN':
            message = `User ${payload.email} tried to log in while being unconfirmed.`;
            break;
          case 'SIGN_UP':
            break;
          case 'USER':
            break;
          default:
            return;
        }
        break;
      case 'SUCCESS':
        switch (event) {
          case 'CLOSE_ACC':
            break;
          case 'CONFIRMATION':
            break;
          case 'CRYPTO':
            break;
          case 'POST':
            break;
          case 'SIGN_IN':
            break;
          case 'SIGN_UP':
            message = `User ${payload.email} has successfully created an account.`;
            break;
          case 'USER':
            break;
          default:
            return;
        }
        break;
    }

    clientKafka.emit(
      action,
      new LogEvent({
        event,
        message,
        status,
        timestamp: new Date()
      })
    );
  }
}
