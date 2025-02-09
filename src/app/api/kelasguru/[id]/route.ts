import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);
  try {
    const entry = await prisma.kelasGuru.findUnique({
      where: { id: Number(id) },
      include: { kelas: true, guru: true },
    });
    if (!entry) {
      return NextResponse.json({ error: "KelasGuru entry not found" }, { status: 404 });
    }
    return NextResponse.json(entry);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch kelas guru entry" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);
  try {
    const { kelasId, guruId } = await req.json();
    const updatedEntry = await prisma.kelasGuru.update({
      where: { id: Number(id) },
      data: { kelasId, guruId },
    });
    return NextResponse.json(updatedEntry);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update kelas guru" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);
  try {
    await prisma.kelasGuru.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "KelasGuru entry deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete kelas guru" }, { status: 500 });
  }
}
