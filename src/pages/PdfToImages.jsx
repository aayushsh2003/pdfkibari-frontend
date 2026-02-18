// import { useState } from "react";
// import PDFPreview from "../components/PDFPreview";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export default function PdfToImages(){

//   const [file,setFile] = useState(null);
//   const [loading,setLoading] = useState(false);

//   const handleUpload = (e)=>{
//     setFile(e.target.files[0]);
//   };

//   const handleConvert = async()=>{

//     if(!file){
//       alert("Upload a PDF first");
//       return;
//     }

//     try{
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("file",file);

//       const res = await axios.post(
//         "http://localhost:5000/api/pdf/pdf-to-images",
//         formData,
//         { responseType:"blob" }
//       );

//       // download ZIP
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const a = document.createElement("a");
//       a.href=url;
//       a.download="pages-images.zip";
//       a.click();

//     }catch(err){
//       alert("Conversion failed");
//       console.log(err);
//     }finally{
//       setLoading(false);
//     }
//   };

//   return(
//     <div className="min-h-screen bg-gray-100 p-6">

//       <Link to="/" className="text-blue-600 font-semibold">
//         ← Back
//       </Link>

//       <h1 className="text-3xl font-bold text-orange-600 text-center mt-4">
//         PDF to Images
//       </h1>

//       {/* Upload */}
//       <div className="flex justify-center mt-8">
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={handleUpload}
//           className="bg-white p-4 rounded-xl shadow"
//         />
//       </div>

//       {/* Preview */}
//       {file && (
//         <div className="flex justify-center mt-10">
//           <div className="text-center">
//             <PDFPreview file={file}/>
//             <p className="mt-2 text-sm">{file.name}</p>
//           </div>
//         </div>
//       )}

//       {/* Button */}
//       <div className="flex justify-center mt-10">
//         <button
//           onClick={handleConvert}
//           className="bg-orange-600 text-white px-8 py-3 rounded-xl text-lg hover:bg-orange-700"
//         >
//           {loading ? "Extracting..." : "Extract Images"}
//         </button>
//       </div>

//     </div>
//   )
// }
import { useState } from "react";
import PDFPreview from "../components/PDFPreview";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PdfToImages(){

  const [file,setFile] = useState(null);
  const [loading,setLoading] = useState(false);
  const [fileSize,setFileSize] = useState(null);

  /* ---------- Upload ---------- */
  const handleUpload = (e)=>{
    const selected = e.target.files[0];
    if(!selected) return;

    setFile(selected);
    setFileSize((selected.size/(1024*1024)).toFixed(2));
  };

  /* ---------- Convert ---------- */
  const handleConvert = async()=>{

    if(!file){
      alert("Upload a PDF first");
      return;
    }

    try{
      setLoading(true);

      const formData = new FormData();
      formData.append("file",file);

      const res = await axios.post(
        "http://localhost:5000/api/pdf/pdf-to-images",
        formData,
        { responseType:"blob" }
      );

      // Download ZIP
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href=url;
      a.download="pages-images.zip";
      a.click();

    }catch(err){
      alert("Conversion failed");
      console.log(err);
    }finally{
      setLoading(false);
    }
  };

  return(
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pb-32">

      {/* NAVBAR */}
      <div className="border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-orange-400">
            PDF Ki Bari 🔧
          </Link>
          <Link to="/" className="text-gray-300 hover:text-white text-sm">
            Home
          </Link>
        </div>
      </div>

      {/* HERO */}
      <div className="text-center mt-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-400">
          PDF to Images
        </h1>

        <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
          Extract every page of your PDF as high-quality JPG images.
        </p>
      </div>

      {/* UPLOAD WORKSPACE */}
      <div className="max-w-4xl mx-auto mt-12 px-4">

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl text-center">

          <h2 className="text-xl md:text-2xl font-semibold">
            Upload a PDF file
          </h2>

          <p className="text-gray-300 mt-2">
            Each page will be converted into an image and downloaded as a ZIP
          </p>

          {/* Upload Box */}
          <div className="mt-8 flex justify-center">
            <label className="cursor-pointer border-2 border-dashed border-orange-400 rounded-2xl p-12 w-full max-w-xl hover:bg-white/10 transition hover:scale-105">

              <div className="text-5xl mb-3">📄</div>
              <p className="text-lg font-medium">Click to upload PDF</p>
              <p className="text-sm text-gray-400 mt-1">
                or drag & drop file here
              </p>

              <input
                type="file"
                accept="application/pdf"
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* File Info */}
          {file && (
            <div className="mt-6 text-sm text-gray-300 bg-white/5 rounded-xl py-3 px-4 inline-block">
              <span className="text-white font-semibold">{file.name}</span>
              <span className="mx-2 text-gray-500">•</span>
              {fileSize} MB
            </div>
          )}

        </div>
      </div>

      {/* PREVIEW */}
      {file && (
        <div className="flex justify-center mt-12">
          <div className="bg-white text-black rounded-2xl p-6 shadow-2xl text-center relative">

            {/* PDF Badge */}
            <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-md shadow">
              PDF
            </div>

            <PDFPreview file={file}/>

            <p className="mt-3 font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">
              File size: {fileSize} MB
            </p>

          </div>
        </div>
      )}

      {/* ACTION BAR */}
      {file && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-white/10 py-5 flex justify-center">
          <button
            disabled={loading}
            onClick={handleConvert}
            className={`px-12 py-4 rounded-2xl text-lg font-bold shadow-xl transition-all
            ${loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700 hover:scale-105"}
            `}
          >
            {loading ? "Extracting Images..." : "Extract Images"}
          </button>
        </div>
      )}

      {/* LOADING OVERLAY */}
      {loading && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-8 rounded-2xl text-center shadow-2xl">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-400 border-t-transparent mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Extracting images...</p>
            <p className="text-sm text-gray-400 mt-1">Please wait</p>
          </div>
        </div>
      )}

    </div>
  )
}
