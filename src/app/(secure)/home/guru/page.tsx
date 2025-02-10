"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash, Pencil, Plus } from "lucide-react";
import { guruService } from "@/services/guruService";
import { ManageItemsModal } from "@/components/ManageItemsModal";

export default function GuruTable() {
  const [gurus, setGurus] = useState<Guru[]>([]);
  const [selectedGuru, setSelectedGuru] = useState<Guru | null>(null);
  const [allMataPelajaran, setAllMataPelajaran] = useState<MataPelajaran[]>([]);
  const [allKelas, setAllKelas] = useState<Kelas[]>([]);
  const [showMataPelajaranModal, setShowMataPelajaranModal] = useState(false);
  const [showKelasModal, setShowKelasModal] = useState(false);
  const [pendingMataPelajaran, setPendingMataPelajaran] = useState<number[]>(
    []
  );
  const [pendingKelas, setPendingKelas] = useState<number[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await guruService.fetchGurus();
      setGurus(data);
    } catch (error) {
      console.error("Error fetching gurus:", error);
    }
  };

  const handleDelete = async (guruId: number) => {
    if (!confirm("Are you sure you want to delete this guru?")) return;
    try {
      await guruService.deleteGuru(guruId);
      fetchData();
    } catch (error) {
      console.error("Error deleting guru:", error);
    }
  };

  const openMataPelajaranModal = async (guru: Guru) => {
    setSelectedGuru(guru);
    setShowMataPelajaranModal(true);
    try {
      const [mataPelajaranData, allMataPelajaranData] = await Promise.all([
        guruService.fetchGuruMataPelajaran(guru.guruid),
        guruService.fetchAllMataPelajaran(),
      ]);
      setPendingMataPelajaran(mataPelajaranData.map((mp: any) => mp.id));
      setAllMataPelajaran(allMataPelajaranData);
    } catch (error) {
      console.error("Error fetching mata pelajaran data:", error);
    }
  };

  const openKelasModal = async (guru: Guru) => {
    setSelectedGuru(guru);
    setShowKelasModal(true);
    try {
      const [kelasData, allKelasData] = await Promise.all([
        guruService.fetchGuruKelas(guru.guruid),
        guruService.fetchAllKelas(),
      ]);
      setPendingKelas(kelasData.map((k: any) => k.id));
      setAllKelas(allKelasData);
    } catch (error) {
      console.error("Error fetching kelas data:", error);
    }
  };

  const handleUpdateMataPelajaran = async () => {
    if (!selectedGuru) return;
    try {
      await guruService.updateGuruMataPelajaran(selectedGuru.guruid, {
        GuruName: selectedGuru.namaGuru,
        mataPelajaranIds: pendingMataPelajaran,
      });
      await fetchData();
      setShowMataPelajaranModal(false);
    } catch (error) {
      console.error("Error updating mata pelajaran:", error);
    }
  };

  const handleUpdateKelas = async () => {
    if (!selectedGuru) return;
    try {
      await guruService.updateGuruKelas(selectedGuru.guruid, {
        kelasIds: pendingKelas,
      });
      await fetchData();
      setShowKelasModal(false);
    } catch (error) {
      console.error("Error updating kelas:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Guru Table</h1>
        <Link
          href="/home/guru/create"
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
          {gurus.map((guru) => (
            <tr key={guru.guruid}>
              <td className="border px-4 py-2">{guru.namaGuru}</td>
              <td className="border px-4 py-2">
                <div className="flex justify-between items-center">
                  <p>
                    {guru.namaKelas?.length
                      ? guru.namaKelas.join(", ")
                      : "null"}
                  </p>
                  <button
                    onClick={() => openKelasModal(guru)}
                    className="text-blue-500 underline"
                  >
                    Manage
                  </button>
                </div>
              </td>
              <td className="border px-4 py-2">
                <div className="flex justify-between items-center">
                  <p>
                    {guru.namaMapel?.length
                      ? guru.namaMapel.join(", ")
                      : "null"}
                  </p>
                  <button
                    onClick={() => openMataPelajaranModal(guru)}
                    className="text-blue-500 underline"
                  >
                    Manage
                  </button>
                </div>
              </td>
              <td className="border px-4 py-2">
                <div className="flex space-x-2">
                  <Link href={`/home/guru/update/${guru.guruid}`}>
                    <Pencil className="w-5 h-5 text-blue-500 cursor-pointer" />
                  </Link>
                  <button onClick={() => handleDelete(guru.guruid)}>
                    <Trash className="w-5 h-5 text-red-500 cursor-pointer" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {gurus.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center p-4">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showMataPelajaranModal && selectedGuru && (
        <ManageItemsModal
          title={`Manage Mata Pelajaran for ${selectedGuru.namaGuru}`}
          pendingItems={pendingMataPelajaran}
          allItems={allMataPelajaran}
          onClose={() => setShowMataPelajaranModal(false)}
          onUpdate={handleUpdateMataPelajaran}
          onAddItem={(id) => {
            if (!pendingMataPelajaran.includes(id)) {
              setPendingMataPelajaran([...pendingMataPelajaran, id]);
            }
          }}
          onDeleteItem={(id) => {
            setPendingMataPelajaran(
              pendingMataPelajaran.filter((itemId) => itemId !== id)
            );
          }}
          selectPlaceholder="Add Mata Pelajaran"
          getItemName={(item) => item.namaMapel}
        />
      )}

      {showKelasModal && selectedGuru && (
        <ManageItemsModal
          title={`Manage Kelas for ${selectedGuru.namaGuru}`}
          pendingItems={pendingKelas}
          allItems={allKelas}
          onClose={() => setShowKelasModal(false)}
          onUpdate={handleUpdateKelas}
          onAddItem={(id) => {
            if (!pendingKelas.includes(id)) {
              setPendingKelas([...pendingKelas, id]);
            }
          }}
          onDeleteItem={(id) => {
            setPendingKelas(pendingKelas.filter((itemId) => itemId !== id));
          }}
          selectPlaceholder="Add Kelas"
          getItemName={(item) => item.namaKelas}
        />
      )}
    </div>
  );
}
