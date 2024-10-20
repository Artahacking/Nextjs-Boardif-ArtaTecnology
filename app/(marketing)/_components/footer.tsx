import { Button } from "@/components/ui/button";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Pastikan udah install react-icons

export const Footer = () => {
    return (
        <div className="w-full p-4 border-t bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg">
            <div className="md:max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button size="sm" variant="ghost" className="text-sm md:text-base hover:bg-white hover:text-blue-600 transition-colors">
                        Privacy Policy
                    </Button>
                    <Button size="sm" variant="ghost" className="text-sm md:text-base hover:bg-white hover:text-blue-600 transition-colors">
                        Terms of Service
                    </Button>
                </div>

                <div className="flex space-x-4 mt-2 md:mt-0">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="text-xl hover:text-blue-600 transition-colors" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-xl hover:text-blue-400 transition-colors" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-xl hover:text-pink-500 transition-colors" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-xl hover:text-blue-700 transition-colors" />
                    </a>
                </div>
            </div>
            <div className="mt-2 text-center text-xs md:text-sm">
                &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </div>
        </div>
    );
};
