"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateGuruForm() {
  const [namaGuru, setNamaGuru] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/guru", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ namaGuru }),
      });
      if (res.ok) {
        router.push("/home/guru"); // Redirect to the guru listing page after creation
      } else {
        console.error("Error creating guru");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
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
          placeholder="Enter Guru Name"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Guru
      </button>
    </form>
  );
}
