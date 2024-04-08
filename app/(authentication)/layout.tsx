
import "./../globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {/* Slide bar*/}
        {/*<p className="border" >Slidebar</p>*/}
        {/*main page */}
        {/* <div className="p-8 w-full"> */}

        {/* </div> */}
        <main className="h-screen flex flex-col justify-center items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
