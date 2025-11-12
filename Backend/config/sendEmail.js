import { Resend } from "resend";
import { config } from "dotenv";

config();

if(!process.env.RESEND_API){
    throw new Error(
        "provide resend api key in env"
    )
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, htmlTemplate }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "blinkyt <onboarding@resend.dev>",
      to: sendTo,
      subject: subject,
      html: htmlTemplate,
    });

    if (error) {
      return console.error({ error });
    }

    console.log({ data });
  } catch (error) {
    console.log("Email is not sending, error", error.message || error);
  }
};

export default sendEmail;
