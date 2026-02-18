import { PricingItem } from "@/types";

export const pricingData: PricingItem[] = [
  {
    type: "Klasická masáž",
    durations: [
      { minutes: 60, price: 40 },
      { minutes: 90, price: 55 },
      { minutes: 120, price: 80 },
    ],
  },
  {
    type: "Klasická masáž s prvkami Športovej masáže",
    durations: [
      { minutes: 60, price: 45 },
      { minutes: 90, price: 60 },
      { minutes: 120, price: 90 },
    ],
  },
  {
    type: "Klasická masáž s použitím Bankovej terapie",
    durations: [{ minutes: 60, price: 60 }],
  },
  {
    type: "Klasická masáž s prvkami Mäkkých techník",
    durations: [{ minutes: 60, price: 60 }],
  },
];
