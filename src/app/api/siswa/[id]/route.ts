import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    // Ensure params are awaited to satisfy Next.js dynamic API requirements
    const { id } = await Promise.resolve(params);
  
    try {
      const siswa = await prisma.siswa.findUnique({
        where: { id: Number(id) },
        // Optionally, include related data (like kelas) if needed:
        include: { kelas: true },
      });
  
      if (!siswa) {
        return NextResponse.json({ error: "Siswa not found" }, { status: 404 });
      }
  
      return NextResponse.json(siswa);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch siswa" },
        { status: 500 }
      );
    }
  }

export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  // Await the params object before using its properties.
  const { id } = await Promise.resolve(context.params);
  try {
    const { namaSiswa, kelasId } = await req.json();
    const updatedSiswa = await prisma.siswa.update({
      where: { id: Number(id) },
      data: { namaSiswa, kelasId: Number(kelasId) },
    });
    return NextResponse.json(updatedSiswa);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update siswa" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  // Await the params object before using its properties.
  const { id } = await Promise.resolve(context.params);
  try {
    await prisma.siswa.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Siswa deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete siswa" }, { status: 500 });
  }
}
