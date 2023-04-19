import { Injectable } from '@nestjs/common';
import { ApiConfigService } from '@shared/config.service';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ApiConfigService) {
    SendGrid.setApiKey(this.configService.sendGridCredentials.api_key);
  }

  async sendConfirmationEmail({
    target,
    confirmationHash,
    confirmationType
  }: {
    target: string;
    confirmationHash: string;
    confirmationType: 'EMAIL_CHANGE' | 'REGISTRATION';
  }) {
    let mail: {
      to: string;
      subject: string;
      from: string;
      html: string;
    } = {
      to: target,
      from: this.configService.sendGridCredentials.sender_email,
      subject: '',
      html: ''
    };

    if (confirmationType === 'REGISTRATION') {
      const confirmationLink = `${this.configService.frontEndUrl}/account-confirmation/${confirmationHash}`;

      mail = {
        ...mail,
        subject: 'Cryptotalks registration confirmation',
        html: `
          <h1>Welcome!</h1>
          <br>
          <p>Click <a href="${confirmationLink}">here</a> in order to confirm registration.</p>
          <br>
          <p>If link doesn't work, copy this and paste in browser.</p>
          <p>${confirmationLink}</p>
        `
      };
    } else if (confirmationType === 'EMAIL_CHANGE') {
      const confirmationLink = `${this.configService.frontEndUrl}/email-change-confirmation/${confirmationHash}`;

      mail = {
        ...mail,
        subject: 'Cryptotalks email change confirmation',
        html: `
          <h1>Hello, hope you are doing well!</h1>
          <br>
          <p>Click <a href="${confirmationLink}">here</a> in order to confirm email change.</p>
          <br>
          <p>If link doesn't work, copy this and paste in browser.</p>
          <p>${confirmationLink}</p>
        `
      };
    }

    return await SendGrid.send(mail);
  }
}
