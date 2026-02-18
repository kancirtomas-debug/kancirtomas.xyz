import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/lib/google-calendar";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      startTime,
      endTime,
      meno,
      priezvisko,
      adresa,
      telefon,
      zdravotnyStav,
      massageType,
    } = body;

    if (
      !startTime ||
      !endTime ||
      !meno ||
      !priezvisko ||
      !adresa ||
      !telefon ||
      !zdravotnyStav ||
      !massageType
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const event = await createBooking(
      startTime,
      endTime,
      meno,
      priezvisko,
      adresa,
      telefon,
      zdravotnyStav,
      massageType
    );

    return NextResponse.json({ success: true, eventId: event.id });
  } catch (error: unknown) {
    const err = error as { message?: string; code?: number; errors?: unknown[]; response?: { data?: unknown } };
    console.error("Booking error details:", {
      message: err.message,
      code: err.code,
      errors: err.errors,
      responseData: err.response?.data,
    });
    return NextResponse.json(
      {
        error: "Failed to create booking",
        details: err.message || "Unknown error",
        code: err.code,
      },
      { status: 500 }
    );
  }
}
