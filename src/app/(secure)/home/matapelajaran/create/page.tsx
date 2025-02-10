"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateMataPelajaranPage() {
  const [namaMataPelajaran, setNamaMataPelajaran] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/matapelajaran", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ namaMapel: namaMataPelajaran}),
    });
    router.push("/home/matapelajaran");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Mata Pelajaran</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-2">Nama Mata Pelajaran</label>
          <input
            type="text"
            value={namaMataPelajaran}
            onChange={(e) => setNamaMataPelajaran(e.target.value)}
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
