"use client"
import { useEffect, useState } from "react";
import { Trash, Pencil, Plus } from "lucide-react";
import Link from "next/link";

interface Siswa {
  id: number;
  namaSiswa: string;
  kelasId: number;
}

export default function SiswaPage() {
  const [siswa, setSiswa] = useState<Siswa[]>([]);

  useEffect(() => {
    fetchSiswa();
  }, []);

  const fetchSiswa = async () => {
    const res = await fetch("/api/siswa");
    const data = await res.json();
    setSiswa(data);
  };

  const deleteSiswa = async (id:number) => {
    if (!confirm("Are you sure you want to delete this siswa?")) return;
    await fetch(`/api/siswa/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    fetchSiswa();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Siswa Data</h1>
        <Link href="/home/siswa/create" className="bg-blue-500 text-white p-2 rounded flex items-center">
          <Plus className="w-5 h-5 mr-2" /> Create
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nama Siswa</th>
            <th className="border px-4 py-2">Kelas ID</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {siswa.map((item) => (
            <tr key={item.id} className="border">
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.namaSiswa}</td>
              <td className="border px-4 py-2">{item.kelasId}</td>
              <td className="border px-4 py-2 flex space-x-2">
                <button onClick={() => deleteSiswa(item.id)} className="text-red-500">
                  <Trash className="w-5 h-5" />
                </button>
                <Link href={`/siswa/update/${item.id}`} className="text-blue-500">
                  <Pencil className="w-5 h-5" />
                </Link>
              </td>
            </tr>
          ))}
          {siswa.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center p-4">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
