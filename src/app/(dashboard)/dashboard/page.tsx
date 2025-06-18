import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/authOption";
import Button from "@/components/ui/Button";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const revalidate = 86400;

export default async function DashboardPage() {
  const session = await getServerSession(nextAuthOptions);

  if (!session) return redirect("/signin");
  if (session?.user.role !== "ADMIN") return redirect("/unauthorized");

  return (
    <>
      <p className="text-[22px]">Hi!, {session.user.username}</p>

      <p>Token: {session.token}</p>
      <p>Refresh: {session.refreshToken}</p>

      <Button>Update</Button>
    </>
  );
}
