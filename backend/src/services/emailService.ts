import { config } from '../config.js';

interface SentEmailRecord {
  to: string;
  subject: string;
  resetUrl: string;
  token: string;
  timestamp: string;
}

class EmailService {
  private recentEmails: SentEmailRecord[] = [];

  public async sendPasswordResetEmail(to: string, token: string): Promise<void> {
    const resetUrl = `${config.frontendUrl}/reset-password?token=${encodeURIComponent(token)}`;
    const timestamp = new Date().toISOString();

    // In production or unless explicit dev token inspection is enabled, do not store tokens in memory
    if (!config.isProduction && config.enableDevTokens) {
      this.recentEmails.unshift({
        to,
        subject: 'Reset your PrismCode password',
        resetUrl,
        token,
        timestamp,
      });
      if (this.recentEmails.length > 50) this.recentEmails.pop();
    }

    // Check if external Resend API key or SMTP is provided
    if (config.resendApiKey) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${config.resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: config.fromEmail,
            to,
            subject: 'Reset your PrismCode password',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
                <h2 style="color: #6366f1;">PrismCode Password Reset</h2>
                <p>You requested a password reset for your PrismCode account. Click the button below to reset your password:</p>
                <div style="margin: 24px 0;">
                  <a href="${resetUrl}" style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                    Reset Password
                  </a>
                </div>
                <p style="color: #64748b; font-size: 13px;">This link will expire in 1 hour. If you didn't request this, you can safely ignore this email.</p>
              </div>
            `,
          }),
        });
        if (!response.ok) {
          console.error('[EmailService] Resend API error:', await response.text());
        }
      } catch (err) {
        console.error('[EmailService] Failed to send via Resend:', err);
      }
    }

    // Only log raw tokens if development tokens are explicitly enabled
    if (!config.isProduction && config.enableDevTokens) {
      console.log('\n================== [EMAIL DISPATCHED] ==================');
      console.log(`To: ${to}`);
      console.log(`Subject: Reset your PrismCode password`);
      console.log(`Reset URL: ${resetUrl}`);
      console.log(`Token: ${token}`);
      console.log('========================================================\n');
    } else {
      console.log(`[EmailService] Password reset link dispatched to ${to}`);
    }
  }

  public async sendEmailVerificationEmail(to: string, token: string): Promise<void> {
    const verificationUrl = `${config.frontendUrl}/verify-email?token=${encodeURIComponent(token)}`;
    const timestamp = new Date().toISOString();

    if (!config.isProduction && config.enableDevTokens) {
      this.recentEmails.unshift({
        to,
        subject: 'Verify your PrismCode email address',
        resetUrl: verificationUrl,
        token,
        timestamp,
      });
      if (this.recentEmails.length > 50) this.recentEmails.pop();
    }

    if (config.resendApiKey) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${config.resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: config.fromEmail,
            to,
            subject: 'Verify your PrismCode email address',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
                <h2 style="color: #6366f1;">Welcome to PrismCode!</h2>
                <p>Please confirm your email address by clicking the button below:</p>
                <div style="margin: 24px 0;">
                  <a href="${verificationUrl}" style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                    Verify Email Address
                  </a>
                </div>
                <p style="color: #64748b; font-size: 13px;">This link will expire in 24 hours. If you did not create a PrismCode account, you can safely ignore this email.</p>
              </div>
            `,
          }),
        });
        if (!response.ok) {
          console.error('[EmailService] Resend API error:', await response.text());
        }
      } catch (err) {
        console.error('[EmailService] Failed to send verification via Resend:', err);
      }
    }

    if (!config.isProduction && config.enableDevTokens) {
      console.log('\n================== [VERIFICATION EMAIL DISPATCHED] ==================');
      console.log(`To: ${to}`);
      console.log(`Subject: Verify your PrismCode email address`);
      console.log(`Verification URL: ${verificationUrl}`);
      console.log(`Token: ${token}`);
      console.log('=====================================================================\n');
    } else {
      console.log(`[EmailService] Verification link dispatched to ${to}`);
    }
  }

  public getRecentEmails(): SentEmailRecord[] {
    if (config.isProduction || !config.enableDevTokens) {
      return [];
    }
    return [...this.recentEmails];
  }
}

export const emailService = new EmailService();
