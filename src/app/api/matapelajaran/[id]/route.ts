import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);
  try {
    const mapel = await prisma.mataPelajaran.findUnique({
      where: { id: Number(id) },
      include: { guruMapel: true },
    });
    if (!mapel) {
      return NextResponse.json({ error: "Mata pelajaran not found" }, { status: 404 });
    }
    return NextResponse.json(mapel);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch mata pelajaran" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);
  try {
    const { namaMapel, guruIds } = await req.json();
    const updatedMapel = await prisma.mataPelajaran.update({
      where: { id: Number(id) },
      data: {
        namaMapel,
        // Optionally update relations
        guruMapel: guruIds
          ? {
              set: guruIds.map((guruId: number) => ({
                guru: { connect: { id: guruId } },
              })),
            }
          : undefined,
      },
    });
    return NextResponse.json(updatedMapel);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update mata pelajaran" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);
  try {
    const deletedMapel = await prisma.mataPelajaran.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "Mata pelajaran deleted successfully", deletedMapel });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete mata pelajaran" }, { status: 500 });
  }
}
