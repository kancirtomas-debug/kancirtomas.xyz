"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CalendarView from "@/components/calendar/CalendarView";
import TimeSlotPicker from "@/components/calendar/TimeSlotPicker";
import BookingConfirmation from "@/components/calendar/BookingConfirmation";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { TimeSlot } from "@/types";

const massageTypeLabels: Record<string, string> = {
  klasicka: "Klasická masáž",
  sportova: "Klasická masáž s prvkami Športovej masáže",
  bankova: "Klasická masáž s použitím Bankovej terapie",
  "makke-techniky": "Klasická masáž s prvkami Mäkkých techník",
};
function CalendarContent() {
  const searchParams = useSearchParams();
  const massageType = searchParams.get("type") || "klasicka";
  const duration = parseInt(searchParams.get("duration") || "60", 10);
  const safeDuration = [60, 90, 120].includes(duration) ? duration : 60;

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  const fetchSlots = useCallback(
    async (date: string) => {
      setLoadingSlots(true);
      setSelectedSlot(null);
      setShowBooking(false);
      try {
        const response = await fetch(`/api/calendar/slots?date=${date}&duration=${safeDuration}`);
        const data = await response.json();
        setSlots(data.slots || []);
      } catch {
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    },
    [safeDuration]
  );
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    fetchSlots(date);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setShowBooking(true);
  };

  const typeLabel = massageTypeLabels[massageType] || massageType;

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <ScrollReveal>
        <h1 className="text-3xl md:text-4xl font-bold text-heading text-center mb-2">Rezervácia</h1>
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm">
            {typeLabel} — {safeDuration} min
          </span>
        </div>
      </ScrollReveal>

      {!showBooking ? (
        <div className="space-y-8">
          <ScrollReveal>
            <CalendarView onDateSelect={handleDateSelect} selectedDate={selectedDate} />
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <TimeSlotPicker slots={slots} loading={loadingSlots} selectedSlot={selectedSlot} onSlotSelect={handleSlotSelect} />
          </ScrollReveal>
        </div>
      ) : selectedSlot ? (
        <BookingConfirmation slot={selectedSlot} massageType={massageType} duration={safeDuration} onBack={() => setShowBooking(false)} />
      ) : null}
    </section>
  );
}

export default function ReservationCalendarPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-16 text-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></div>}>
      <CalendarContent />
    </Suspense>
  );
}