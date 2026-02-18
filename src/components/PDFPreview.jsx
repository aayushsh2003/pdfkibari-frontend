import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

export default function PDFPreview({ file }) {

  const canvasRef = useRef(null);

  useEffect(() => {
    const render = async () => {

      const buffer = await file.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 0.6 });

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;
    };

    render();
  }, [file]);

  return <canvas ref={canvasRef} className="border rounded"/>;
}

// import { useEffect, useRef, useState } from "react";
// import * as pdfjsLib from "pdfjs-dist/build/pdf";

// pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

// export default function PDFPreview({ file }) {

//   const canvasRef = useRef(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [pages, setPages] = useState(null);

//   useEffect(() => {
//     if (!file) return;
//     let cancelled = false;

//     const render = async () => {
//       try {
//         setLoading(true);
//         setError(false);

//         const buffer = await file.arrayBuffer();
//         const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
//         if (cancelled) return;

//         setPages(pdf.numPages);

//         const page = await pdf.getPage(1);

//         // 🔹 Responsive scale based on screen width
//         const isMobile = window.innerWidth < 640;
//         const scale = isMobile ? 0.9 : 1.1;

//         const viewport = page.getViewport({ scale });

//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");

//         const dpr = window.devicePixelRatio || 1;

//         canvas.width = viewport.width * dpr;
//         canvas.height = viewport.height * dpr;

//         canvas.style.width = `${viewport.width}px`;
//         canvas.style.height = `${viewport.height}px`;

//         ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

//         await page.render({
//           canvasContext: ctx,
//           viewport
//         }).promise;

//         if (!cancelled) setLoading(false);

//       } catch (err) {
//         console.error(err);
//         setError(true);
//         setLoading(false);
//       }
//     };

//     render();
//     return () => { cancelled = true; };
//   }, [file]);

//   return (
//     <div
//       className="
//         group
//         w-[140px]
//         sm:w-[160px]
//         md:w-[180px]
//         mx-auto
//       "
//     >
//       {/* CARD */}
//       <div
//         className="
//           relative bg-white rounded-xl p-2
//           shadow-md sm:shadow-lg
//           transition-all
//           sm:hover:shadow-2xl sm:hover:-translate-y-1
//         "
//       >
//         {/* Loading */}
//         {loading && !error && (
//           <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
//         )}

//         {/* Error */}
//         {error && (
//           <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 rounded-xl text-red-500 text-xs">
//             <div className="text-xl mb-1">⚠️</div>
//             Preview failed
//           </div>
//         )}

//         {/* Page count */}
//         {pages && (
//           <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-[2px] rounded">
//             {pages} pages
//           </div>
//         )}

//         {/* PDF badge */}
//         <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-2 py-[2px] rounded">
//           PDF
//         </div>

//         {/* Paper shadow */}
//         <div className="absolute inset-0 translate-x-1 translate-y-1 bg-gray-200 rounded-xl -z-10 hidden sm:block"></div>

//         {/* Canvas */}
//         <canvas
//           ref={canvasRef}
//           className="rounded border border-gray-300 w-full"
//         />
//       </div>

//       {/* Filename */}
//       <div className="mt-2 text-center">
//         <p className="text-[11px] sm:text-xs text-gray-700 truncate font-medium">
//           {file?.name}
//         </p>
//       </div>
//     </div>
//   );
// }
