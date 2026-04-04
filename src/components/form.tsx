 "use client";

import { SendEmail } from "@/app/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod/v3";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TextArea } from "./ui/textarea";

export type FormProps = {
  className?: string;
  isOpen: boolean;
  formRef: React.RefObject<HTMLFormElement>;
};

const userFormSchema = z.object({
  user_name: z.string().min(1, "Name is required"),
  user_email: z.string().email("This is not a valid email"),
  user_service: z.string().min(1, "Services is required"),
  user_message: z.string().min(10, "Message must be at least 10 characters"),
});

export type userFormContact = z.infer<typeof userFormSchema>;

export const Form = ({ className, isOpen, formRef }: FormProps) => {
  const methods = useForm<userFormContact>({
    resolver: zodResolver(userFormSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<userFormContact> = async (data) => {
    // Chamada da Server Action
    const res = await SendEmail(data);

    // Verificação baseada no objeto simples retornado
    if (res.success) {
      alert("Email sent successfully");
      methods.reset(); // Opcional: limpar o formulário
    } else {
      alert(`Email sent failed: ${res.error}`);
    }
  };
  return (
    <FormProvider {...methods}>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className={clsx(
          className,
          isOpen
            ? "absolute right-0 top-[48px] z-30 shadow-xl flex flex-col border bg-card-bg border-border-color rounded-md p-8"
            : "hidden"
        )}
      >
        <h3 className="text-gray text-xl pb-8">
          I'll reply as soon as possible. 😊
        </h3>
        <div className="w-[300px]">
          <Input
            order={1}
            type="text"
            placeholder="John Doe"
            label="What`s your name?"
            propriety="user_name"
          />

          <Input
            order={2}
            type="email"
            placeholder="johndoe@example.com"
            label="What`s your email?"
            propriety="user_email"
          />
          <Input
            order={3}
            type="text"
            placeholder="Web development, Web design"
            label="What services are you looking for?"
            propriety="user_service"
          />
          <TextArea
            order={4}
            placeholder="I want to build something cool"
            label="Let me a message"
            propriety="user_message"
          />
          <Button type="submit">Send Message</Button>
        </div>
      </form>
    </FormProvider>
  );
};
