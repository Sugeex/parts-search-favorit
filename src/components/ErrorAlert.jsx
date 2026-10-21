export default function ErrorAlert({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-danger-line bg-danger-bg p-4 text-danger-fg"
    >
      <p className="text-pretty">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="min-h-10 rounded-md border border-danger-fg px-4 font-medium transition-[scale] duration-150 ease-out motion-safe:active:scale-[0.96]"
        >
          Повторить
        </button>
      )}
    </div>
  );
}
