import CommentItem from "@/components/CommentItem";
import Frame from "@/components/ui/Frame";
import getAllComment from "@/libs/getAllComment";
import ApproveAllButton from "./_components/ApproveAllButton";
import DeleteCommentButton from "./_components/DeleteCommentButton";
import NoProduct from "@/components/NoProduct";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/authOption";
import { redirect } from "next/navigation";

// export const revalidate = 86400;

export default async function DashboardComment() {
  const session = await getServerSession(nextAuthOptions);

  if (!session) return redirect("/signin");
  if (session?.user.role !== "ADMIN") return redirect("/unauthorized");

  const data = await getAllComment({ approved: false, size: 99 });

  if (!data)
    return (
      <NoProduct>
        <p>Something went wrong</p>
      </NoProduct>
    );

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-2xl">Comments</p>

        <ApproveAllButton comments={data.comments} />
      </div>
      <div className="mt-5 space-y-4">
        {data.comments.length ? (
          data.comments.map((c) => {
            return (
              <Frame key={c.id}>
                <div className="flex items-center justify-between">
                  <CommentItem comment={c} />
                  <DeleteCommentButton comment={c} />
                </div>
              </Frame>
            );
          })
        ) : (
          <NoProduct />
        )}
      </div>
    </>
  );
}
