import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/authOption";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
   const session = await getServerSession(nextAuthOptions);

   if (!session) return redirect("/signin");
   if (session?.user.role !== "ADMIN") return redirect("/unauthorized");

   return (
      <p className="text-[22px]">
         Hi <span className="font-[500]">Dash board page !</span>
      </p>
   );
}
