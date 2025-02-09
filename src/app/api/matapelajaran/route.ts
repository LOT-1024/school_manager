import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const mapels = await prisma.mataPelajaran.findMany({
      include: { guruMapel: true },
    });
    return NextResponse.json(mapels);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch mata pelajaran" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { namaMapel, guruIds } = await req.json();
    const newMapel = await prisma.mataPelajaran.create({
      data: {
        namaMapel,
        // Optional: create relations if guru IDs are provided
        guruMapel: guruIds
          ? {
              create: guruIds.map((guruId: number) => ({
                guru: { connect: { id: guruId } },
              })),
            }
          : undefined,
      },
    });
    return NextResponse.json(newMapel, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create mata pelajaran" }, { status: 500 });
  }
}


