"use server";

import { EmailTemplate } from "@/components/email.template"; // Certifique-se de importar seu template
import { userFormContact } from "@/components/form";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export const SendEmail = async ({
  user_name,
  user_service,
  user_message,
  user_email,
}: userFormContact) => {
  try {
    // Atenção: O campo 'from' deve ser um domínio verificado no Resend (ou o de teste onboarding@resend.dev)
    // O email do usuário vai no 'replyTo'.
    const { data, error } = await resend.emails.send({
      from: "My Portfolio <contato@leadcode.com.br>", // Altere para seu domínio verificado quando tiver
      to: ["johnymonteiiro@gmail.com"],
      replyTo: user_email, // O email do usuário vai aqui para você poder responder
      subject: `Novo Lead do Portfolio 🚀`,
      react: EmailTemplate({
        name: user_name,
        service: user_service,
        message: user_message,
        email: user_email, // <--- Adicione isso
      }),
    });

    if (error) {
      console.error(error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro interno no servidor" };
  }
};
