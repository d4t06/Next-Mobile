import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignInPageContent from "./Content";

export default async function SignInPage() {
  const session = await getServerSession();

  if (session?.user) redirect("/");

  return <SignInPageContent />;
}
