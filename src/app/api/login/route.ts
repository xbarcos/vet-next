import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const mockUser = {
  email: "teste@exemplo.com",
  password: "Senha123!",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Dados recebidos na API:", body);
    const { email, password } = body;

    console.log("Comparando com mockUser:", mockUser);

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-mail e senha são obrigatórios" },
        { status: 400 }
      );
    }

    if (email === mockUser.email && password === mockUser.password) {
      console.log("Credenciais válidas");
      const response = NextResponse.json({ success: true, message: "Login bem-sucedido" });
      response.cookies.set("token", "mocked-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    }

    return NextResponse.json(
      { error: "Login ou senha estão errados" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}