const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMPT_USER, // generated ethereal user
        pass: process.env.SMPT_PASSWORD, // generated ethereal password
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMPT_USER,
      to,
      subject: `Account activation in ${process.env.API_URL}`,
      text: "",
      html: `
          <div>
            <h1>
              This email address was specified for activate acount in ${process.env.API_URL}.
            </h1>
            <p>
              Tap to link:
              <a href="${link}">${link}</a> 
              for activate your account.
            </p>
            <span style="color:red">
              If it's not you, please contact the support or do nothing.
            </span>
          </div>
        `,
    });
  }
}

module.exports = new MailService();
