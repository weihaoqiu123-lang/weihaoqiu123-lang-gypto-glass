"use client";

import { useEffect, useRef, useState } from "react";

function TryOnModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      if (!open) {
        return;
      }

      setError("");

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (cameraError) {
        setError(
          cameraError instanceof Error
            ? cameraError.message
            : "Camera access was not granted.",
        );
      }
    }

    startCamera();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.72)] px-4">
      <div className="w-full max-w-4xl rounded-[2rem] bg-[#f7f1e8] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.2)] sm:p-6">
        <div className="flex items-center justify-between gap-4 border-b border-[rgba(23,19,16,0.08)] pb-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#8b806f]">
              Virtual try-on
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#171310]">
              Test the frame with your camera
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[rgba(23,19,16,0.12)] px-4 py-2 text-sm font-semibold text-[#171310]"
          >
            Close
          </button>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative overflow-hidden rounded-[1.8rem] bg-[#e9dfcf]">
            <video
              ref={videoRef}
              muted
              playsInline
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="relative h-40 w-72 opacity-90">
                <div className="absolute left-0 top-10 h-24 w-28 rounded-[3rem] border-[6px] border-white/90" />
                <div className="absolute right-0 top-10 h-24 w-28 rounded-[3rem] border-[6px] border-white/90" />
                <div className="absolute left-1/2 top-[5.4rem] h-[6px] w-12 -translate-x-1/2 rounded-full bg-white/90" />
              </div>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-[rgba(23,19,16,0.08)] bg-white p-5">
            <p className="text-sm leading-6 text-[#61584e]">
              This first version uses your camera feed with a centered frame guide
              so you can quickly judge fit and face width.
            </p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl bg-[#f6f1e8] px-4 py-3 text-sm text-[#171310]">
                Keep your face centered and look straight at the camera.
              </div>
              <div className="rounded-2xl bg-[#f6f1e8] px-4 py-3 text-sm text-[#171310]">
                Compare lens width against your eyes and cheek width.
              </div>
            </div>
            {error ? (
              <div className="mt-4 rounded-2xl border border-[rgba(192,108,75,0.2)] bg-[rgba(192,108,75,0.08)] px-4 py-3 text-sm text-[#9a4e35]">
                {error}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TryOnLauncher({
  className,
  label = "Try-On",
}: {
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>
      <TryOnModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
