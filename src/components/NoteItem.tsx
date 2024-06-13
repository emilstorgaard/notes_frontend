import { formatDateTime } from "@/lib/dateTime";

type NoteItemProps = {
  id: string;
  title: string;
  content: string;
  created: string;
};

export function NoteItem({ id, title, content, created }: NoteItemProps) {
  return (
    <li className="m-4 block w-56 h-40 bg-yellow-300 text-black p-4 shadow-md transform -rotate-6 transition-transform duration-150 hover:scale-125 hover:shadow-xl">
      <h2 className="font-bold text-2xl">
        {title} #{id}
      </h2>
      <h5>{content}</h5>
      <p className="font-serif text-2xl">{formatDateTime(created)}</p>
    </li>
  );
}
