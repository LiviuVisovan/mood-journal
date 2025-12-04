import MoodSelector from "./components/MoodSelector";
import NoteInput from "./components/NoteInput";
import MoodEntryPreview from "./components/MoodEntryPreview";

import { useState, useEffect } from "react";

type notesType = {
  note: string;
  selectedMood: string;
  id: number;
  createdAt: string;
};

export default function Journal() {
  const [selectedMood, setSelectedMood] = useState("anxious");
  const [note, setNote] = useState("");
  const STORAGE_KEY = "mood-entries";

  const [notes, setNotes] = useState<notesType[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored) as notesType[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  function handleDelete(id: number) {
    setNotes((prev) => prev.filter((e) => e.id !== id));
  }

  function handleEdit(id: number, newnote: string) {
    setNotes((prev) =>
      prev.map((e) => (e.id == id ? { ...e, note: newnote } : e))
    );
  }

  function handleSave() {
    const newNote: notesType = {
      note,
      selectedMood,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setNote("");
  }

  function handleClear() {
    setNotes([]);
  }
  function moodSelector(mood: string) {
    setSelectedMood(mood);
  }
  return (
    <div className="journal-page">
      <h1 style={{ marginBottom: "16px" }}>Mood Journal</h1>

      <section className="journal-section">
        <MoodSelector selector={moodSelector} />
        <NoteInput note={(m) => setNote(m)} />
        <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
          <button onClick={handleSave} disabled={note.trim().length === 0}>
            Save Entry
          </button>
          <button onClick={handleClear} disabled={notes.length === 0}>
            Clear All Entry
          </button>
        </div>
      </section>
      <section className="journal-section">
        <MoodEntryPreview
          entries={notes}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </section>
    </div>
  );
}
