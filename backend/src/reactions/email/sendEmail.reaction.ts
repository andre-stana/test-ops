import { resend } from "../../config/resend";

/**
 * Sends an email notification using the Resend API.
 * @param to - The recipient email address.
 * @param subject - The email subject.
 * @param html - The HTML content of the email.
 * @returns A promise resolving to the result of the email send operation.
 */
export async function sendEmailNotification(to: string, subject: string, html: string): Promise<void> {
  try {
    const { data, error } = await resend.emails.send({
      from: "O-Zone Notifications <no-reply@ozone.app>",
      to: [to],
      subject: `[O-Zone] ${subject}`, // Prefix subject with app name
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #2F80ED;">O-Zone Notification</h2>
          <p>${html}</p>
          <hr />
          <footer style="font-size: 12px; color: #888;">
            <p>You’re receiving this email because of an activity in O-Zone.</p>
            <p>If you have questions, contact us at <a href="mailto:support@ozone.app" style="color: #2F80ED;">support@ozone.app</a>.</p>
          </footer>
        </div>
      `,
    });

    if (error) {
      console.error("Failed to send email:", error);
      throw new Error(`Email sending failed: ${error.message}`);
    }

    console.log("Email sent successfully:", data);
  } catch (err) {
    console.error("An error occurred while sending the email:", err);
    throw err;
  }
}
