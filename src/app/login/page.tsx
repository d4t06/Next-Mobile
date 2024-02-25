import { unstable_noStore } from "next/cache";
import Link from "next/link";

// export const revalidate = 0
unstable_noStore();

export default async function LoginPage() {
  return (
    <div className="">
      <h1>Login page {Math.random()}</h1>
      <Link href={"/about"}>about page</Link>
    </div>
  );
}
