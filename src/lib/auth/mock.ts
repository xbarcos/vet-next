export async function mockFirebaseLogin(email: string, password: string): Promise<{ token: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@teste.com" && password === "123456") {
        resolve({ token: "mocked-firebase-token-abc123" });
      } else {
        reject(new Error("Credenciais inválidas"));
      }
    }, 1000);
  });
}
