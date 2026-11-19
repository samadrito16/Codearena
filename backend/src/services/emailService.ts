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

    this.recentEmails.unshift({
      to,
      subject: 'Reset your CodeArena password',
      resetUrl,
      token,
      timestamp,
    });
    if (this.recentEmails.length > 50) this.recentEmails.pop();

    // Check if external Resend API key or SMTP is provided
    if (config.resendApiKey) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${config.resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: config.fromEmail,
            to,
            subject: 'Reset your CodeArena password',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
                <h2 style="color: #6366f1;">CodeArena Password Reset</h2>
                <p>You requested a password reset for your CodeArena account. Click the button below to reset your password:</p>
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

    // Always log in development so user / developer has immediate access
    console.log('\n================== [EMAIL DISPATCHED] ==================');
    console.log(`To: ${to}`);
    console.log(`Subject: Reset your CodeArena password`);
    console.log(`Reset URL: ${resetUrl}`);
    console.log(`Token: ${token}`);
    console.log('========================================================\n');
  }

  public getRecentEmails(): SentEmailRecord[] {
    return [...this.recentEmails];
  }
}

export const emailService = new EmailService();
