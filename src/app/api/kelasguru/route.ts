import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const kelasGuruEntries = await prisma.kelasGuru.findMany({
      include: { kelas: true, guru: true },
    });
    return NextResponse.json(kelasGuruEntries);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch kelas guru" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { kelasId, guruId } = await req.json();
    const newEntry = await prisma.kelasGuru.create({
      data: { kelasId, guruId },
    });
    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create kelas guru" }, { status: 500 });
  }
}
