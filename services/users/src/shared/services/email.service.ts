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
    confirmationHash
  }: {
    target: string;
    confirmationHash: string;
  }) {
    const confirmationLink = `${this.configService.frontEndUrl}/account-confirmation/${confirmationHash}`;

    const mail = {
      to: target,
      subject: 'Cryptotalks registration confirmation',
      from: this.configService.sendGridCredentials.sender_email,
      html: `
        <h1>Welcome!</h1>
        <br>
        <p>Click <a href="${confirmationLink}">here</a> in order to confirm registration.</p>
        <br>
        <p>If link doesn't work, copy this and paste in browser.</p>
        <p>${confirmationLink}</p>
      `
    };

    return await SendGrid.send(mail);
  }
}
