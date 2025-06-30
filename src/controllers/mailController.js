import transporter from '../lib/mailTransporter.js';

export const test = async (req, res) => {
  try {
    const mailInfo = await transporter.sendMail({
      from: 'noreply@example.com',
      to: 'tim@example.com',
      subject: 'Test mail',
      template: 'test-mail',
      context: {
        title: 'Dit is een test',
        message: 'Verzonden via nodemailer',
      },
    });
    res.send(mailInfo);
  } catch (error) {
    res.send(error);
  }
};
