// import { useDropzone } from "react-dropzone";

// export default function FileUploader({ setFiles }) {

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: { "application/pdf": [".pdf"] },
//     multiple: true,
//     onDrop: (acceptedFiles) => {
//       setFiles(prev => [...prev, ...acceptedFiles]);
//     }
//   });

//   return (
//     <div
//       {...getRootProps()}
//       className="w-full max-w-xl p-8 md:p-10 border-2 border-dashed rounded-xl text-center cursor-pointer bg-white"
//     >
//       <input {...getInputProps()} />
//       <p className="text-lg font-semibold">Drag & Drop PDF files here</p>
//       <p className="text-sm text-gray-500 mt-2">or click to upload</p>
//     </div>
//   );
// }
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

export default function FileUploader({ setFiles, multiple = true }) {

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(prev => multiple ? [...prev, ...acceptedFiles] : acceptedFiles);
  }, [setFiles, multiple]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple
  });

  return (
    <div
      {...getRootProps()}
      className={`
        w-full max-w-2xl mx-auto
        rounded-2xl p-14 text-center cursor-pointer
        border-2 border-dashed transition-all duration-300
        ${isDragActive
          ? "border-emerald-400 bg-emerald-500/10 scale-105 shadow-[0_0_40px_rgba(16,185,129,0.35)]"
          : "border-emerald-400/70 hover:bg-white/5 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]"}
      `}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center justify-center gap-4">

        {/* ICON */}
        <div className="text-6xl transition-all duration-300">
          {isDragActive ? "📥" : "📁"}
        </div>

        {/* TITLE */}
        <h2 className="text-xl md:text-2xl font-semibold text-white">
          {isDragActive ? "Drop your PDF here" : "Click to upload PDF"}
        </h2>

        {/* SUBTEXT */}
        <p className="text-gray-400 text-sm">
          or drag & drop your file here
        </p>

      </div>
    </div>
  );
}
