import { redirect } from "next/navigation";

export default function HomePage() {
  // Redireciona automaticamente para a rota de login assim que a página é acessada
  redirect("/login");
}