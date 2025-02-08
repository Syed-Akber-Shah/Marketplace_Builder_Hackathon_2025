import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Component/Navbar"
import Navbartwo from "./Component/Navbartwo"
import Navbarthree from "./Component/Navbarthree"
import Footer from "./Component/Footer"



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
            
     
        <Navbar />
        <Navbartwo/>
        <Navbarthree/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
