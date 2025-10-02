import { Button, MyInput } from "@/components";
import { ModalContentWrapper, ModalHeader } from "@/components/modal";
import { useToastContext } from "@/stores/ToastContext";
import { useState } from "react";

type Props = {
  submit: (data: { title: string; id: string }) => void;
};

export default function AddVideoModal({ submit }: Props) {
  const { setErrorToast } = useToastContext();

  const [title, setTitle] = useState("Disassembly video");
  const [id, setId] = useState("");

  const videoIdRegex = /^([a-zA-Z0-9_-]{11})$/;
  const extractIDRegex =
    /(?:v=|youtu\.be\/|embed\/|watch\?v=)([a-zA-Z0-9_-]{11})(?:$|&|\?)/;

  const getVideoID = () => {
    const trimedId = id.trim();
    if (!trimedId) return "";

    if (trimedId.match(videoIdRegex)) {
      return trimedId;
    }

    if (!trimedId || typeof trimedId !== "string") {
      return "";
    }

    const match = trimedId.match(extractIDRegex);

    if (match && match[1]) {
      return match[1] || "";
    }

    return "";
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    const finalID = getVideoID();
    if (!finalID) {
      setErrorToast("Invalid video ID");
      return;
    }

    submit({ title, id: finalID });
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
