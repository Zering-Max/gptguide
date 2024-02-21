import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import Providers from './providers';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GPTGuide",
  description: "GPTGuide : Votre assistant IA de voyage. Augmenté par openAI,un monsieur-je-sais-tout qui vous conseillera quoi visiter partout et bien plus !",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
