import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Medal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const headinngFont = localFont({
    src: "../../public/fonts/font.woff2"
});

const textFont = Poppins({
    subsets: ["latin"],
    weight: [
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900"
    ],
})

const MarketingPage = () => {
    return (
        <div className="flex items-center justify-center flex-col min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
            <div className={cn(
                "flex items-center justify-center flex-col",
                headinngFont.className,
            )}>
                <div className="mb-4 flex items-center border shadow-lg p-4 bg-amber-100 text-amber-700 rounded-full uppercase animate-bounce"> 
                    <Medal className="h-6 w-6 mr-2"/>
                    Leaning System Managment
                </div>
                <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
                    LMS Help Community
                </h1>
                <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 py-2 rounded-md pb-4 w-fit animate-pulse">
                    Work Forward.
                </div>
            </div>
            <div className={cn(
                "text-sm md:text-xl text-neutral-600 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
                textFont.className,
            )}>
                Berkolaborasi dengan mudah, mengelola proyek tugas akhir , dan meningkatkan produktivitas dalam pengumpulan tugas akhir.  membantu anda dalam penyusunan skripsi mahasiswa Teknik Informatika dapat dilakukan secara online Dengan Boarify raih tujuan akademik Anda dengan lebih terencana dan terorganisir. Dan cepat tamat 
            </div>
            <Button className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white shadow-lg transform transition-transform duration-300 hover:scale-105" size="lg" asChild>
                <Link href="/sign-up">
                    Bergabung Di Boarify UNIMAL
                </Link>
            </Button>
        </div>
    );
};

export default MarketingPage;
