import DefaultLayout from "@/layout/DefaultLayout";

export default function LobbyLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return <DefaultLayout>{children}</DefaultLayout>;
}
