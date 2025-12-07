"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type TipSlide = {
  title: string;
  description: string;
  illustration: string;
};

type Props = {
  tips: TipSlide[];
};

export function TipsDialog({ tips }: Props) {
  const slides = useMemo(() => tips.filter(Boolean), [tips]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);

  const current = slides[index] ?? slides[0];

  const goNext = () => setIndex((prev) => (prev + 1) % slides.length);
  const goPrev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const handlePointerDown = (clientX: number) => setStartX(clientX);
  const handlePointerUp = (clientX: number) => {
    if (startX === null) return;
    const delta = clientX - startX;
    const threshold = 40;
    if (delta > threshold) {
      goPrev();
    } else if (delta < -threshold) {
      goNext();
    }
    setStartX(null);
  };

  if (!slides.length) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="flex items-center gap-2 shadow-sm">
          <Sparkles className="h-4 w-4" />
          View illustrations
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{current?.title}</DialogTitle>
          <DialogDescription>Swipe through the tips with illustrations.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-full max-w-[420px] aspect-[4/3] relative overflow-hidden rounded-xl bg-muted/50"
            onPointerDown={(e) => handlePointerDown(e.clientX)}
            onPointerUp={(e) => handlePointerUp(e.clientX)}
            onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const touch = e.changedTouches[0];
              handlePointerUp(touch.clientX);
            }}
          >
            {current?.illustration ? (
              <Image
                src={current.illustration}
                alt={current.title}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            ) : null}
          </div>
          <p className="text-base text-foreground text-center px-4 leading-relaxed">
            {current?.description}
          </p>
        </div>
        <DialogFooter className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={goPrev} className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Prev
          </Button>
          <div className="text-xs text-muted-foreground">
            {index + 1} / {slides.length}
          </div>
          <Button variant="ghost" size="sm" onClick={goNext} className="gap-2">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

