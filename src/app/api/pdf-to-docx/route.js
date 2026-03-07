
// import { NextResponse } from 'next/server';
// import pdf_parse from 'pdf-parse-new';
// import { Document, Packer, Paragraph } from 'docx';

// export const runtime = 'nodejs';

// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get('file');

//     if (!file) {
//       return NextResponse.json(
//         { error: 'PDF file required hai.' },
//         { status: 400 }
//       );
//     }

//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // pdf-parse-new se text nikaalo
//     const data = await pdf_parse(buffer); // data.text[web:56]
//     const text = data.text || '';

//     if (!text.trim()) {
//       return NextResponse.json(
//         { error: 'PDF se text extract nahi ho saka.' },
//         { status: 500 }
//       );
//     }

//     const paragraphs = text
//       .split('\n')
//       .filter((line) => line.trim().length > 0)
//       .map(
//         (line) =>
//           new Paragraph({
//             text: line,
//           })
//       );

//     const doc = new Document({
//       sections: [
//         {
//           children: paragraphs,
//         },
//       ],
//     });

//     const docBuffer = await Packer.toBuffer(doc);

//     return new NextResponse(docBuffer, {
//       status: 200,
//       headers: {
//         'Content-Type':
//           'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//         'Content-Disposition': 'attachment; filename="converted.docx"',
//       },
//     });
//   } catch (err) {
//     console.error('PDF->DOCX error:', err);
//     return NextResponse.json(
//       { error: 'Convert nahi ho saka. Dobara try karein.' },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import pdf_parse from 'pdf-parse-new';
import { Document, Packer, Paragraph } from 'docx';
import JSZip from 'jszip';

export const runtime = 'nodejs';

async function pdfBufferToText(buffer) {
  const data = await pdf_parse(buffer); // data.text[web:56]
  return data.text || '';
}

async function textToDocxBuffer(text) {
  const paragraphs =
    text
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => new Paragraph({ text: line })) || [];

  const doc = new Document({
    sections: [
      {
        children: paragraphs.length ? paragraphs : [new Paragraph({ text: '' })],
      },
    ],
  });

  const docBuffer = await Packer.toBuffer(doc);
  return docBuffer;
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files');
    const format = formData.get('format') || 'docx'; // 'docx' | 'txt'

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'Kam az kam ek PDF file required hai.' },
        { status: 400 }
      );
    }

    // Single file + single output
    if (files.length === 1) {
      const file = files[0];
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const text = await pdfBufferToText(buffer);

      if (!text.trim()) {
        return NextResponse.json(
          { error: 'PDF se text extract nahi ho saka.' },
          { status: 500 }
        );
      }

      if (format === 'txt') {
        const txtBuffer = Buffer.from(text, 'utf-8');
        return new NextResponse(txtBuffer, {
          status: 200,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Content-Disposition': `attachment; filename="${file.name.replace(
              /\.pdf$/i,
              ''
            )}.txt"`,
          },
        });
      }

      // DOCX
      const docBuffer = await textToDocxBuffer(text);
      return new NextResponse(docBuffer, {
        status: 200,
        headers: {
          'Content-Type':
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'Content-Disposition': `attachment; filename="${file.name.replace(
            /\.pdf$/i,
            ''
          )}.docx"`,
        },
      });
    }

    // Multiple files => ZIP
    const zip = new JSZip(); // [web:79][web:81]

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const text = await pdfBufferToText(buffer);

      let outName = file.name.replace(/\.pdf$/i, '');
      if (!text.trim()) {
        zip.file(
          `${outName}-error.txt`,
          'Could not extract text from this PDF.'
        );
        continue;
      }

      if (format === 'txt') {
        zip.file(`${outName}.txt`, text);
      } else {
        const docBuffer = await textToDocxBuffer(text);
        zip.file(`${outName}.docx`, docBuffer);
      }
    }

    const zipContent = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    }); // [web:79][web:80]

    return new NextResponse(zipContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="converted-files.zip"`,
      },
    });
  } catch (err) {
    console.error('PDF->DOCX/TXT error:', err);
    return NextResponse.json(
      { error: 'Convert nahi ho saka. Dobara try karein.' },
      { status: 500 }
    );
  }
}
