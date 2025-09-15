import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingCircle from "./components/FloatingCircle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Leather Spot - Leather Clothes, Shoes, Bags And Accessories",
  description: "Leather Clothes, Shoes, Bags And Accessories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className= {`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        <FloatingCircle/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
