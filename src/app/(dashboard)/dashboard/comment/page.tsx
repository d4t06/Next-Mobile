import CommentItem from "@/components/CommentItem";
import Button from "@/components/ui/Button";
import Frame from "@/components/ui/Frame";
import getAllComment from "@/libs/getAllComment";
import { CheckIcon } from "@heroicons/react/16/solid";

export default async function DashboardComment() {
   const data = await getAllComment({ approved: false, size: 99 });

   if (!data) return <p className="text-center">Some thing went wrong</p>;

   return (
      <>
         <h5 className="text-2xl font-medium">Comments</h5>
         <div className="mt-5 space-y-4">
            {data.comments.map((c) => {
               return (
                  <Frame key={c.id}>
                     <div className="flex items-center justify-between">
                        <CommentItem comment={c} />

                        <Button className="p-1" size={"clear"}>
                           <CheckIcon className="w-6" />
                        </Button>
                     </div>
                  </Frame>
               );
            })}
         </div>
      </>
   );
}
