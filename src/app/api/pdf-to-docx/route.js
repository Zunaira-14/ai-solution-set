// // import { NextResponse } from 'next/server';
// // import pdf_parse from 'pdf-parse-new';
// // import { Document, Packer, Paragraph } from 'docx';
// // import JSZip from 'jszip';

// // export const runtime = 'nodejs';

// // async function pdfBufferToText(buffer) {
// //   const data = await pdf_parse(buffer);
// //   return data.text || '';
// // }

// // async function textToDocxBuffer(text) {
// //   const paragraphs =
// //     text
// //       .split('\n')
// //       .filter((line) => line.trim().length > 0)
// //       .map((line) => new Paragraph({ text: line })) || [];

// //   const doc = new Document({
// //     sections: [
// //       {
// //         children: paragraphs.length
// //           ? paragraphs
// //           : [new Paragraph({ text: '' })],
// //       },
// //     ],
// //   });

// //   const docBuffer = await Packer.toBuffer(doc);
// //   return docBuffer;
// // }

// // export async function POST(req) {
// //   try {
// //     const formData = await req.formData();
// //     const files = formData.getAll('files');
// //     const format = formData.get('format') || 'docx'; // 'docx' | 'txt'

// //     if (!files || files.length === 0) {
// //       return NextResponse.json(
// //         { error: 'Kam az kam ek PDF file required hai.' },
// //         { status: 400 }
// //       );
// //     }

// //     // SINGLE FILE
// //     if (files.length === 1) {
// //       const file = files[0];
// //       const arrayBuffer = await file.arrayBuffer();
// //       const buffer = Buffer.from(arrayBuffer);
// //       const text = await pdfBufferToText(buffer);

// //       if (!text.trim()) {
// //         return NextResponse.json(
// //           { error: 'PDF se text extract nahi ho saka.' },
// //           { status: 500 }
// //         );
// //       }

// //       const baseName = file.name.replace(/\.pdf$/i, '');

// //       if (format === 'txt') {
// //         const txtBuffer = Buffer.from(text, 'utf-8');
// //         return new NextResponse(txtBuffer, {
// //           status: 200,
// //           headers: {
// //             'Content-Type': 'text/plain; charset=utf-8',
// //             'Content-Disposition': `attachment; filename="${baseName}.txt"`,
// //           },
// //         });
// //       }

// //       const docBuffer = await textToDocxBuffer(text);
// //       return new NextResponse(docBuffer, {
// //         status: 200,
// //         headers: {
// //           'Content-Type':
// //             'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
// //           'Content-Disposition': `attachment; filename="${baseName}.docx"`,
// //         },
// //       });
// //     }

// //     // MULTIPLE FILES => ZIP
// //     const zip = new JSZip();

// //     for (const file of files) {
// //       const arrayBuffer = await file.arrayBuffer();
// //       const buffer = Buffer.from(arrayBuffer);
// //       const text = await pdfBufferToText(buffer);
// //       const baseName = file.name.replace(/\.pdf$/i, '');

// //       if (!text.trim()) {
// //         zip.file(
// //           `${baseName}-error.txt`,
// //           'Could not extract text from this PDF.'
// //         );
// //         continue;
// //       }

// //       if (format === 'txt') {
// //         zip.file(`${baseName}.txt`, text);
// //       } else {
// //         const docBuffer = await textToDocxBuffer(text);
// //         zip.file(`${baseName}.docx`, docBuffer);
// //       }
// //     }

// //     const zipContent = await zip.generateAsync({
// //       type: 'nodebuffer',
// //       compression: 'DEFLATE',
// //       compressionOptions: { level: 6 },
// //     });

// //     return new NextResponse(zipContent, {
// //       status: 200,
// //       headers: {
// //         'Content-Type': 'application/zip',
// //         'Content-Disposition': `attachment; filename="converted-files.zip"`,
// //       },
// //     });
// //   } catch (err) {
// //     console.error('PDF->DOCX/TXT error:', err);
// //     return NextResponse.json(
// //       { error: 'Convert nahi ho saka. Dobara try karein.' },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { NextResponse } from "next/server";
// import { Document, Packer, Paragraph } from "docx";
// import JSZip from "jszip";

// export const runtime = "nodejs";

// async function pdfBufferToText(buffer) {
//   // Dynamic import so Turbopack does not analyze pdf-parse-new at build time
//   const { default: pdf_parse } = await import("pdf-parse-new");
//   const data = await pdf_parse(buffer);
//   return data.text || "";
// }

// async function textToDocxBuffer(text) {
//   const paragraphs =
//     text
//       .split("\n")
//       .filter((line) => line.trim().length > 0)
//       .map((line) => new Paragraph({ text: line })) || [];

//   const doc = new Document({
//     sections: [
//       {
//         children: paragraphs.length
//           ? paragraphs
//           : [new Paragraph({ text: "" })],
//       },
//     ],
//   });

//   const docBuffer = await Packer.toBuffer(doc);
//   return docBuffer;
// }

// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const files = formData.getAll("files");
//     const format = formData.get("format") || "docx"; // 'docx' | 'txt'

//     if (!files || files.length === 0) {
//       return NextResponse.json(
//         { error: "Kam az kam ek PDF file required hai." },
//         { status: 400 }
//       );
//     }

//     // SINGLE FILE
//     if (files.length === 1) {
//       const file = files[0];
//       const arrayBuffer = await file.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);
//       const text = await pdfBufferToText(buffer);

//       if (!text.trim()) {
//         return NextResponse.json(
//           { error: "PDF se text extract nahi ho saka." },
//           { status: 500 }
//         );
//       }

//       const baseName = file.name.replace(/\.pdf$/i, "");

//       if (format === "txt") {
//         const txtBuffer = Buffer.from(text, "utf-8");
//         return new NextResponse(txtBuffer, {
//           status: 200,
//           headers: {
//             "Content-Type": "text/plain; charset=utf-8",
//             "Content-Disposition": `attachment; filename="${baseName}.txt"`,
//           },
//         });
//       }

//       const docBuffer = await textToDocxBuffer(text);
//       return new NextResponse(docBuffer, {
//         status: 200,
//         headers: {
//           "Content-Type":
//             "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//           "Content-Disposition": `attachment; filename="${baseName}.docx"`,
//         },
//       });
//     }

//     // MULTIPLE FILES => ZIP
//     const zip = new JSZip();

//     for (const file of files) {
//       const arrayBuffer = await file.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);
//       const text = await pdfBufferToText(buffer);
//       const baseName = file.name.replace(/\.pdf$/i, "");

//       if (!text.trim()) {
//         zip.file(
//           `${baseName}-error.txt`,
//           "Could not extract text from this PDF."
//         );
//         continue;
//       }

//       if (format === "txt") {
//         zip.file(`${baseName}.txt`, text);
//       } else {
//         const docBuffer = await textToDocxBuffer(text);
//         zip.file(`${baseName}.docx`, docBuffer);
//       }
//     }

//     const zipContent = await zip.generateAsync({
//       type: "nodebuffer",
//       compression: "DEFLATE",
//       compressionOptions: { level: 6 },
//     });

//     return new NextResponse(zipContent, {
//       status: 200,
//       headers: {
//         "Content-Type": "application/zip",
//         "Content-Disposition": `attachment; filename="converted-files.zip"`,
//       },
//     });
//   } catch (err) {
//     console.error("PDF->DOCX/TXT error:", err);
//     return NextResponse.json(
//       { error: "Convert nahi ho saka. Dobara try karein." },
//       { status: 500 }
//     );
//   }
// }