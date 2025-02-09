import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const guruMapels = await prisma.guruMapel.findMany({
      include: { guru: true, mataPelajaran: true },
    });
    return NextResponse.json(guruMapels);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch guru mapel" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { guruId, mapelId } = await req.json();
    const newGuruMapel = await prisma.guruMapel.create({
      data: {
        guruId,
        mapelId,
      },
    });
    return NextResponse.json(newGuruMapel, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create guru mapel" }, { status: 500 });
  }
}
