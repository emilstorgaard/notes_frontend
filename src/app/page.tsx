"use client";

import { useState, useEffect } from "react";
import { NoteItem } from "@/components/NoteItem";
import { getNotes } from "@/lib/notes";
import CreateNote from "@/components/CreateNote";

type Note = {
  id: string;
  title: string;
  content: string;
  created: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const initialNotes = await getNotes();
        setNotes(initialNotes);
      } catch (err) {
        setError("Failed to fetch notes");
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, []);

  return (
<>
  <div className="flex justify-between items-center mb-4 max-w-sm mx-auto">
    <h1 className="text-2xl">New Note</h1>
  </div>

  <CreateNote setNotes={setNotes} />

  <div className="max-w-screen-2xl mx-auto">
    {loading && (
      <div className="flex justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )}

    {error && <div className="text-red-500 mt-2">{error}</div>}

    {!loading && !error && (
      <ul className="flex flex-wrap justify-center mb-16">
        {notes.map((note: Note) => (
          <NoteItem key={note.id} {...note} />
        ))}
      </ul>
    )}
  </div>
</>
  );
}
