import nodemailer from "nodemailer";

class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      from: "No reply",
      service: "gmail",
      auth: {
        user: "andreiilevchenko@gmail.com",
        pass: "dnsfddbiclfinoov",
      },
    });
    const hbsOptions = {
      viewEngine:{
        extname:'.hbs',
        defaultLayout:'main',
      }
    }
  }
  public async sendMail(email: string) {
    return this.transporter.sendMail({
      to: email,
      subject: "HELLO!!!!!!",
      html: "<div>Вітаю. Якщо ви отримали це повідомлення, невідкладно сповістіть відправника про це. Дякую. Гарного дня!!!</div>",
    });
  }
}

export const emailService = new EmailService();
