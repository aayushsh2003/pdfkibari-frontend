// import { useState } from "react";
// import PDFPreview from "../components/PDFPreview";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export default function Split(){

//   const [file,setFile] = useState(null);
//   const [loading,setLoading] = useState(false);

//   const handleUpload = (e)=>{
//     setFile(e.target.files[0]);
//   };

//   const handleSplit = async()=>{

//     if(!file){
//       alert("Upload a PDF first");
//       return;
//     }

//     try{
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("file",file);

//       const res = await axios.post(
//         "http://localhost:5000/api/pdf/split",
//         formData,
//         { responseType:"blob" }
//       );

//       // download zip
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const a = document.createElement("a");
//       a.href=url;
//       a.download="split-pages.zip";
//       a.click();

//     }catch(err){
//       alert("Split failed");
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

//       <h1 className="text-3xl font-bold text-green-600 text-center mt-4">
//         Split PDF
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
//           onClick={handleSplit}
//           className="bg-green-600 text-white px-8 py-3 rounded-xl text-lg hover:bg-green-700"
//         >
//           {loading ? "Splitting..." : "Split PDF"}
//         </button>
//       </div>

//     </div>
//   )
// }

import { useState } from "react";
import PDFPreview from "../components/PDFPreview";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Split() {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSplit = async () => {

    if (!file) {
      alert("Upload a PDF first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "http://localhost:5000/api/pdf/split",
        formData,
        { responseType: "blob" }
      );

      // download zip
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "split-pages.zip";
      a.click();

    } catch (err) {
      alert("Split failed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pb-24">

      {/* Top Bar */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="text-green-400 font-semibold hover:text-green-300">
          ← Back to Home
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold text-green-400">
          Split PDF
        </h1>

        <div></div>
      </div>

      {/* Upload Card */}
      <div className="max-w-4xl mx-auto px-4">

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl text-center">

          <h2 className="text-xl md:text-2xl font-semibold">
            Upload a PDF to split
          </h2>

          <p className="text-gray-300 mt-2">
            Each page will be exported as a separate PDF inside a ZIP file
          </p>

          {/* Upload Box */}
          <div className="mt-8 flex justify-center">
            <label className="cursor-pointer border-2 border-dashed border-green-400 rounded-2xl p-12 w-full max-w-xl hover:bg-white/10 transition">

              <div className="text-5xl mb-3">📂</div>
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

        </div>
      </div>

      {/* Empty State */}
      {!file && (
        <div className="text-center mt-14 text-gray-400">
          <div className="text-6xl mb-4">📄</div>
          <p>No file selected</p>
          <p className="text-sm">Upload a PDF to preview and split</p>
        </div>
      )}

      {/* Preview Section */}
      {file && (
        <div className="max-w-4xl mx-auto mt-14 px-6">

          <h3 className="text-center mb-6 text-lg text-gray-300">
            File Preview
          </h3>

          <div className="bg-white text-black rounded-2xl p-6 shadow-xl flex flex-col items-center">

            <PDFPreview file={file} />

            <p className="mt-4 font-semibold text-center break-words">
              {file.name}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>

            <button
              onClick={() => setFile(null)}
              className="mt-4 text-red-500 text-sm hover:underline"
            >
              Remove file
            </button>

          </div>

        </div>
      )}

      {/* Sticky Split Button */}
      {file && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center">

          <button
            onClick={handleSplit}
            disabled={loading}
            className={`px-10 py-4 rounded-2xl text-lg font-bold shadow-2xl transition-all
              ${loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 hover:scale-105"}
            `}
          >
            {loading ? "Splitting PDF..." : "Split PDF"}
          </button>

        </div>
      )}

    </div>
  );
}
