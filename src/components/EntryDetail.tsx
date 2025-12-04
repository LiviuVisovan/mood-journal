import { useParams } from "react-router-dom";

type JournalEntry = {
  note: string;
  selectedMood: string;
  id: number;
  createdAt: string;
};

type EntryDetailProps = {
  entries: JournalEntry[];
};

export default function EntryDetail({ entries }: EntryDetailProps) {
  const { id } = useParams();
  const numericId = Number(id);
  const entry = entries.find((e) => e.id === numericId);

  if (!entry) {
    return <p>Entry not found.</p>;
  }

  return (
    <div>
      <h2>Entry Detail</h2>
      <p>Your mood is: {entry.selectedMood}</p>
      <p>Your note:</p>
      <p>{entry.note}</p>
      <p style={{ fontSize: "12px", opacity: 0.7 }}>
        created at: {new Date(entry.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
