import MoodSelector from "./components/MoodSelector";
import NoteInput from "./components/NoteInput";
import MoodEntryPreview from "./components/MoodEntryPreview";
import EntryDetail from "./components/EntryDetail";

import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

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

  function calculateStats(empresscutetoday: notesType[]) {
    const moodStats: Record<string, number> = {};

    const entries = empresscutetoday;
    for (const entry of entries) {
      if (!moodStats[entry.selectedMood]) moodStats[entry.selectedMood] = 1;
      else moodStats[entry.selectedMood] = moodStats[entry.selectedMood] + 1;
    }
    return moodStats;
  }

  const [notes, setNotes] = useState<notesType[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored) as notesType[];
    } catch {
      return [];
    }
  });
  const stats = calculateStats(notes);

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
        <h2 className="section-title">Stats</h2>
        <p>Total entries: {notes.length}</p>

        {notes.length === 0 ? (
          <p className="muted">
            No entries yet. Start by adding your first mood.
          </p>
        ) : (
          <div className="stats-list">
            {Object.keys(stats).map((mood) => (
              <span key={mood} className="stats-pill">
                {mood}: {stats[mood]}
              </span>
            ))}
          </div>
        )}
      </section>
      <section className="journal-section">
        <Routes>
          <Route
            index
            element={
              <MoodEntryPreview
                entries={notes}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            }
          />
          <Route
            path=":id"
            element={<EntryDetail entries={notes} onDelete={handleDelete} />}
          />
        </Routes>
      </section>
    </div>
  );
}
