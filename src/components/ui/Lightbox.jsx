import { useCallback, useEffect, useRef } from "react";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
} from "./Icons";

export default function Lightbox({ images, index, onClose, onIndexChange }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const open = index !== null && index !== undefined;
  useBodyScrollLock(open);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      window.requestAnimationFrame(() => closeRef.current?.focus());
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleBackdrop = useCallback(
    (event) => {
      if (event.target === event.currentTarget) dialogRef.current?.close();
    },
    [],
  );

  const go = useCallback(
    (direction) => {
      if (!open) return;
      const next = (index + direction + images.length) % images.length;
      onIndexChange(next);
    },
    [images.length, index, onIndexChange, open],
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      }
    },
    [go],
  );

  const image = open ? images[index] : null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdrop}
      onKeyDown={handleKeyDown}
      aria-label="Photo viewer"
      className="lightbox-dialog focus-on-dark m-auto max-h-[100dvh] w-full max-w-6xl border-0 bg-transparent p-0 text-cream backdrop:bg-espresso"
    >
      {image && (
        <div className="flex min-h-[100dvh] flex-col">
          <div className="flex items-center justify-between px-3 py-3 sm:px-5">
            <p className="text-sm font-medium text-cream/75" aria-live="polite">
              {index + 1} / {images.length}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20"
              aria-label="Close photo viewer"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-2 pb-2 sm:px-16">
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-2 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-espresso/70 text-cream transition-colors hover:bg-espresso sm:left-4"
              aria-label="Previous photo"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>

            <img
              key={image.src}
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              className="max-h-[74dvh] w-auto max-w-full rounded-lg object-contain shadow-2xl sm:max-h-[78dvh]"
            />

            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-2 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-espresso/70 text-cream transition-colors hover:bg-espresso sm:right-4"
              aria-label="Next photo"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>

          <p className="px-5 pb-8 pt-3 text-center text-sm text-cream/70 sm:pb-6">
            {image.alt}
          </p>
        </div>
      )}
    </dialog>
  );
}
