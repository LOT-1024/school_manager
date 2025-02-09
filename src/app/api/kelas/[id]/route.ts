import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);
  try {
    const kelas = await prisma.kelas.findUnique({
      where: { id: Number(id) },
      include: { 
        siswa: true, 
        kelasGuru: { include: { guru: true } } 
      },
    });
    if (!kelas) {
      return NextResponse.json({ error: "Kelas not found" }, { status: 404 });
    }
    return NextResponse.json(kelas);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch kelas" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);
  try {
    const { namaKelas } = await req.json();
    const updatedKelas = await prisma.kelas.update({
      where: { id: Number(id) },
      data: { namaKelas },
    });
    return NextResponse.json(updatedKelas);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update kelas" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);
  try {
    await prisma.kelas.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "Kelas deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete kelas" }, { status: 500 });
  }
}
