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
      | 'CRYPTO'
      | 'SETTINGS'
      | 'SECURITY';
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
            message = `User ${payload.hashId} tried to confirm account one more time.`;
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
          case 'SETTINGS':
            break;
          case 'SECURITY':
            break;
          default:
            return;
        }
        break;
      case 'SUCCESS':
        switch (event) {
          case 'CLOSE_ACC':
            message = `User ${payload.userId} has successfully closed an account.`;
            break;
          case 'CONFIRMATION':
            message = `User ${payload.hashId} has successfully confirmed an account.`;
            break;
          case 'CRYPTO':
            break;
          case 'POST':
            break;
          case 'SIGN_IN':
            message = `User ${payload.userId} has successfully logged in.`;
            break;
          case 'SIGN_UP':
            message = `User ${payload.email} has successfully created an account.`;
            break;
          case 'USER':
            message =
              'email' in payload
                ? `User ${payload.userId} has successfully changed email to ${payload.email}`
                : `User ${payload.userId} has successfully changed password`;
            break;
          case 'SETTINGS':
            message = `User ${
              payload.userId
            } has successfully updated personal settings ${JSON.stringify(
              payload
            )}`;
            break;
          case 'SECURITY':
            message =
              'twoFaToken' in payload
                ? `MFA for user ${payload.userId} has been successfully set`
                : `MFA for user ${payload.userId} has been successfully removed.`;
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
