"use client";

import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import Button from "@/components/shared/Button";
import { TimeSlot, BookingFormData } from "@/types";

interface BookingConfirmationProps {
  slot: TimeSlot;
  massageType: string;
  duration: number;
  onBack: () => void;
}

function formatTime(isoString: string): string {
  const timePart = isoString.split("T")[1];
  return timePart ? timePart.substring(0, 5) : "";
}

function formatDate(isoString: string): string {
  const datePart = isoString.split("T")[0];
  const [year, month, day] = datePart.split("-");
  return `${day}.${month}.${year}`;
}

const massageTypeLabels: Record<string, string> = {
  klasicka: "Klasická masáž",
  sportova: "Klasická masáž s prvkami Športovej masáže",
  bankova: "Klasická masáž s použitím Bankovej terapie",
  "makke-techniky": "Klasická masáž s prvkami Mäkkých techník",
};

export default function BookingConfirmation({
  slot,
  massageType,
  duration,
  onBack,
}: BookingConfirmationProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    meno: "",
    priezvisko: "",
    adresa: "",
    telefon: "",
    zdravotnyStav: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const allFieldsFilled = Object.values(formData).every(
    (v) => v.trim() !== ""
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const typeLabel = massageTypeLabels[massageType] || massageType;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!allFieldsFilled) return;
    setStatus("sending");

    try {
      const response = await fetch("/api/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startTime: slot.start,
          endTime: slot.end,
          meno: formData.meno,
          priezvisko: formData.priezvisko,
          adresa: formData.adresa,
          telefon: formData.telefon,
          zdravotnyStav: formData.zdravotnyStav,
          massageType: `${typeLabel} (${duration} min)`,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setStatus("success");
      } else {
        setErrorMsg(data.details || data.error || "Unknown error");
        setStatus("error");
      }
    } catch (err: unknown) {
      const e = err as { message?: string };
      setErrorMsg(e.message || "Network error");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-accent/20 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-heading mb-2">
          Rezervácia potvrdená!
        </h3>
        <p className="text-heading/70 mb-1">
          {typeLabel} — {duration} min
        </p>
        <p className="text-heading/70">
          {formatDate(slot.start)} o {formatTime(slot.start)} -{" "}
          {formatTime(slot.end)}
        </p>
        <p className="text-hover mt-4 text-sm">
          Ozvem sa vám na potvrdenie termínu.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-accent/20"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-heading">
          Dokončiť rezerváciu
        </h3>
        <button
          onClick={onBack}
          className="text-hover hover:text-primary transition-colors text-sm font-medium"
        >
          Späť
        </button>
      </div>

      {/* Selected info */}
      <div className="bg-accent/20 rounded-xl p-4 mb-6">
        <p className="font-medium text-heading">
          {typeLabel} — {duration} min
        </p>
        <p className="text-heading/70 text-sm">
          {formatDate(slot.start)} | {formatTime(slot.start)} -{" "}
          {formatTime(slot.end)}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="booking-meno"
              className="block text-sm font-medium text-heading mb-1"
            >
              Meno
            </label>
            <input
              type="text"
              id="booking-meno"
              name="meno"
              value={formData.meno}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-accent/40 bg-white/60 text-heading focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            />
          </div>
          <div>
            <label
              htmlFor="booking-priezvisko"
              className="block text-sm font-medium text-heading mb-1"
            >
              Priezvisko
            </label>
            <input
              type="text"
              id="booking-priezvisko"
              name="priezvisko"
              value={formData.priezvisko}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-accent/40 bg-white/60 text-heading focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="booking-adresa"
            className="block text-sm font-medium text-heading mb-1"
          >
            Adresa
          </label>
          <input
            type="text"
            id="booking-adresa"
            name="adresa"
            value={formData.adresa}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-accent/40 bg-white/60 text-heading focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
          />
        </div>

        <div>
          <label
            htmlFor="booking-telefon"
            className="block text-sm font-medium text-heading mb-1"
          >
            Telefón
          </label>
          <input
            type="tel"
            id="booking-telefon"
            name="telefon"
            value={formData.telefon}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-accent/40 bg-white/60 text-heading focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
          />
        </div>

        <div>
          <label
            htmlFor="booking-zdravotnyStav"
            className="block text-sm font-medium text-heading mb-1"
          >
            Zdravotný stav
          </label>
          <textarea
            id="booking-zdravotnyStav"
            name="zdravotnyStav"
            value={formData.zdravotnyStav}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Uveďte prosím dlhodobé diagnózy, ochorenia..."
            className="w-full px-4 py-3 rounded-xl border border-accent/40 bg-white/60 text-heading placeholder-heading/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={!allFieldsFilled || status === "sending"}
        >
          {status === "sending" ? "Rezervujem..." : "Potvrdiť rezerváciu"}
        </Button>

        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-600 font-medium mt-2"
          >
            Nastala chyba pri rezervácii. Skúste to prosím znova.
            {errorMsg && (
              <span className="block text-xs text-red-400 mt-1">
                Debug: {errorMsg}
              </span>
            )}
          </motion.p>
        )}
      </form>
    </motion.div>
  );
}
