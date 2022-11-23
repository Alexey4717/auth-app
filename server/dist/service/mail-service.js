"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require('nodemailer');
class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            // @ts-ignore
            host: process.env.SMPT_HOST,
            port: process.env.SMPT_PORT,
            secure: false,
            // service: 'SendPulse',
            auth: {
                user: process.env.SMPT_USER,
                pass: process.env.SMPT_PASSWORD, // generated ethereal password
            },
        });
    }
    sendActivationMail(to, link) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.transporter.sendMail({
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
        });
    }
}
exports.default = new MailService();
