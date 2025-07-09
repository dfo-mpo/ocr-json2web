// src/app/layout.js  
"use client";
import { Inter } from "next/font/google";  
import { SessionProvider } from 'next-auth/react';  
import "./globals.css";  
  
const inter = Inter({ subsets: ["latin"] });  
  
export default function RootLayout({ children }) {  
  return (  
    <html lang="en">  
      <head>  
        <title>OCR Project</title>  
        <meta name="description" content="OCR Project" />  
      </head>  
      <body className={inter.className}>  
        <SessionProvider>  
          {children}  
        </SessionProvider>  
      </body>  
    </html>  
  );  
}  