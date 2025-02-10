"use client"
import { useEffect, useState } from "react";
import { Trash, Pencil, Plus } from "lucide-react";
import Link from "next/link";

interface Kelas {
  id: number;
  namaKelas: string;
  kelasId: number;
}

export default function KelasPage() {
  const [kelas, setKelas] = useState<Kelas[]>([]);

  useEffect(() => {
    fetchKelas();
  }, []);

  const fetchKelas = async () => {
    const res = await fetch("/api/kelas");
    const data = await res.json();
    setKelas(data);
  };

  const deleteKelas = async (id:number) => {
    if (!confirm("Are you sure you want to delete this kelas?")) return;
    await fetch(`/api/kelas/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    fetchKelas();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Kelas Data</h1>
        <Link href="/home/kelas/create" className="bg-blue-500 text-white p-2 rounded flex items-center">
          <Plus className="w-5 h-5 mr-2" /> Create
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nama Kelas</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {kelas.map((item) => (
            <tr key={item.id} className="border">
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.namaKelas}</td>
              <td className="border px-4 py-2 flex space-x-2">
                <button onClick={() => deleteKelas(item.id)} className="text-red-500">
                  <Trash className="w-5 h-5" />
                </button>
                <Link href={`/home/kelas/update/${item.id}`} className="text-blue-500">
                  <Pencil className="w-5 h-5" />
                </Link>
              </td>
            </tr>
          ))}
          {kelas.length === 0 && (
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
