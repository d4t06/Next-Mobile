import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function DashboardPage() {

   const session =await getServerSession(nextAuthOptions)


   return <p className="text-[22px]">Hi <span className="font-[500]">{session?.user.name} !</span></p>;
}
