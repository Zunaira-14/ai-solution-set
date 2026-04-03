// // import "./globals.css";
// // import Navbar from "./components/Navbar";
// // export default function RootLayout({ children }) {
// //   return (
// //     <html lang="en">
// //       <body className="bg-black text-white">
// //         <Navbar />
// //         <main className="mt-20"> {/* Navbar fixed hai isliye thora margin diya */}
// //           {children}
// //         </main>
// //       </body>
// //     </html>
// //   );
// // }
// // 
// import "./globals.css";
// import Navbar from "@/app/components/Navbar";
// import connectDB from "@/app/lib/mongodb";
// import Footer from "./components/Footer"; 
// // import StatsSection from "./StatsSection.js/page";

// export default async function RootLayout({ children }) {
//   await connectDB(); // try-catch ki zarurat nahi agar env sahi ho

//   return (
//     <html lang="en">
//       <body className="bg-black text-white font-sans antialiased">
//         <Navbar />
//         <main className="mt-20">
//           {children}
//         </main>
//         {/* <StatsSection/> */}
//         <Footer/>
//       </body>
//     </html>
//   );
// }
// import "./globals.css";
// import Navbar from "@/app/components/Navbar";
// import connectDB from "@/app/lib/mongodb";
// import Footer from "./components/Footer";

// export const metadata = {
//   title: "DevCortex.ai",
//   description: "AI tools suite for developers",
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

// export default async function RootLayout({ children }) {
//   await connectDB();

//   return (
//     <html lang="en">
//       <body className="bg-black text-white font-sans antialiased">
//         <Navbar />
//         <main className="mt-20">{children}</main>
//         <Footer />
//       </body>
//     </html>
//   );
// }
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import connectDB from "@/app/lib/mongodb";
import Footer from "./components/Footer";

export const metadata = {
  title: "DevCortex.ai",
  description: "AI tools suite for developers",
  icons: {
    icon: "/favicon.ico",
    icon:"/app/favicon-for-app",
    icon:"/favicon.icos",

  },
  verification: {
    "google-site-verification": "google54af04aef387e2db.html", 
  },
};
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "http://www.sitemaps.org/schemas/sitemap/0.9",
      "@type": "WebSite",
      "name": "DevCortex.ai",
      "url": "https://www.devcortexai.me/"
    })
  }}
/>


export default async function RootLayout({ children }) {
  await connectDB();

  return (
    <html lang="en">
<meta name="apple-mobile-web-app-title" content="devcortexai" />
      <body className="bg-black text-white font-sans antialiased">
        <Navbar />
        <main className="mt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
