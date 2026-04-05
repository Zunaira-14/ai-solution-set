// src/app/dashboard/image-optimizer/page.js

import ImageOptimizerClient from "./ImageOptimizerClient";

export const metadata = {
  title:
    "Image Optimizer | Compress & Convert Images for Faster Websites – DevCortex.ai",
  description:
    "Use the Image Optimizer to compress JPEG, PNG, and WebP images and convert them to WebP/JPG. Improve Core Web Vitals, SEO, and page speed with lighter assets.",
  keywords: [
    "image optimizer",
    "compress images online",
    "WebP converter",
    "JPG to WebP",
    "PNG compressor",
    "SEO image optimization",
    "Core Web Vitals images",
    "DevCortex image optimizer",
  ],
  openGraph: {
    title:
      "Image Optimizer | Compress & Convert Images for Web – DevCortex.ai",
    description:
      "Reduce image size by up to 90% while keeping visual quality sharp. Compress and convert images directly in your browser for faster-loading sites.",
    url: "https://www.devcortexai.me/dashboard/image-optimizer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Image Optimizer | Compress & Convert Images – DevCortex.ai",
    description:
      "Compress and convert images to WebP/JPG in the browser to boost performance and SEO.",
  },
  alternates: {
    canonical: "https://www.devcortexai.me/dashboard/image-optimizer",
  },
};

export default function ImageOptimizerPage() {
  return 
<ImageOptimizerClient/>}
