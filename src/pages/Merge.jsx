// import { useState } from "react";
// import FileUploader from "../components/FileUploader";
// import PDFPreview from "../components/PDFPreview";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// export default function Merge() {

//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);

//   /* ---------------- REMOVE FILE ---------------- */
//   const removeFile = (index) => {
//     setFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   /* ---------------- DRAG REORDER ---------------- */
//   const handleDragEnd = (result) => {
//     if (!result.destination) return;

//     const items = Array.from(files);
//     const [moved] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, moved);
//     setFiles(items);
//   };

//   /* ---------------- MERGE FUNCTION ---------------- */
//   const handleMerge = async () => {

//     if (files.length < 2) {
//       alert("Please select at least 2 PDF files");
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       files.forEach(f => formData.append("files", f));

//       const res = await axios.post(
//         "http://localhost:5000/api/pdf/merge",
//         formData,
//         { responseType: "blob" }
//       );

//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "merged.pdf";
//       a.click();

//     } catch (err) {
//       alert("Merge failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- TOTAL SIZE ---------------- */
//   const totalSize = (
//     files.reduce((acc, f) => acc + f.size, 0) / 1024 / 1024
//   ).toFixed(2);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pb-32">

//       {/* NAVBAR */}
//       <div className="border-b border-white/10 backdrop-blur-md">
//         <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

//           <Link to="/" className="text-2xl font-bold text-blue-400">
//             PDF Ki Bari 🔧
//           </Link>

//           <Link to="/" className="text-gray-300 hover:text-white text-sm">
//             Home
//           </Link>

//         </div>
//       </div>

//       {/* HERO */}
//       <div className="text-center mt-12 px-4">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400">
//           Merge PDF Files
//         </h1>

//         <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
//           Combine multiple PDF documents into one single file.
//           Drag and arrange files in any order before merging.
//         </p>
//       </div>

//       {/* UPLOAD WORKSPACE */}
//       <div className="max-w-5xl mx-auto mt-12 px-4">
//         <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">

//           <FileUploader setFiles={setFiles} />

//           {files.length > 0 && (
//             <div className="mt-6 text-center text-sm text-gray-300">
//               <span className="font-semibold text-white">{files.length}</span> files selected • {totalSize} MB
//             </div>
//           )}

//         </div>
//       </div>

//       {/* EMPTY STATE */}
//       {files.length === 0 && (
//         <div className="text-center mt-16 text-gray-500">
//           <div className="text-6xl mb-4">📂</div>
//           <p>Upload PDF files to begin merging</p>
//         </div>
//       )}

//       {/* FILE PREVIEW GRID */}
//       {files.length > 0 && (
//         <div className="max-w-7xl mx-auto mt-14 px-6">

//           <h3 className="text-center mb-8 text-gray-300">
//             Drag & drop files to change merge order
//           </h3>

//           <DragDropContext onDragEnd={handleDragEnd}>
//             <Droppable droppableId="pdfs" direction="horizontal">
//               {(provided) => (
//                 <div
//                   ref={provided.innerRef}
//                   {...provided.droppableProps}
//                   className="flex flex-wrap justify-center gap-8"
//                 >

//                   {files.map((file, index) => (
//                     <Draggable
//                       key={file.name + index}
//                       draggableId={file.name + index}
//                       index={index}
//                     >
//                       {(provided) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className="bg-white text-black rounded-2xl p-4 w-[180px] shadow-2xl hover:scale-105 transition-all relative"
//                         >

//                           {/* ORDER BADGE */}
//                           <div className="absolute -top-3 -left-3 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow">
//                             {index + 1}
//                           </div>

//                           <PDFPreview file={file} />

//                           <p className="text-xs mt-3 text-center break-words font-medium">
//                             {file.name}
//                           </p>

//                           <p className="text-[11px] text-gray-500 text-center mt-1">
//                             {(file.size / 1024 / 1024).toFixed(2)} MB
//                           </p>

//                           <button
//                             onClick={() => removeFile(index)}
//                             className="mt-3 w-full bg-red-100 text-red-600 py-1 rounded-lg hover:bg-red-200 text-sm"
//                           >
//                             Remove
//                           </button>

//                         </div>
//                       )}
//                     </Draggable>
//                   ))}

//                   {provided.placeholder}

//                 </div>
//               )}
//             </Droppable>
//           </DragDropContext>
//         </div>
//       )}

//       {/* ACTION BAR */}
//       {files.length > 0 && (
//         <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-white/10 py-5 flex justify-center">

//           <button
//             disabled={files.length < 2 || loading}
//             onClick={handleMerge}
//             className={`px-12 py-4 rounded-2xl text-lg font-bold shadow-xl transition-all
//               ${files.length < 2
//                 ? "bg-gray-600 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700 hover:scale-105"}
//             `}
//           >
//             {loading ? "Merging... Please wait" : `Merge ${files.length} PDFs`}
//           </button>

