import { NextResponse } from 'next/server';
import { currentUser, auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client'; // Tambahkan import ini
import { db } from "@/lib/db"; // Pastikan ini sesuai dengan konfigurasi Anda

const prisma = new PrismaClient();

export async function GET() {
  const { userId } = auth(); // Mendapatkan userId dari auth
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 }); // Jika tidak ada userId, kembalikan status Unauthorized
  }

  // Mendapatkan informasi pengguna
  const user = await currentUser();
  if (!user) {
    return new NextResponse('User does not exist', { status: 404 }); // Jika pengguna tidak ditemukan, kembalikan status 404
  }

  // Cek apakah pengguna sudah ada di database
  let dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id }, // Mencari pengguna berdasarkan clerkId
  });

  // Jika pengguna belum ada, buat pengguna baru di database
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        name: user.firstName ?? '', // Ambil nama depan jika ada
        email: user.emailAddresses[0]?.emailAddress ?? '', // Ambil email pertama jika ada
      },
    });
  }

  // Jika pengguna baru berhasil dibuat atau ditemukan
  return NextResponse.json(dbUser); // Mengembalikan objek pengguna yang ditemukan atau baru dibuat
}
