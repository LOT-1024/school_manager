export const guruService = {
  fetchGurus: async () => {
    const res = await fetch("/api/guru");
    return res.json();
  },

  fetchGuruMataPelajaran: async (guruId: number) => {
    const res = await fetch(`/api/guru/${guruId}/matapelajaran`);
    return res.json();
  },

  fetchGuruKelas: async (guruId: number) => {
    const res = await fetch(`/api/guru/${guruId}/kelas`);
    return res.json();
  },

  fetchAllMataPelajaran: async () => {
    const res = await fetch("/api/matapelajaran");
    return res.json();
  },

  fetchAllKelas: async () => {
    const res = await fetch("/api/kelas");
    return res.json();
  },

  deleteGuru: async (guruId: number) => {
    return fetch(`/api/guru/${guruId}`, {
      method: "DELETE",
    });
  },

  updateGuruMataPelajaran: async (guruId: number, data: {
    GuruName: string;
    mataPelajaranIds: number[];
  }) => {
    const res = await fetch(`/api/guru/${guruId}/matapelajaran`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Update failed");
    return res.json();
  },

  updateGuruKelas: async (guruId: number, data: {
    kelasIds: number[];
  }) => {
    const res = await fetch(`/api/guru/${guruId}/kelas`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Update failed");
    return res.json();
  },
};