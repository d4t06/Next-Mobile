import { Button, MyInput } from "@/components";
import { ModalContentWrapper, ModalHeader } from "@/components/modal";
import { useState } from "react";

type Props = {
  submit: (data: { title: string; id: string }) => void;
};

export default function AddVideoModal({  submit }: Props) {

  const [title, setTitle] = useState("Disassembly video");
  const [id, setId] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !id.trim()) return;
    
    submit({ title, id });
  };

  return (
    <ModalContentWrapper>
      <ModalHeader title="Add video" />

      <div>
        <label>Title</label>
        <MyInput value={title} cb={(v) => setTitle(v)} />
      </div>

      <div className="mt-3">
        <label>Id</label>
        <MyInput cb={(v) => setId(v)} />
      </div>

      <p className="mt-5 text-right">
        <Button onClick={handleSubmit}>Add</Button>
      </p>
    </ModalContentWrapper>
  );
}
