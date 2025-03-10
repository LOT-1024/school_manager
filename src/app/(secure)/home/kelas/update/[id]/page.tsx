"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UpdateKelasPage() {
  const [namaKelas, setNamaKelas] = useState("");
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return; // Wait until id is available
    const fetchKelas = async () => {
      try {
        const res = await fetch(`/api/kelas/${id}`);
        if (!res.ok) {
          console.error("Failed to fetch kelas");
          return;
        }
        const data = await res.json();
        setNamaKelas(data.namaKelas || "");
      } catch (error) {
        console.error("Error fetching kelas:", error);
      }
    };
    fetchKelas();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/kelas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ namaKelas }),
      });
      if (res.ok) {
        router.push("/home/kelas");
      } else {
        console.error("Failed to update kelas");
      }
    } catch (error) {
      console.error("Error updating kelas:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Update Kelas</h1>
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-2">Nama Kelas</label>
          <input
            type="text"
            value={namaKelas}
            onChange={(e) => setNamaKelas(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
