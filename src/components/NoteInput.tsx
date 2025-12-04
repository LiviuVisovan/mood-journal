import { useState } from "react";

type noteProps = {
  note: (m: string) => void;
};

export default function NoteInput({ note }: noteProps) {
  const [noteInput, setNoteInput] = useState("");

  function onEdit(e) {
    setNoteInput(e.target.value);
    note(e.target.value);
  }

  return (
    <>
      <textarea value={noteInput} onChange={onEdit}></textarea>
    </>
  );
}
