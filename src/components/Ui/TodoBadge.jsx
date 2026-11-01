export default function TodoBadge({ label = "content" }) {
  if (!import.meta.env.DEV) return null;

  return (
    <span
      className="inline-flex items-center rounded bg-yellow-300 px-2 py-0.5 align-middle text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-[#3b2a00] shadow-sm ring-1 ring-yellow-500/60"
      title={`TODO: ${label}`}
    >
      TODO
    </span>
  );
}
