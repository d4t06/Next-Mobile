import Avatar from "./ui/AvatarPlaceholder";

type Props = {
  comment: ProductComment;
};

export default function CommentItem({ comment }: Props) {
  return (
    <div className="flex">
      <Avatar name={comment.username} />
      <div className="ml-3">
        <h5 className="font-medium">
          {comment.username}

          <span className="text-[#808080] text-[14px] ml-2">({comment.date_diff})</span>
        </h5> 
        <div className="font-medium text-[#808080] mt-1">{comment.content}</div>
      </div>
    </div>
  );
}
