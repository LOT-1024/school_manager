import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const kelases = await prisma.kelas.findMany({
      // Include one-to-many relation with siswa and many-to-many via kelasGuru
      include: { 
        siswa: true, 
        kelasGuru: { 
          include: { guru: true } 
        } 
      },
    });
    return NextResponse.json(kelases);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch kelas" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { namaKelas } = await req.json();
    const newKelas = await prisma.kelas.create({
      data: { namaKelas },
    });
    return NextResponse.json(newKelas, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create kelas" }, { status: 500 });
  }
}
