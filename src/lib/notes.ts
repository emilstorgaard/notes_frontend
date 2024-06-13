export async function getNotes() {
  const res = await fetch("https://notesapi.emilstorgaard.dk/api/v1/notes", {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}