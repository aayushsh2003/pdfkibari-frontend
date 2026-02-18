import { useState } from "react";
import PDFPreview from "../components/PDFPreview";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Compress() {

  const [file,setFile] = useState(null);
  const [level,setLevel] = useState("medium");
  const [loading,setLoading] = useState(false);
  const [originalSize,setOriginalSize] = useState(null);

  /* -------- Upload -------- */
  const handleUpload = (e)=>{
    const selected = e.target.files[0];
    if(!selected) return;

    setFile(selected);
    setOriginalSize((selected.size/(1024*1024)).toFixed(2));
  };

  /* -------- Compress -------- */
  const handleCompress = async()=>{

    if(!file){
      alert("Upload a PDF first");
      return;
    }

    try{
      setLoading(true);

      const formData = new FormData();
      formData.append("file",file);
      formData.append("level",level);

      const res = await axios.post(
        "http://localhost:5000/api/pdf/compress",
        formData,
        { responseType:"blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href=url;
      a.download="compressed.pdf";
      a.click();

    }catch(err){
      alert("Compression failed");
    }finally{
      setLoading(false);
    }
  };

  return(
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pb-32">

      {/* NAVBAR */}
      <div className="border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-red-400">
            PDF Ki Bari 🔧
          </Link>

          <Link to="/" className="text-gray-300 hover:text-white text-sm">
            Home
          </Link>
        </div>
      </div>

      {/* HERO */}
      <div className="text-center mt-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-400">
          Compress PDF
        </h1>

        <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
          Reduce file size while keeping the best possible quality.
        </p>
      </div>

      {/* UPLOAD WORKSPACE */}
      <div className="max-w-4xl mx-auto mt-12 px-4">

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl text-center">

          <h2 className="text-xl md:text-2xl font-semibold">
            Upload your PDF
          </h2>

          <p className="text-gray-300 mt-2">
            Choose a file to compress
          </p>

          {/* Upload Box */}
          <div className="mt-8 flex justify-center">
            <label className="cursor-pointer border-2 border-dashed border-red-400 rounded-2xl p-12 w-full max-w-xl hover:bg-white/10 transition">

              <div className="text-5xl mb-3">📄</div>
              <p className="text-lg font-medium">Click to upload PDF</p>
              <p className="text-sm text-gray-400 mt-1">
                or drag & drop your file here
              </p>

              <input
                type="file"
                accept="application/pdf"
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          </div>

          {file && (
            <div className="mt-6 text-sm text-gray-300 bg-white/5 rounded-xl py-3 px-4 inline-block">
              <span className="text-white font-semibold">{file.name}</span>
              <span className="mx-2 text-gray-500">•</span>
              {originalSize} MB
            </div>
          )}

        </div>
      </div>

      {/* PREVIEW */}
      {file && (
        <div className="flex justify-center mt-12">
          <div className="bg-white text-black rounded-2xl p-6 shadow-2xl text-center">
            <PDFPreview file={file}/>
            <p className="mt-3 font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">
              Original Size: {originalSize} MB
            </p>
          </div>
        </div>
      )}

      {/* COMPRESSION LEVEL */}
      {file && (
        <div className="max-w-5xl mx-auto mt-14 px-6">

          <h2 className="text-center text-xl font-semibold mb-8">
            Select Compression Level
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div
              onClick={()=>setLevel("low")}
              className={`cursor-pointer rounded-2xl p-6 border transition-all
              ${level==="low"
                ? "border-green-400 bg-green-500/10 scale-105"
                : "border-white/10 bg-white/5 hover:bg-white/10"}`}
            >
              <h3 className="text-lg font-bold text-green-400">Low</h3>
              <p className="text-sm text-gray-400 mt-2">Best Quality</p>
            </div>

            <div
              onClick={()=>setLevel("medium")}
              className={`cursor-pointer rounded-2xl p-6 border transition-all
              ${level==="medium"
                ? "border-blue-400 bg-blue-500/10 scale-105"
                : "border-white/10 bg-white/5 hover:bg-white/10"}`}
            >
              <h3 className="text-lg font-bold text-blue-400">Recommended</h3>
              <p className="text-sm text-gray-400 mt-2">Balanced</p>
            </div>

            <div
              onClick={()=>setLevel("high")}
              className={`cursor-pointer rounded-2xl p-6 border transition-all
              ${level==="high"
                ? "border-red-400 bg-red-500/10 scale-105"
                : "border-white/10 bg-white/5 hover:bg-white/10"}`}
            >
              <h3 className="text-lg font-bold text-red-400">High</h3>
              <p className="text-sm text-gray-400 mt-2">Smallest Size</p>
            </div>

          </div>
        </div>
      )}

      {/* ACTION BAR */}
      {file && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-white/10 py-5 flex justify-center">
          <button
            disabled={loading}
            onClick={handleCompress}
            className={`px-12 py-4 rounded-2xl text-lg font-bold shadow-xl transition-all
            ${loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 hover:scale-105"}
            `}
          >
            {loading ? "Compressing..." : "Compress PDF"}
          </button>
        </div>
      )}

    </div>
  )
}
