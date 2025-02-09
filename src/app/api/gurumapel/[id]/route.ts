import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);
  try {
    const guruMapel = await prisma.guruMapel.findUnique({
      where: { id: Number(id) },
      include: { guru: true, mataPelajaran: true },
    });
    if (!guruMapel) {
      return NextResponse.json({ error: "Guru mapel not found" }, { status: 404 });
    }
    return NextResponse.json(guruMapel);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch guru mapel" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);
  try {
    const { guruId, mapelId } = await req.json();
    const updatedGuruMapel = await prisma.guruMapel.update({
      where: { id: Number(id) },
      data: {
        guruId,
        mapelId,
      },
    });
    return NextResponse.json(updatedGuruMapel);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update guru mapel" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);
  try {
    await prisma.guruMapel.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "Guru mapel deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete guru mapel" }, { status: 500 });
  }
}
