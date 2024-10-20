import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
    return (
        <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-1 px-3 rounded">
                     BOARDIFY
                </div>
                <div className="space-x-4 flex items-center">
                    <Link href="/sign-in">
                        <Button size="sm" variant="outline" >
                            Login
                        </Button>
                    </Link>
                    <Link href="/sign-up">
                        <Button size="sm">
                            Bergabung Gratis
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
