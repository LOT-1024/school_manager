import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);
  const guruId = Number(id);
  try {
    // Find the guru with the specified id and include related mata pelajaran via guruMapel
    const guru = await prisma.guru.findUnique({
      where: { id: guruId },
      include: { 
        guruMapel: { 
          include: { mataPelajaran: true } 
        } 
      },
    });
    if (!guru) {
      return NextResponse.json({ error: "Guru not found" }, { status: 404 });
    }
    // Map out the mata pelajaran from the guruMapel relationship
    const mataPelajaran = guru.guruMapel.map((gm) => gm.mataPelajaran);
    return NextResponse.json(mataPelajaran);
  } catch (error) {
    console.error("Error fetching mata pelajaran:", error);
    return NextResponse.json(
      { error: "Failed to fetch mata pelajaran" },
      { status: 500 }
    );
  }
}

export async function PUT(
    req: Request,
    context: { params: { id: string } }
  ) {
    // Await the params before using them.
    const { id } = await Promise.resolve(context.params);
    try {
      // Expect a payload like:
      // { "namaGuru": "Updated Guru Name", "mataPelajaranIds": [1, 2, 3] }
      const { namaGuru, mataPelajaranIds } = await req.json();
  
      // Update the guru's name first.
      await prisma.guru.update({
        where: { id: Number(id) },
        data: { namaGuru },
      });
  
      // Remove all existing relations for this guru.
      await prisma.guruMapel.deleteMany({
        where: { guruId: Number(id) },
      });
  
      // If new relations are provided, add them.
      if (Array.isArray(mataPelajaranIds) && mataPelajaranIds.length > 0) {
        await prisma.guruMapel.createMany({
          data: mataPelajaranIds.map((mapelId: number) => ({
            guruId: Number(id),
            mapelId: mapelId,
          })),
        });
      }
  
      // Optionally, return the updated guru with its new relations.
      const updatedGuru = await prisma.guru.findUnique({
        where: { id: Number(id) },
        include: { guruMapel: true },
      });
  
      return NextResponse.json(updatedGuru);
    } catch (error) {
      console.error("Error updating guru:", error);
      return NextResponse.json(
        { error: "Failed to update guru" },
        { status: 500 }
      );
    }
  }