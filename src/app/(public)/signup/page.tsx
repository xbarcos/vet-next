"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ZodInput from "@/components/ui/zod-input";
import PrimaryButton from "@/components/ui/primary-button";
import { CircleArrowRight } from "lucide-react";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "O campo de nome não pode estar vazio" }),
    email: z
      .string()
      .min(1, { message: "O campo de e-mail não pode estar vazio." })
      .email("Esse não é um e-mail válido."),
    password: z
      .string()
      .min(8, { message: "A senha precisa ter pelo menos 8 caracteres." })
      .max(12, { message: "A senha precisa ter menos de 12 caracteres." })
      .refine((password) => /[A-Z]/.test(password), {
        message: "Sua senha precisa ter pelo menos 1 caractere maiúsculo.",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Sua senha precisa ter pelo menos 1 caractere minúsculo.",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Sua senha precisa ter pelo menos um algarismo.",
      })
      .refine((password) => /[!@#$%^&*]/.test(password), {
        message: "Sua senha precisa ter pelo menos 1 caractere especial.",
      }),
    confirmEmail: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password, email, confirmEmail }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas precisam ser iguais",
        path: ["confirmPassword"],
      });
    } else if (confirmEmail !== email) {
      ctx.addIssue({
        code: "custom",
        message: "Os e-mails precisam ser iguais",
        path: ["confirmEmail"],
      });
    }
  });

export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmEmail: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = {
      name: values.name,
      email: values.email,
      password: values.password
    }
    console.log(formData);
    //const router = useRouter();
    //router.push("/dashboard");
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center  bg-black bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] px-4  ">
      <div className="bg-secondary p-16 w-lg rounded-xl drop-shadow-2xl">
        <h1 className="text-4xl font-bold mb-8 w-full text-center">Cadastre sua conta!</h1>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col justify-center"
          >
            <ZodInput
              form={form}
              name="name"
              placeholder="Digite seu nome"
              label="Nome"
            />
            <ZodInput
              form={form}
              name="email"
              placeholder="Digite seu e-mail"
              label="E-mail"
            />
            <ZodInput
              form={form}
              name="confirmEmail"
              placeholder="Digite seu e-mail novamente"
              label="Confirme seu E-mail"
            />
            <ZodInput
              form={form}
              name="password"
              placeholder="Digite sua senha"
              label="Senha"
              type="password"
            />
            <ZodInput
              form={form}
              name="confirmPassword"
              placeholder="Digite sua senha novamente"
              label="Confirme sua senha"
              type="password"
            />

            <PrimaryButton
              title="Cadastrar"
              icon={CircleArrowRight}
              className="text-center mt-2 w-full cursor-pointer hover:bg-red-400 hover:text-white"
            />
          </form>
        </FormProvider>
        <div className="flex items-center py-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-center text-primary">ou...</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        <div className="flex justify-center gap-4">
          <Link href="https://google.com.br" target="_blank">
            <GoogleIcon className="hover:text-red-400" />
          </Link>
          <Link href="https://github.com" target="_blank">
            <GitHubIcon className="hover:text-red-400" />
          </Link>
          <Link href="https://facebook.com" target="_blank">
            <FacebookIcon className="hover:text-red-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}