"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditGuruForm() {
  const router = useRouter();
  const { id } = useParams(); // id is retrieved from the URL
  const [namaGuru, setNamaGuru] = useState("");

  useEffect(() => {
    // Fetch the current guru data to prefill the form
    const fetchGuru = async () => {
      try {
        const res = await fetch(`/api/guru/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch guru data");
        }
        const data = await res.json();
        setNamaGuru(data.namaGuru);
      } catch (error) {
        console.error("Error fetching guru:", error);
      }
    };

    if (id) {
      fetchGuru();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/guru/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ namaGuru }),
      });
      if (!res.ok) {
        throw new Error("Update failed");
      }
      router.push("/home/guru");
    } catch (error) {
      console.error("Error updating guru:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Nama Guru</label>
        <input
          type="text"
          value={namaGuru}
          onChange={(e) => setNamaGuru(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder={namaGuru || "Loading..."}
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Update Guru
      </button>
    </form>
  );
}
