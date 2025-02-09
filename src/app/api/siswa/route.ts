import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const siswa = await prisma.siswa.findMany({ include: { kelas: true } });
    return NextResponse.json(siswa);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch siswa" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { namaSiswa, kelasId } = await req.json();
    const newSiswa = await prisma.siswa.create({ data: { namaSiswa, kelasId } });
    return NextResponse.json(newSiswa, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create siswa" }, { status: 500 });
  }
}
