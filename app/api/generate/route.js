import { NextResponse } from "next/server";
import {
  DEFAULT_PROMPT,
  PORTRAIT_IMAGES,
  SAMPLE_VIDEOS,
} from "@/lib/data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "image";
  const count = Math.min(
    Math.max(parseInt(searchParams.get("count") || "8", 10), 1),
    8
  );

  return NextResponse.json(
    buildResponse({
      prompt: DEFAULT_PROMPT,
      type,
      count,
      model: "Flux Pro",
    })
  );
}

export async function POST(request) {
  let body = {};

  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const type = body.type === "video" ? "video" : "image";
  const count = Math.min(Math.max(Number(body.count) || 8, 1), 8);
  const prompt = body.prompt?.trim() || DEFAULT_PROMPT;
  const model = body.model || "Flux Pro";

  return NextResponse.json(buildResponse({ prompt, type, count, model }));
}

function buildResponse({ prompt, type, count, model }) {
  if (type === "video") {
    const items = SAMPLE_VIDEOS.slice(0, Math.min(count, 4)).map((video, index) => ({
      id: `video-${index + 1}`,
      type: "video",
      url: video.url,
      poster: video.poster,
      alt: `Generated video ${index + 1}`,
    }));

    return { prompt, model, type, items };
  }

  const items = PORTRAIT_IMAGES.slice(0, count).map((url, index) => ({
    id: `image-${index + 1}`,
    type: "image",
    url,
    alt: `Generated portrait ${index + 1}`,
  }));

  return { prompt, model, type, items };
}
