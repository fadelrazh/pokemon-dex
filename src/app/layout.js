import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokemon Dex",
  description: "Pokemon Dex",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Pokemon Dex</title>
        <meta name="description" content="Pokemon Dex" />
        <link rel="icon" href="/pokeball-icon.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
