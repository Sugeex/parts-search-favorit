export default function Loader({ text = 'Загрузка…' }) {
  return (
    <div className="flex items-center gap-2 py-4 text-fg-muted">
      <span
        aria-hidden="true"
        className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin motion-reduce:animate-pulse"
      />
      <span>{text}</span>
    </div>
  );
}
