import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Notes",
  description: "A notes app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/notes">Notes</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
