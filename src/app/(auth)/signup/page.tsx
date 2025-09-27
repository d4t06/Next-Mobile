import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignUpPageContent from "./Content";

export default async function SignUpPage() {
  const session = await getServerSession();

  if (session?.user) redirect("/");

  return <SignUpPageContent />;
}
