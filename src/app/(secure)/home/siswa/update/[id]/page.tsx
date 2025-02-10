"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UpdateSiswaPage() {
  const [namaSiswa, setNamaSiswa] = useState("");
  const [kelasId, setKelasId] = useState<number | null>(null);
  const [allClasses, setAllClasses] = useState<any[]>([]);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    fetchSiswa();
    fetchClasses();
  }, [id]);

  // Fetch siswa data from /api/siswa/[id]
  const fetchSiswa = async () => {
    try {
      const res = await fetch(`/api/siswa/${id}`);
      if (!res.ok) {
        console.error("Failed to fetch siswa");
        return;
      }
      const data = await res.json();
      setNamaSiswa(data.namaSiswa || "");
      setKelasId(data.kelasId); // kelasId is a number from the API
    } catch (error) {
      console.error("Error fetching siswa:", error);
    }
  };

  // Fetch all classes from /api/kelas for the dropdown
  const fetchClasses = async () => {
    try {
      const res = await fetch("/api/kelas");
      if (!res.ok) {
        console.error("Failed to fetch classes");
        return;
      }
      const data = await res.json();
      setAllClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  // Update siswa using PUT /api/siswa/[id]
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/siswa/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ namaSiswa, kelasId }),
      });
      if (res.ok) {
        router.push("/home/siswa");
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
          <label className="block mb-2">Kelas</label>
          <select
            className="border p-2 rounded w-full"
            value={kelasId !== null ? kelasId : ""}
            onChange={(e) => setKelasId(Number(e.target.value))}
          >
            <option value="" disabled>
              Select Class
            </option>
            {allClasses.map((kelas) => (
              <option key={kelas.id} value={kelas.id}>
                {kelas.namaKelas}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
