import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import * as path from "path";

class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      from: "No reply",
      service: "gmail",
      auth: {
        user: "andreiilevchenko@gmail.com",
        pass: "duixtjkfcwkxuzez",
      },
    });
    const hbsOptions = {
      viewEngine: {
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: path.join(
          process.cwd(),
          "src",
          "email-templates",
          "layouts"
        ),
        partialsDir: path.join(
          process.cwd(),
          "src",
          "email-templates",
          "partials"
        ),
      },
      viewPath: path.join(process.cwd(), "src", "email-templates", "views"),
      extName: ".hbs",
    };
    this.transporter.use("compile", hbs(hbsOptions));
  }
  public async sendMail(email: string) {
    const mailOptions = {
      subject: "HELLO!!!!!!",
      template: "register",
    };
    return this.transporter.sendMail(
      mailOptions
      //     {
      //   to: email,
      //   subject: "HELLO!!!!!!",
      //   html: "<div>Вітаю. Якщо ви отримали це повідомлення, невідкладно сповістіть відправника про це. Дякую. Гарного дня!!!</div>",
      // }
    );
  }
}

export const emailService = new EmailService();
