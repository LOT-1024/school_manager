"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateSiswaPage() {
  const [namaSiswa, setNamaSiswa] = useState("");
  const [kelasId, setKelasId] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/siswa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ namaSiswa, kelasId: Number(kelasId) }),
    });
    router.push("/siswa");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Siswa</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-2">Nama Siswa</label>
          <input
            type="text"
            value={namaSiswa}
            onChange={(e) => setNamaSiswa(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Kelas ID</label>
          <input
            type="number"
            value={kelasId}
            onChange={(e) => setKelasId(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
