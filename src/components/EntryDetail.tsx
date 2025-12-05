import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type JournalEntry = {
  note: string;
  selectedMood: string;
  id: number;
  createdAt: string;
};

type EntryDetailProps = {
  entries: JournalEntry[];
  onDelete: (id: number) => void;
};

export default function EntryDetail({ entries, onDelete }: EntryDetailProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const numericId = Number(id);
  const entry = entries.find((e) => e.id === numericId);

  if (!entry) {
    return <p>Entry not found.</p>;
  }

  return (
    <div className="journal-section">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <div className="entry-meta">
          <span>
            <span className="entry-label">Mood:</span> {entry.selectedMood}
          </span>
          <span>
            <span className="entry-label">Note:</span> {entry.note}
          </span>
          <span>
            <span className="entry-label">Created:</span>{" "}
            {new Date(entry.createdAt).toLocaleString()}
          </span>
        </div>

        <button
          onClick={() => {
            navigate("/journal");
            onDelete(entry.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
