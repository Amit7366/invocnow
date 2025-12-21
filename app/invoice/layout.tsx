import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogoutButton from "./components/ui/LogoutButton";

export default async function InvoiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <header className="w-full flex justify-between items-center bg-gray-800 px-2 md:px-10">
        <h1 className="text-center py-2 text-5xl text-[#57BEA4] font-extrabold">
          Invocnow
        </h1>
        
        {/* Client Component imported here */}
        <LogoutButton />
      </header>
      
      <main>
        {children}
      </main>
    </>
  );
}