import { NextResponse } from "next/server";
import { HISTORY_IMAGES } from "@/lib/data";

export async function GET() {
  const items = HISTORY_IMAGES.map((url, index) => ({
    id: `history-${index + 1}`,
    type: "image",
    url,
    alt: `Previously generated artwork ${index + 1}`,
  }));

  return NextResponse.json({ items });
}
