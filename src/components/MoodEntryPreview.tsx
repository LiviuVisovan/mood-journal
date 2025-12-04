import { useState } from "react";

type JournalEntry = {
  selectedMood: string;
  note: string;
  id: number;
  createdAt: string;
};

type MoodEntryPreviewProps = {
  entries: JournalEntry[];
  handleDelete: (d: number) => void;
  handleEdit: (d: number, s: string) => void;
};
export default function MoodEntryPreview({
  entries,
  handleDelete,
  handleEdit,
}: MoodEntryPreviewProps) {
  const [editingid, setEditingId] = useState(0);
  const [tempNote, settempNote] = useState("");
  const [cancelNote, setCancelNote] = useState("");
  const [searchfilter, setFilter] = useState("");
  const [sortType, setSort] = useState("newest");

  function onEdit(e: React.ChangeEvent<HTMLTextAreaElement>) {
    settempNote(e.target.value);
  }
  const tempEntries = [...entries];
  const sortedAndFiltered = tempEntries
    .sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();

      if (sortType === "newest") return timeB - timeA; // newest first
      if (sortType === "oldest") return timeA - timeB; // oldest first
      if (sortType === "mood") {
        return a.selectedMood.localeCompare(b.selectedMood);
      }

      return timeB - timeA;
    })
    .filter((n) => {
      if (searchfilter === "") return true;
      return (
        n.note.toLowerCase().includes(searchfilter.toLowerCase()) ||
        n.selectedMood.toLowerCase().includes(searchfilter.toLowerCase())
      );
    });

  return (
    <div>
      {entries.length === 0 && <p>No entries yet.</p>}
      <label>Filter:</label>

      <input
        value={searchfilter}
        onChange={(e) => setFilter(e.target.value)}
      ></input>
      <select value={sortType} onChange={(e) => setSort(e.target.value)}>
        <option value={"newest"}>newest</option>
        <option value={"oldest"}>oldest</option>
        <option value={"mood"}>mood</option>
      </select>
      {sortedAndFiltered.map((n) => {
        const isediting = editingid === n.id;
        return (
          <div key={n.id} className="entry-card">
            <p>Your mood is {n.selectedMood}</p>
            <p>and your note is {n.note}</p>
            <p style={{ fontSize: "12px", opacity: 0.7 }}>
              created at: {new Date(n.createdAt).toLocaleString()}
            </p>

            <button onClick={() => handleDelete(n.id)}>Delete</button>
            <button
              onClick={() => {
                setEditingId(n.id);
                settempNote(n.note);
                setCancelNote(tempNote);
              }}
            >
              Edit
            </button>
            {isediting && (
              <div>
                <textarea value={tempNote} onChange={onEdit}></textarea>
                <button
                  onClick={() => {
                    setEditingId(0);
                    handleEdit(n.id, tempNote);
                    console.log(tempNote);
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingId(0);
                    settempNote(cancelNote);
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
