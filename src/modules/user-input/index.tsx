"use client";

import { PlayIcon, ArrowPathIcon, FaceSmileIcon } from "@heroicons/react/20/solid";

import {
  MyPopup,
  MyPopupContent,
  MyPopupTrigger,
  PopupWrapper,
} from "@/components/popup";
import { useAuthContext } from "@/stores/SessionContext";
import useCommentInput from "./useCommentInput";
import { Modal, ModalContentWrapper } from "@/components/modal";
import { Title, AvatarPlaceholder, Button } from "@/components";
import useCommentAction from "./useCommentAction";
import Twemoji from "react-twemoji";

type Props = {
  onSubmited?: () => void;
  bg?: string;
};

type SendComment = {
  variant: "comment";
  targetId: number;
};

type SendReply = {
  variant: "reply";
  comment: ProductComment;
  commentIndex: number;
};

export default function UserInput({
  onSubmited,
  bg = "bg-[--a-10-cl]",
  ...props
}: (SendComment | SendReply) & Props) {
  const { user } = useAuthContext();

  const { action, modalRef, isFetching } = useCommentAction();
  const { EMOJIS, textareaRef, addEmoji, value, setValue } = useCommentInput();

  const handleAddComment = async () => {
    if (!value || !value.trim() || !user) return;

    switch (props.variant) {
      case "comment":
        const schema: ProductCommentSchema = {
          content: value,
          product_id: props.targetId,
          username: user.user.username,
          approve: 1,
        };

        await action({
          variant: "add",
          comment: schema,
        });

        break;
    }

    setValue("");
    onSubmited && onSubmited();
  };

  const inputPlaceholder =
    props.variant === "comment" ? "..." : `Reply to ${props.comment.username}...`;

  if (!user) return <></>;

  return (
    <>
      <div className="flex w-full">
        <AvatarPlaceholder className="w-9 h-9 flex-shrink-0" name={user.user.username} />

        <div className={`rounded-lg ml-2 flex-grow  p-1.5 flex items-end  ${bg}`}>
          <textarea
            ref={textareaRef}
            placeholder={inputPlaceholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={1}
            className={`my-input no-scrollbar resize-none max-h-[30vh] w-full !bg-transparent border-none`}
          />

          <MyPopup appendOnPortal>
            <MyPopupTrigger>
              <button className="hover p-1.5 hover:bg-[--a-5-cl] rounded-full">
                <FaceSmileIcon className="w-6" />
              </button>
            </MyPopupTrigger>

            <MyPopupContent>
              <PopupWrapper className="w-[270px]">
                <div className="p-1.5 grid grid-cols-5 justify-items-center max-h-60 overflow-y-auto pr-2 [&_button]:p-1  [&_button]:rounded-md  [&_img]:w-7  hover:[&_button]:bg-gray-200">
                  {EMOJIS.map((emoji, index) => (
                    <button onClick={() => addEmoji(emoji)} key={index}>
                      <Twemoji>{emoji}</Twemoji>
                    </button>
                  ))}
                </div>
              </PopupWrapper>
            </MyPopupContent>
          </MyPopup>

          <button
            onClick={handleAddComment}
            className={`p-1.5 hover:bg-white/10 rounded-full`}
          >
            {isFetching ? (
              <ArrowPathIcon className="w-6 animate-spin" />
            ) : (
              <PlayIcon className="w-6" />
            )}
          </button>
        </div>
      </div>

      <Modal ref={modalRef}>
        <ModalContentWrapper>
          <Title
            variant={"h2"}
            className="text-center"
            title="Your commment is not allow"
          />

          <p className="mt-5 text-right">
            <Button onClick={() => modalRef.current?.close()} colors="primary">
              Ok
            </Button>
          </p>
        </ModalContentWrapper>
      </Modal>
    </>
  );
}

export function Test() {
  return "this is test";
}
