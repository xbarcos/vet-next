"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { mockFirebaseLogin } from "@/lib/auth/mock";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ZodInput from "@/components/ui/zod-input";
import { CircleArrowRight } from "lucide-react";
import PrimaryButton from "@/components/ui/primary-button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formSchema = z
    .object({
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
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      console.log("Resposta da API:", res);

      if (res.ok) {
        const responseData = await res.json();
        toast.success(responseData.message || "Login bem-sucedido!");
        router.push("/dashboard")
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Erro ao autenticar");
      }
    } catch (error: any) {
      
      toast.error(error.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white  rounded-2xl shadow-md">
        <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 text-center">
          Fazer Login
        </h1>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(async (data) => {
              setLoading(true);
              await handleLogin(data);
              setLoading(false);
            })}
            className="space-y-4"
          >
            <ZodInput
              form={form}
              name="email"
              placeholder="Digite seu e-mail"
              label="E-mail"
            />
            <ZodInput
              form={form}
              name="password"
              placeholder="Digite sua senha"
              label="Senha"
              type="password"
            />
            <PrimaryButton
              title="Login"
              icon={CircleArrowRight}
              className="text-center mt-2 w-full cursor-pointer hover:bg-red-400 hover:text-white"
              type="submit"
              isLoading={loading}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
