import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  //configuration part
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Manager 1",
      link: "https://link.com",
    },
  });
  
  const emailTexual = mailGenerator.generatePlaintext(options.mailgenContent);

  const emailHTML = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASSWORD,
    },
  });

  //generating email part
  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTexual,
    html: emailHTML,
  };

  try {
    await transporter.sendMail(mail);
    console.log("Email sent successfully to ", options.email);
  } catch (err) {
    console.error("Error sending email to ", options.email, err);
  }
};

const emailVerificationMailGenContent = (username, verificationURL) => {
  return {
    body: {
      name: username,
      intro:
        "Welcome to our website ProjectManager! We are excited to have you onboard.",
      action: {
        instructions:
          "To verify your email please click on the following button",
        button: {
          color: "#22BC66",
          text: "Verify your email",
          link: verificationURL,
        },
      },
      outro:
        "If you did not sign up for this account, please ignore this email.",
    },
  };
};

const forgotPasswordMailGenContent = (username, passwordResetURL) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset your password.",
      action: {
        instructions:
          "To regenerate your password, please click on the following button",
        button: {
          color: "#313258ff",
          text: "Reset your password",
          link: passwordResetURL,
        },
      },
      outro:
        "If you did not sign up for this account, please ignore this email.",
    },
  };
};

export {
  emailVerificationMailGenContent,
  forgotPasswordMailGenContent,
  sendEmail,
};
