import ClientPage from "./ClientPage";

// ¡Aquí es donde ponemos la instrucción para que Cloudflare funcione!
export const runtime = "edge";

export default function Page() {
  return <ClientPage />;
}
