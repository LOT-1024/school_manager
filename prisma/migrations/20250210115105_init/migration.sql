-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kelas" (
    "id" SERIAL NOT NULL,
    "namaKelas" TEXT NOT NULL,

    CONSTRAINT "kelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "siswa" (
    "id" SERIAL NOT NULL,
    "namaSiswa" TEXT NOT NULL,
    "kelasId" INTEGER NOT NULL,

    CONSTRAINT "siswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guru" (
    "id" SERIAL NOT NULL,
    "namaGuru" TEXT NOT NULL,

    CONSTRAINT "guru_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mata_pelajaran" (
    "id" SERIAL NOT NULL,
    "namaMapel" TEXT NOT NULL,

    CONSTRAINT "mata_pelajaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kelas_guru" (
    "id" SERIAL NOT NULL,
    "kelasId" INTEGER NOT NULL,
    "guruId" INTEGER NOT NULL,

    CONSTRAINT "kelas_guru_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guru_mapel" (
    "id" SERIAL NOT NULL,
    "guruId" INTEGER NOT NULL,
    "mapelId" INTEGER NOT NULL,

    CONSTRAINT "guru_mapel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "kelas_guru_kelasId_guruId_key" ON "kelas_guru"("kelasId", "guruId");

-- CreateIndex
CREATE UNIQUE INDEX "guru_mapel_guruId_mapelId_key" ON "guru_mapel"("guruId", "mapelId");

-- AddForeignKey
ALTER TABLE "siswa" ADD CONSTRAINT "siswa_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "kelas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kelas_guru" ADD CONSTRAINT "kelas_guru_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "kelas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kelas_guru" ADD CONSTRAINT "kelas_guru_guruId_fkey" FOREIGN KEY ("guruId") REFERENCES "guru"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guru_mapel" ADD CONSTRAINT "guru_mapel_guruId_fkey" FOREIGN KEY ("guruId") REFERENCES "guru"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guru_mapel" ADD CONSTRAINT "guru_mapel_mapelId_fkey" FOREIGN KEY ("mapelId") REFERENCES "mata_pelajaran"("id") ON DELETE CASCADE ON UPDATE CASCADE;
