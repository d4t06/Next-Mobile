import CommentItem from "@/components/CommentItem";
import Button from "@/components/ui/Button";
import getAllComment from "@/libs/getAllComment";
import { ChatBubbleLeftRightIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import WriteCommentButton from "./WriteCommentButton";
import NoProduct from "@/components/NoProduct";
import Skeleton from "@/components/Skeleton";

type Props = {
   product: Product;
};

async function CommentList({ productId }: { productId: number }) {
   const data = await getAllComment({ productId, size: 11, approved: false });

   // const isRemaining = data.size * data.page < data.count;

   if (!data) return <></>;

   return (
      <>
         {!!data.comments.length ? (
            data.comments.map((c) => <CommentItem key={c.id} comment={c} />)
         ) : (
            <NoProduct less />
         )}

         {/* {isRemaining && (
            <div className="my-5 text-center">
               <Button>More</Button>
            </div>
         )} */}
      </>
   );
}

const commentLoading = [...Array(2).keys()].map((item) => (
   <div className="flex" key={item}>
      <Skeleton className="w-[44px] h-[44px] rounded-full flex-shrink-0" />
      <div className="ml-[10px]">
         <Skeleton className="h-[20px] w-[200px] max-w-[30vw] rounded-[4px]" />
         <Skeleton className="h-[24px] mt-[10px] w-[400px] max-w-[50vw] rounded-[4px]" />
         <Skeleton className="h-[18px] mt-[10px] w-[100px] max-w-[30vw] rounded-[4px]" />
      </div>
   </div>
));

export default async function RatingSection({ product }: Props) {
   return (
      <div className="mt-8">
         <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
               <ChatBubbleLeftRightIcon className="w-6" />
               <span className="sm:text-lg font-medium">Comments </span>
            </div>

            <WriteCommentButton product={product} />
         </div>

         <div className="space-y-4 mt-5">
            <Suspense fallback={commentLoading}>
               <CommentList productId={product.id} />
            </Suspense>
         </div>
      </div>
   );
}
