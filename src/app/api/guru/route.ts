import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch all gurus with their related kelas and mata pelajaran via join tables.
    const gurus = await prisma.guru.findMany({
      include: {
        kelasGuru: {
          include: { kelas: true },
        },
        guruMapel: {
          include: { mataPelajaran: true },
        },
      },
    });

    // Transform the data to return only the desired fields.
    const result = gurus.map((guru) => ({
      guruid: guru.id,
      namaGuru: guru.namaGuru,
      namaKelas:
        guru.kelasGuru && guru.kelasGuru.length > 0
          ? guru.kelasGuru.map((kg) => kg.kelas.namaKelas)
          : null,
      namaMapel:
        guru.guruMapel && guru.guruMapel.length > 0
          ? guru.guruMapel.map((gm) => gm.mataPelajaran.namaMapel)
          : null,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching combined guru data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { namaGuru, mataPelajaranIds } = await req.json();
    const newGuru = await prisma.guru.create({
      data: {
        namaGuru,
        // Optional: create relations if mataPelajaran IDs are provided
        guruMapel: mataPelajaranIds
          ? {
              create: mataPelajaranIds.map((mapelId: number) => ({
                mataPelajaran: { connect: { id: mapelId } },
              })),
            }
          : undefined,
      },
    });
    return NextResponse.json(newGuru, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create guru" },
      { status: 500 }
    );
  }
}
