import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Handlebars from 'handlebars';

@Injectable()
export class EmailService {
  private sesClient: SESClient;
  private fromEmail: string;
  private fromName: string;

  constructor(private configService: ConfigService) {
    this.sesClient = new SESClient({
      region: this.configService.get<string>('aws.region'),
      credentials: {
        accessKeyId: this.configService.get<string>('aws.accessKeyId'),
        secretAccessKey: this.configService.get<string>('aws.secretAccessKey'),
      },
    });
    this.fromEmail = this.configService.get<string>('aws.ses.fromEmail');
    this.fromName = this.configService.get<string>('aws.ses.fromName');
  }

  async sendEmail(
    to: string,
    subject: string,
    htmlContent: string,
    textContent?: string,
  ): Promise<void> {
    const command = new SendEmailCommand({
      Source: `${this.fromName} <${this.fromEmail}>`,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Html: {
            Data: htmlContent,
          },
          Text: textContent
            ? {
                Data: textContent,
              }
            : undefined,
        },
      },
    });

    await this.sesClient.send(command);
  }

  async sendTemplateEmail(
    to: string,
    subject: string,
    template: string,
    variables: Record<string, any>,
  ): Promise<void> {
    const compiledTemplate = Handlebars.compile(template);
    const htmlContent = compiledTemplate(variables);

    await this.sendEmail(to, subject, htmlContent);
  }

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    const subject = 'Welcome to Foundly!';
    const htmlContent = `
      <h1>Welcome to Foundly, ${name}!</h1>
      <p>Thank you for joining our platform.</p>
      <p>We're excited to have you on board!</p>
    `;

    await this.sendEmail(to, subject, htmlContent);
  }

  async sendPasswordResetEmail(to: string, resetLink: string): Promise<void> {
    const subject = 'Reset Your Password';
    const htmlContent = `
      <h1>Password Reset Request</h1>
      <p>You requested to reset your password. Click the link below to proceed:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
    `;

    await this.sendEmail(to, subject, htmlContent);
  }
}
