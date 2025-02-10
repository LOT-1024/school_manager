import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await Promise.resolve(params);
  try {
    const guru = await prisma.guru.findUnique({
      where: { id: Number(id) },
      include: {
        kelasGuru: {
          include: {
            kelas: true,
          },
        },
      },
    });

    if (!guru) {
      return NextResponse.json({ error: "Guru not found" }, { status: 404 });
    }

    // Extract only the kelas from the kelasGuru relation.
    const kelasList = guru.kelasGuru.map((kg) => kg.kelas);

    return NextResponse.json(kelasList);
  } catch (error) {
    console.error("Error fetching kelas for guru:", error);
    return NextResponse.json(
      { error: "Error fetching kelas for guru" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  // Ensure the params object is awaited before use
  const { id } = await Promise.resolve(context.params);
  try {
    const { kelasIds } = await req.json();

    // Remove all existing relationships for this guru in the KelasGuru join table
    await prisma.kelasGuru.deleteMany({
      where: { guruId: Number(id) },
    });

    // If new kelasIds are provided, create new join records
    if (Array.isArray(kelasIds) && kelasIds.length > 0) {
      await prisma.kelasGuru.createMany({
        data: kelasIds.map((kelasId: number) => ({
          guruId: Number(id),
          kelasId: kelasId,
        })),
      });
    }

    // Optionally, retrieve and return the updated guru with its kelas relationships
    const updatedGuru = await prisma.guru.findUnique({
      where: { id: Number(id) },
      include: { kelasGuru: { include: { kelas: true } } },
    });

    return NextResponse.json(updatedGuru);
  } catch (error) {
    console.error("Error updating guru kelas relation:", error);
    return NextResponse.json(
      { error: "Failed to update guru kelas relation" },
      { status: 500 }
    );
  }
}
