import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "@/theme/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DoyeCodes",
  description: "Edoye Ogoba Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
