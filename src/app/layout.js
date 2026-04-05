
// import "./globals.css";
// import Navbar from "@/app/components/Navbar";
// import connectDB from "@/app/lib/mongodb";
// import Footer from "./components/Footer";
// import Script from "next/script";

// export const metadata = {
//   title: "DevCortex.ai",
//   description: "Developer behind DevCortex.ai, a modern AI tools platform for engineers and creators, featuring AI Code Fixer, Smart Summarizer, JSON Formatter, Image Optimizer, API Tester, and AI Content Humanizer. Skilled in building full‑stack JavaScript applications, integrating AI APIs, and optimizing performance, UX, and SEO for scalable, production‑ready web",
//       canonical: "https://www.devcortexai.me/",
//   icons: {
//     icon: "/favicon.ico",
//     apple: "/app/favicon-for-app",
//   },
//   verification: {
//     google: "google54af04aef387e2db",
//   },
//   other: {
//     "apple-mobile-web-app-title": "devcortexai",
//   },
// };

// export default async function RootLayout({ children }) {
//   try {
//     await connectDB();
//   } catch (error) {
//     console.error("Database connection failed:", error);
//   }

//   return (
//     <html lang="en">
//       <body className="bg-black text-white font-sans antialiased">
//         <Navbar />
//         <main className="mt-20">{children}</main>
//         <Footer />

//         {/* ✅ Schema.org JSON-LD */}
//         {/* <Script
//           id="schema-org"
//           type="application/ld+json"
//           strategy="afterInteractive"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               "@context": "https://schema.org",
//               "@type": "WebSite",
//               name: "devcortexai.me",
//               url: "https://www.devcortexai.me/",
//               potentialAction: {
//                 "@type": "SearchAction",
//                 target:
//                   "https://www.devcortexai.me/search?q={search_term_string}",
//                 "query-input": "required name=search_term_string",
//               },
//             }),
//           }}
//         /> */}

//         <script
//   type="application/ld+json"
//   dangerouslySetInnerHTML={{
//     __html: JSON.stringify({
//       "@context": "https://www.devcortexai.me/sitemaps/sitemap.xml",
//       "@type": "SoftwareApplication",
//       name: "DevCortex.ai",
//       url: "https://devcortexai.me",
//       applicationCategory: "DeveloperApplication",
//       operatingSystem: "Web",
//       description: "Developer behind DevCortex.ai, a modern AI tools platform for engineers and creators, featuring AI Code Fixer, Smart Summarizer, JSON Formatter, Image Optimizer, API Tester, and AI Content Humanizer. Skilled in building full‑stack JavaScript applications, integrating AI APIs, and optimizing web performance, UX, and SEO for production‑ready products.",
//       offers: {
//         "@type": "Offer",
//         price: "0",
//         priceCurrency: "USD"
//       }
//     }),
//   }}
// />

//         {/* ✅ Google Analytics */}
//         <Script
//           src="https://www.googletagmanager.com/gtag/js?id=G-QQJ3YC555K"
//           strategy="afterInteractive"
//         />
//         <Script
//           id="google-analytics"
//           strategy="afterInteractive"
//           dangerouslySetInnerHTML={{
//             __html: `
//               window.dataLayer = window.dataLayer || [];
//               function gtag(){dataLayer.push(arguments);}
//               gtag('js', new Date());
//               gtag('config', 'G-QQJ3YC555K');
//             `,
//           }}
//         />
//       </body>
//     </html>
//   );
// }



// import "./globals.css";
// import Navbar from "@/app/components/Navbar";
// import connectDB from "@/app/lib/mongodb";
// import Footer from "./components/Footer";
// import Script from "next/script";

// export const metadata = {
//   title: "DevCortex.ai",
//   description:
//     "Developer behind DevCortex.ai, a modern AI tools platform for engineers and creators, featuring AI Code Fixer, Smart Summarizer, JSON Formatter, Image Optimizer, API Tester, and AI Content Humanizer. Skilled in building full‑stack JavaScript applications, integrating AI APIs, and optimizing performance, UX, and SEO for scalable, production‑ready web.",
//   alternates: {
//     canonical: "https://www.devcortexai.me/",
//   },
//   icons: {
//     icon: "/favicon.ico",
//     apple: "/app/favicon-for-app",
//     { url: "/favicon.ico", sizes: "any" }
//     public/favicons.ico
//     src/app/api/favicon.ico/android-chrome-192x192.png
//     src/app/api/favicon.ico/android-chrome-512x512.png
//     src/app/api/favicon.ico/apple-touch-icon-57x57.png
//     src/app/api/favicon.ico/apple-touch-icon-60x60.png
//     src/app/api/favicon.ico/apple-touch-icon-72x72.png
//     src/app/api/favicon.ico/apple-touch-icon-76x76.png
//     src/app/api/favicon.ico/apple-touch-icon-114x114.png
//     src/app/api/favicon.ico/apple-touch-icon-120x120.png
//     src/app/api/favicon.ico/apple-touch-icon-144x144.png
//     src/app/api/favicon.ico/apple-touch-icon-152x152.png
//     src/app/api/favicon.ico/apple-touch-icon-180x180.png
//     src/app/api/favicon.ico/favicon-16x16.png
//     src/app/api/favicon.ico/favicon-32x32.png
//     src/app/api/favicon.ico/favicon-48x48.png
//     src/app/favicon-for-app/apple-icon.png
// src/app/favicon-for-app/favicon.ico
// src/app/favicon-for-app/icon0.svg
// src/app/favicon-for-app/icon1.png
//   },
//   verification: {
//     google: "google54af04aef387e2db",
//   },
//   other: {
//     "apple-mobile-web-app-title": "devcortexai",
//   },
// };

