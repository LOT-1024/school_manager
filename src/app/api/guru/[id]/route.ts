import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);
  try {
    const guru = await prisma.guru.findUnique({
      where: { id: Number(id) },
      include: { guruMapel: true, kelasGuru: { include: { kelas: true } }  },
    });
    if (!guru) {
      return NextResponse.json({ error: "Guru not found" }, { status: 404 });
    }
    return NextResponse.json(guru);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch guru" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);
  try {
    const { namaGuru } = await req.json();
    const updatedGuru = await prisma.guru.update({
      where: { id: Number(id) },
      data: { namaGuru },
    });
    return NextResponse.json(updatedGuru);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update guru" }, { status: 500 });
  }
}


export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);
  try {
    // If your schema has onDelete: Cascade set, related guruMapel records will be automatically removed.
    const deletedGuru = await prisma.guru.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "Guru deleted successfully", deletedGuru });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete guru" }, { status: 500 });
  }
}
