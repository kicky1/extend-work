import { NextResponse } from "next/server";
import { utapi } from "@/lib/uploadthing";

export const revalidate = 3600; // cache for 1 hour

export async function GET() {
  try {
    const { files } = await utapi.listFiles();

    const videoFiles = files.filter((f) =>
      f.name.match(/\.(mp4|webm|mov|ogg)$/i)
    );

    const urls = videoFiles.map((f) => ({
      key: f.key,
      name: f.name,
      url: `https://utfs.io/f/${f.key}`,
    }));

    return NextResponse.json(urls);
  } catch (error) {
    console.error("Failed to list videos:", error);
    return NextResponse.json(
      { error: "Failed to list videos" },
      { status: 500 }
    );
  }
}
