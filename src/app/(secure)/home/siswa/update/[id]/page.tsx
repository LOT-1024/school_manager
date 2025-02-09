"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UpdateSiswaPage() {
  const [namaSiswa, setNamaSiswa] = useState("");
  const [kelasId, setKelasId] = useState("");
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return; // Wait until id is available
    const fetchSiswa = async () => {
      try {
        const res = await fetch(`/api/siswa/${id}`);
        if (!res.ok) {
          console.error("Failed to fetch siswa");
          return;
        }
        const data = await res.json();
        setNamaSiswa(data.namaSiswa || "");
        // Convert kelasId to string for controlled number input
        setKelasId(data.kelasId ? String(data.kelasId) : "");
      } catch (error) {
        console.error("Error fetching siswa:", error);
      }
    };
    fetchSiswa();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/siswa/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ namaSiswa, kelasId: Number(kelasId) }),
      });
      if (res.ok) {
        router.push("/siswa");
      } else {
        console.error("Failed to update siswa");
      }
    } catch (error) {
      console.error("Error updating siswa:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Update Siswa</h1>
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-md">
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
          Update
        </button>
      </form>
    </div>
  );
}
