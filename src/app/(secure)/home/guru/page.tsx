"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash, Pencil, Plus } from "lucide-react";

export default function GuruTable() {
  const [gurus, setGurus] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/guru");
      const data = await res.json();
      setGurus(data);
    } catch (error) {
      console.error("Error fetching gurus:", error);
    }
  };

  const handleDelete = async (guruid: number) => {
    if (!confirm("Are you sure you want to delete this guru?")) return;
    try {
      await fetch(`/api/guru/${guruid}`, {
        method: "DELETE",
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting guru:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Guru Table</h1>
        <Link
          href="/siswa/create"
          className="bg-blue-500 text-white p-2 rounded flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" /> Create
        </Link>
      </div>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Nama Guru</th>
            <th className="border px-4 py-2">Nama Kelas</th>
            <th className="border px-4 py-2">Nama Mata Pelajaran</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {gurus.map((guru: any) => {
            const kelasNames =
              guru.namaKelas && guru.namaKelas.length > 0
                ? guru.namaKelas.join(", ")
                : "null";
            const mapelNames =
              guru.namaMapel && guru.namaMapel.length > 0
                ? guru.namaMapel.join(", ")
                : "null";

            return (
              <tr key={guru.guruid}>
                <td className="border px-4 py-2">{guru.namaGuru}</td>
                <td className="border px-4 py-2">
                  <div className="flex justify-between items-center">
                    <p>{kelasNames}</p>
                    <Link href={`/guru/edit/${guru.guruid}`}>
                      <Pencil className="w-5 h-5 text-blue-500 cursor-pointer" />
                    </Link>
                  </div>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex justify-between items-center">
                    <p>{mapelNames}</p>
                    <Link href={`/guru/edit/${guru.guruid}`}>
                      <Pencil className="w-5 h-5 text-blue-500 cursor-pointer" />
                    </Link>
                  </div>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex space-x-2">
                    <Link href={`/guru/edit/${guru.guruid}`}>
                      <Pencil className="w-5 h-5 text-blue-500 cursor-pointer" />
                    </Link>
                    <button onClick={() => handleDelete(guru.guruid)}>
                      <Trash className="w-5 h-5 text-red-500 cursor-pointer" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
          {gurus.length === 0 && (
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
