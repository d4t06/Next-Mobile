"use client";

import Button from "@/components/ui/Button";
// import useCommentAction from "@/hooks/useCommentAction";
import { CheckIcon, TrashIcon } from "@heroicons/react/16/solid";

// type Props = {
//    comment: ProductComment;
// };

export default function CommentCta() {
   // const { action, isFetching } = useCommentAction();

   // type Approve = {
   //    variant: "approve";
   //    id: number;
   // };

   // type Delete = {
   //    variant: "delete";
   //    id: number;
   // };

   // const handleRatingAction = (props: Approve | Delete) => {
   //    switch (props.variant) {
   //       case "approve":
   //          break;
   //       case "delete":
   //          break;
   //    }
   // };

   return (
      <>
         <div className="flex space-x-1">
            <Button className="p-1" size={"clear"}>
               <CheckIcon className="w-6" />
            </Button>

            <Button className="p-1" size={"clear"}>
               <TrashIcon className="w-6" />
            </Button>
         </div>
      </>
   );
}
