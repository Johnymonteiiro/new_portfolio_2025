import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  name: string;
  service: string;
  message: string;
  email: string; // Adicionei o email aqui para você ver no corpo da mensagem também
}

export const EmailTemplate = ({
  name,
  service,
  message,
  email,
}: EmailTemplateProps) => {
  const previewText = `Novo contato de ${name} sobre ${service}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Heading style={h1}>Novo Lead do Portfolio 🚀</Heading>
            <Text style={text}>
              Olá Jhon, você recebeu uma nova solicitação de contato apartir do
              seu portfólio.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={detailsSection}>
            <Text style={paragraph}>
              <strong>Nome:</strong> {name}
            </Text>
            <Text style={paragraph}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={paragraph}>
              <strong>Serviço de interesse:</strong> {service}
            </Text>
          </Section>

          {/* Mensagem em destaque */}
          <Section style={messageBox}>
            <Text style={messageLabel}>Mensagem:</Text>
            <Text style={messageContent}>{message}</Text>
          </Section>

          <Hr style={hr} />

          {/* Rodapé (Ajuda no Anti-Spam) */}
          <Section>
            <Text style={footer}>
              Esta mensagem foi enviada automaticamente pelo formulário de
              contato do seu portfólio.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// --- Estilos Inline (Garante compatibilidade com todos os clientes de email) ---

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: "20px 0",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 40px 48px",
  marginBottom: "64px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  maxWidth: "600px",
  border: "1px solid #eaeaea",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
  padding: "0",
};

const text = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "26px",
  textAlign: "left" as const,
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "10px 0",
};

const detailsSection = {
  padding: "10px 0",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const messageBox = {
  backgroundColor: "#f9f9f9",
  padding: "20px",
  borderRadius: "4px",
  borderLeft: "4px solid #556cd6", // Uma cor de destaque (azul/roxo)
  marginTop: "20px",
};

const messageLabel = {
  color: "#8898aa",
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  marginBottom: "10px",
};

const messageContent = {
  color: "#333",
  fontSize: "16px",
  fontStyle: "italic",
  margin: "0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  marginTop: "20px",
};
