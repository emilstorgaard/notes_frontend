"use client";

import { getNotes } from "@/lib/notes";
import { useState } from "react";

type Note = {
  id: string;
  title: string;
  content: string;
  created: string;
};

type CreateNoteProps = {
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

export default function CreateNote({ setNotes }: CreateNoteProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://notesapi.emilstorgaard.dk/api/v1/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create note");
      }

      const initialNotes = await getNotes();
      setNotes(initialNotes);

      setTitle("");
      setContent("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-6 mb-16">
      <form
        onSubmit={createNote}
        className="flex gap-2 flex-col max-w-sm mx-auto"
      >
        <input
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
          required
        />
        <button
          type="submit"
          className="border border-slate-300 text-slate-300 px-2 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none p-1"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
}
