"use client"
import { useEffect, useState } from "react";
import { Trash, Pencil, Plus } from "lucide-react";
import Link from "next/link";

interface MataPelajaran {
  id: number;
  namaMapel: string;
  kelasId: number;
}

export default function MataPelajaranPage() {
  const [mataPelajaran, setMataPelajaran] = useState<MataPelajaran[]>([]);

  useEffect(() => {
    fetchMataPelajaran();
  }, []);

  const fetchMataPelajaran = async () => {
    const res = await fetch("/api/matapelajaran");
    const data = await res.json();
    setMataPelajaran(data);
  };

  const deleteMataPelajaran = async (id:number) => {
    if (!confirm("Are you sure you want to delete this matapelajaran?")) return;
    await fetch(`/api/matapelajaran/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    fetchMataPelajaran();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Mata Pelajaran Data</h1>
        <Link href="/home/matapelajaran/create" className="bg-blue-500 text-white p-2 rounded flex items-center">
          <Plus className="w-5 h-5 mr-2" /> Create
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nama Mata Pelajaran</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mataPelajaran.map((item) => (
            <tr key={item.id} className="border">
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.namaMapel}</td>
              <td className="border px-4 py-2 flex space-x-2">
                <button onClick={() => deleteMataPelajaran(item.id)} className="text-red-500">
                  <Trash className="w-5 h-5" />
                </button>
                <Link href={`/home/matapelajaran/update/${item.id}`} className="text-blue-500">
                  <Pencil className="w-5 h-5" />
                </Link>
              </td>
            </tr>
          ))}
          {mataPelajaran.length === 0 && (
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
