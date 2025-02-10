"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UpdateMataPelajaranPage() {
  const [namaMataPelajaran, setNamaMataPelajaran] = useState("");
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return; // Wait until id is available
    const fetchMataPelajaran = async () => {
      try {
        const res = await fetch(`/api/matapelajaran/${id}`);
        if (!res.ok) {
          console.error("Failed to fetch matapelajaran");
          return;
        }
        const data = await res.json();
        setNamaMataPelajaran(data.namaMapel || "");
      } catch (error) {
        console.error("Error fetching matapelajaran:", error);
      }
    };
    fetchMataPelajaran();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/matapelajaran/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ namaMapel: namaMataPelajaran }),
      });
      if (res.ok) {
        router.push("/home/matapelajaran");
      } else {
        console.error("Failed to update matapelajaran");
      }
    } catch (error) {
      console.error("Error updating matapelajaran:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Update Mata Pelajaran</h1>
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-md">
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
          Update
        </button>
      </form>
    </div>
  );
}
