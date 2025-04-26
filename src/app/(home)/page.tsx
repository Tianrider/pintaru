import { Button } from '@/components/ui/button';
import { MacbookPro } from '@/components/ui/macbook-pro';
import { Book, Lightbulb, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="min-h-screen font-[family-name:var(--font-geist-sans)] md:pt-0">
        {/* Header Section */}
        <section className="min-h-screen flex flex-col">
          <div className="flex-1 flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-32 lg:py-24 lg:pb-32 bg-gradient-to-b justify-center py-8 md:py-12">
            <div className="w-full flex flex-col-reverse md:flex-row-reverse gap-8 md:gap-12 items-center">
              <div className="w-full md:w-1/2 rounded-xl bg-white p-4 h-[250px] sm:h-[300px] md:h-[450px] flex items-center justify-center">
                {/* <p className="text-gray-500 text-center px-4 text-sm sm:text-base">
									[Ilustrasi interaktif menunjukkan siswa
									mengakses video pembelajaran dengan AI
									Jawab.in]
								</p> */}
                {/* <div className="rounded-lg border-2 border-gray-200 shadow-sm p-2"> */}
                <MacbookPro src="/demo.gif" className="w-full h-full rounded-lg" />
                {/* </div> */}
              </div>

              <div className="w-full md:w-1/2 space-y-2 sm:space-y-6">
                <p className="bg-primary-yellow/20 rounded-full w-fit px-4 py-1 text-gray-700">Video & Cerita Interaktif Sesuai Gaya Belajarmu</p>
                <h1 className="text-2xl sm:text-3xl leading-tightest md:text-4xl max-sm:text-center lg:text-5xl font-bold text-gray-900">
                  <span className="text-primary">
                    Belajar Lebih <br /> <span className="font-black text-black">MENYENANGKAN!</span>
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-sm:text-center lg:w-xl">Dengan PINTARU, cukup ketik atau unggah soal, dan kamu akan langsung mendapatkan penjelasan visual berbentuk video atau cerita interaktif.Cocok untuk anak-anak, pelajar, dan siapa pun yang ingin belajar dengan cara yang berbeda.</p>

                <div className="relative inline-block">
                  <Button asChild size="lg" className="px-6 sm:px-8 md:px-10 py-4 md:py-6 text-lg sm:text-xl md:text-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
                    <Link href="/dashboard">Belajar Sekarang!</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary-blue text-white px-4 sm:px-8 md:px-16 lg:px-58 py-6 sm:py-8">
            <div className="flex flex-col md:flex-row gap-8 md:gap-6 lg:gap-10 justify-center items-stretch">
              <div className="flex flex-row items-center gap-3 w-full md:w-1/3">
                <Book className="h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 rounded" />
                <div className="flex flex-col gap-1">
                  <p className="text-lg sm:text-lg font-bold">Belajar Personal</p>
                  <p className="text-sm sm:text-base">Pembelajaran yang disesuaikan dengan gaya belajar Anda.</p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-3 w-full md:w-1/3">
                <Lightbulb className="h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 rounded" />
                <div className="flex flex-col gap-1">
                  <p className="text-lg sm:text-lg font-bold">Solusi Instan</p>
                  <p className="text-sm sm:text-base">Temukan jawaban lengkap dalam hitungan detik kapan saja.</p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-3 w-full md:w-1/3">
                <Video className="h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 rounded" />
                <div className="flex flex-col gap-1">
                  <p className="text-lg sm:text-lg font-bold">Format Video</p>
                  <p className="text-sm sm:text-base">Nikmati pembelajaran visual langkah demi langkah yang mudah dipahami.</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Us */}
          <div className="w-full flex items-center justify-center mx-auto lg:px-0 px-4 py-32 lg:py-32">
            <div className="max-w-5xl w-full flex flex-col md:flex-row-reverse gap-8 md:gap-24 items-center">
              <div className="w-full md:w-1/2 border-gray-300 rounded-xl bg-white flex items-center justify-center">
                <Image src="/student-girl.png" alt="Hero Image" className="rounded-xl aspect-contain" width={500} height={500} />
              </div>

              <div className="w-full md:w-1/2 space-y-4 sm:space-y-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  <span className="text-primary">Tentang Pintaru</span>
                </h1>

                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">Pintaru adalah platform pembelajaran inovatif yang menggabungkan kekuatan AI dengan pendekatan visual untuk membantu siswa memahami pelajaran dengan lebih baik. Dengan teknologi AI canggih, kami dapat memberikan penjelasan yang disesuaikan dengan gaya belajar setiap siswa, dilengkapi dengan video pembelajaran yang interaktif dan mudah dipahami.</p>

                <div className="relative inline-block">
                  <Button asChild size="lg" className="px-6 sm:px-8 bg-primary-blue md:px-10 py-4 md:py-6 text-lg sm:text-xl md:text-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
                    <Link href="/dashboard">Belajar Sekarang!</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="w-full bg-secondary-yellow py-10 border-t">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Logo and Address */}
              <div className="flex flex-col gap-4 ">
                <div className="flex items-center bg-white w-fit p-4 rounded-lg">
                  <Image src="/logo-expand.png" alt="Pintaru Logo" width={300} height={200} className="h-10 w-auto" />
                </div>
                <div className="text-gray-600">
                  <p>Universitas Indonesia, Depok</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">Kontak</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <a href="mailto:info@jawab.in">info@pintaru.id</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <a href="tel:+6281126566">+62 821 1338 3767</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="18" cy="6" r="0.5" fill="currentColor" />
                    </svg>
                    <a href="https://instagram.com/jawab.in">pintaru.id</a>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">Pintaru.id</h3>
                <div className="flex flex-col gap-2">
                  <Link href="/dashboard">Demo Aplikasi</Link>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 text-center">
              <p>Copyright © 2025 WENNOVATE</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