//         </div>
//       )}

//       {/* LOADING OVERLAY */}
//       {loading && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-slate-800 p-8 rounded-2xl text-center shadow-2xl">
//             <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-transparent mx-auto mb-4"></div>
//             <p className="text-lg font-semibold">Merging your PDFs...</p>
//             <p className="text-sm text-gray-400 mt-1">Please do not close this page</p>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }
import { useState } from "react";
import FileUploader from "../components/FileUploader";
import PDFPreview from "../components/PDFPreview";
import axios from "axios";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Merge() {

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- REMOVE FILE ---------------- */
  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  /* ---------------- DRAG REORDER ---------------- */
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(files);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setFiles(items);
  };

  /* ---------------- MERGE FUNCTION ---------------- */
  const handleMerge = async () => {

    if (files.length < 2) {
      alert("Please select at least 2 PDF files");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      files.forEach(f => formData.append("files", f));

      const res = await axios.post(
        "http://localhost:5000/api/pdf/merge",
        formData,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      a.click();

    } catch (err) {
      console.error(err);
      alert("Merge failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- TOTAL SIZE ---------------- */
  const totalSize = (
    files.reduce((acc, f) => acc + f.size, 0) / 1024 / 1024
  ).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pb-32">

      {/* NAVBAR */}
      <div className="border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <Link to="/" className="text-2xl font-bold text-blue-400">
            PDF Ki Bari 🔧
          </Link>

          <Link to="/" className="text-gray-300 hover:text-white text-sm">
            Home
          </Link>

        </div>
      </div>

      {/* HERO */}
      <div className="text-center mt-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400">
          Merge PDF Files
        </h1>

        <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
          Combine multiple PDF documents into one single file.
          Upload, reorder, and download instantly.
        </p>
      </div>

      {/* ----------- UPLOAD WORKSPACE (NEW SPLIT STYLE) ----------- */}
      <div className="max-w-4xl mx-auto mt-12 px-4">

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl text-center">

          <h2 className="text-xl md:text-2xl font-semibold">
            Upload PDFs to Merge
          </h2>

          <p className="text-gray-300 mt-2">
            Add two or more PDF files and arrange them in the desired order
          </p>

          {/* Dropzone */}
          <div className="mt-8">
            <FileUploader setFiles={setFiles} />
          </div>

          {/* File Info */}
          {files.length > 0 && (
            <div className="mt-6 text-sm text-gray-300 bg-white/5 rounded-xl py-3 px-4 inline-block">
              <span className="text-white font-semibold">{files.length}</span> file(s)
              <span className="mx-2 text-gray-500">•</span>
              <span className="text-blue-300">{totalSize} MB total</span>
            </div>
          )}

        </div>
      </div>

      {/* EMPTY STATE */}
      {files.length === 0 && (
        <div className="text-center mt-16 text-gray-500">
          <div className="text-6xl mb-4">📂</div>
          <p>Upload PDF files to begin merging</p>
        </div>
      )}

      {/* FILE PREVIEW GRID */}
      {files.length > 0 && (
        <div className="max-w-7xl mx-auto mt-14 px-6">

          <h3 className="text-center mb-8 text-gray-300">
            Drag & drop files to change merge order
          </h3>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="pdfs" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-wrap justify-center gap-8"
                >

                  {files.map((file, index) => (
                    <Draggable
                      key={file.name + index}
                      draggableId={file.name + index}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white text-black rounded-2xl p-4 w-[180px] shadow-2xl hover:scale-105 transition-all relative"
                        >

                          {/* ORDER BADGE */}
                          <div className="absolute -top-3 -left-3 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow">
                            {index + 1}
                          </div>

                          <PDFPreview file={file} />

                          <p className="text-xs mt-3 text-center break-words font-medium">
                            {file.name}
                          </p>

                          <p className="text-[11px] text-gray-500 text-center mt-1">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>

                          <button
                            onClick={() => removeFile(index)}
                            className="mt-3 w-full bg-red-100 text-red-600 py-1 rounded-lg hover:bg-red-200 text-sm"
                          >
                            Remove
                          </button>

                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}

                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}

      {/* ACTION BAR */}
      {files.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-white/10 py-5 flex justify-center">

          <button
            disabled={files.length < 2 || loading}
            onClick={handleMerge}
            className={`px-12 py-4 rounded-2xl text-lg font-bold shadow-xl transition-all
              ${files.length < 2
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:scale-105"}
            `}
          >
            {loading ? "Merging... Please wait" : `Merge ${files.length} PDFs`}
          </button>

        </div>
      )}

      {/* LOADING OVERLAY */}
      {loading && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-8 rounded-2xl text-center shadow-2xl">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-transparent mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Merging your PDFs...</p>
            <p className="text-sm text-gray-400 mt-1">Please do not close this page</p>
          </div>
        </div>
      )}

    </div>
  );
}
