import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import Link from "next/link";
import Image from "next/image";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      {/* Contact Support (global) - mirrors the FAQ placement but fixed for global pages */}
      <Link
        href="/contact"
        className="fixed top-2/3 right-0 p-4 items-center space-x-4 h-[48px] w-[200px] bg-[#182024] rounded-l-[24px] rounded-r-[8px] hover:border-cyan-400 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/20 hidden md:flex z-50"
      >
        <Image
          src="/assets/icons/contact.svg"
          alt="contact icon"
          width={14}
          height={14}
        />
        <span className="text-[#92A5A8]">Contact Support</span>
      </Link>

      {children}
      <Footer />
    </>
  );
}