// export default async function RootLayout({ children }) {
//   try {
//     await connectDB();
//   } catch (error) {
//     console.error("Database connection failed:", error);
//   }

//   return (
//     <html lang="en">
//       <body className="bg-black text-white font-sans antialiased">
//         <Navbar />
//         <main className="mt-20">{children}</main>
//         <Footer />

//         {/* ✅ SoftwareApplication JSON-LD */}
//         <Script
//           id="devcortex-software-schema"
//           type="application/ld+json"
//           strategy="afterInteractive"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               "@context": "https://schema.org",
//               "@type": "SoftwareApplication",
//               name: "DevCortex.ai",
//               url: "https://www.devcortexai.me/",
//               applicationCategory: "DeveloperApplication",
//               operatingSystem: "Web",
//               description:
//                 "Developer behind DevCortex.ai, a modern AI tools platform for engineers and creators, featuring AI Code Fixer, Smart Summarizer, JSON Formatter, Image Optimizer, API Tester, and AI Content Humanizer. Skilled in building full‑stack JavaScript applications, integrating AI APIs, and optimizing web performance, UX, and SEO for production‑ready products.",
//               offers: {
//                 "@type": "Offer",
//                 price: "0",
//                 priceCurrency: "USD",
//               },
//             }),
//           }}
//         />

//         {/* ✅ Google Analytics */}
//         <Script
//           src="https://www.googletagmanager.com/gtag/js?id=G-QQJ3YC555K"
//           strategy="afterInteractive"
//         />
//         <Script
//           id="google-analytics"
//           strategy="afterInteractive"
//           dangerouslySetInnerHTML={{
//             __html: `
//               window.dataLayer = window.dataLayer || [];
//               function gtag(){dataLayer.push(arguments);}
//               gtag('js', new Date());
//               gtag('config', 'G-QQJ3YC555K');
//             `,
//           }}
//         />
//       </body>
//     </html>
//   );
// }






// src/app/layout.js
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import connectDB from "@/app/lib/mongodb";
import Footer from "./components/Footer";
import Script from "next/script";

export const metadata = {
  title: "DevCortex.ai",
  description:
    "Developer behind DevCortex.ai, a modern AI tools platform for engineers and creators, featuring AI Code Fixer, Smart Summarizer, JSON Formatter, Image Optimizer, API Tester, and AI Content Humanizer. Skilled in building full‑stack JavaScript applications, integrating AI APIs, and optimizing performance, UX, and SEO for scalable, production‑ready web.",
  alternates: {
    canonical: "https://www.devcortexai.me/",
  },
  icons: {
    // yeh public/favicon.ico use karega
    icon: "/favicon.ico",
  },
  verification: {
    google: "google54af04aef387e2db",
  },
  other: {
    "apple-mobile-web-app-title": "devcortexai",
  },
};

export default async function RootLayout({ children }) {
  try {
    await connectDB();
  } catch (error) {
    console.error("Database connection failed:", error);
  }

  return (
    <html lang="en">
      <body className="bg-black text-white font-sans antialiased">
        <Navbar />
        <main className="mt-20">{children}</main>
        <Footer />

        {/* SoftwareApplication JSON-LD */}
        <Script
          id="devcortex-software-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "DevCortex.ai",
              url: "https://www.devcortexai.me/",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Web",
              description:
                "Developer behind DevCortex.ai, a modern AI tools platform for engineers and creators, featuring AI Code Fixer, Smart Summarizer, JSON Formatter, Image Optimizer, API Tester, and AI Content Humanizer. Skilled in building full‑stack JavaScript applications, integrating AI APIs, and optimizing web performance, UX, and SEO for production‑ready products.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QQJ3YC555K"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QQJ3YC555K');
            `,
          }}
        />
      </body>
    </html>
  );
}
