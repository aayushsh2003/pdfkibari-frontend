import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";

export default function ImagesToPDF(){

  const [images,setImages] = useState([]);
  const [loading,setLoading] = useState(false);

  /* -------- Upload -------- */
  const handleUpload = (e)=>{
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
  };

  /* -------- Remove -------- */
  const removeImage = (index)=>{
    setImages(prev => prev.filter((_,i)=>i!==index));
  };

  /* -------- Reorder -------- */
  const handleDragEnd = (result)=>{
    if(!result.destination) return;

    const items = Array.from(images);
    const [moved] = items.splice(result.source.index,1);
    items.splice(result.destination.index,0,moved);

    setImages(items);
  };

  /* -------- Convert -------- */
  const handleConvert = async()=>{

    if(images.length===0){
      alert("Upload images first");
      return;
    }

    try{
      setLoading(true);

      const formData = new FormData();
      images.forEach(img=>formData.append("images",img));

      const res = await axios.post(
        "http://localhost:5000/api/pdf/images-to-pdf",
        formData,
        { responseType:"blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href=url;
      a.download="images.pdf";
      a.click();

    }catch(err){
      alert("Conversion failed");
      console.log(err);
    }finally{
      setLoading(false);
    }
  };

  const totalSize = (images.reduce((a,f)=>a+f.size,0)/(1024*1024)).toFixed(2);

  return(
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pb-32">

      {/* NAVBAR */}
      <div className="border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-purple-400">
            PDF Ki Bari 🔧
          </Link>
          <Link to="/" className="text-gray-300 hover:text-white text-sm">
            Home
          </Link>
        </div>
      </div>

      {/* HERO */}
      <div className="text-center mt-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-400">
          Images to PDF
        </h1>
        <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
          Convert multiple images into a single PDF. Drag to arrange page order.
        </p>
      </div>

      {/* UPLOAD WORKSPACE */}
      <div className="max-w-4xl mx-auto mt-12 px-4">

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl text-center">

          <h2 className="text-xl md:text-2xl font-semibold">
            Upload Images
          </h2>

          <p className="text-gray-300 mt-2">
            JPG, PNG, WEBP supported
          </p>

          <div className="mt-8 flex justify-center">
            <label className="cursor-pointer border-2 border-dashed border-purple-400 rounded-2xl p-12 w-full max-w-xl hover:bg-white/10 transition hover:scale-105">

              <div className="text-5xl mb-3">🖼️</div>
              <p className="text-lg font-medium">Click to upload images</p>
              <p className="text-sm text-gray-400 mt-1">
                or drag & drop files here
              </p>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          </div>

          {images.length>0 && (
            <div className="mt-6 text-sm text-gray-300 bg-white/5 rounded-xl py-3 px-4 inline-block">
              <span className="text-white font-semibold">{images.length}</span> images
              <span className="mx-2 text-gray-500">•</span>
              {totalSize} MB total
            </div>
          )}

        </div>
      </div>

      {/* IMAGE PREVIEW GRID */}
      {images.length>0 && (
        <div className="max-w-7xl mx-auto mt-14 px-6">

          <h3 className="text-center mb-8 text-gray-300">
            Drag & drop to change page order
          </h3>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="images" direction="horizontal">
              {(provided)=>(
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-wrap gap-8 justify-center"
                >

                  {images.map((img,index)=>(
                    <Draggable
                      key={img.name + index}
                      draggableId={img.name + index}
                      index={index}
                    >
                      {(provided)=>(
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white text-black rounded-2xl p-3 w-[180px] shadow-2xl hover:scale-105 transition relative"
                        >

                          {/* PAGE NUMBER */}
                          <div className="absolute -top-3 -left-3 bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow">
                            {index+1}
                          </div>

                          <img
                            src={URL.createObjectURL(img)}
                            alt=""
                            className="h-48 w-full object-cover rounded"
                          />

                          <p className="text-xs mt-2 text-center break-words">
                            {img.name}
                          </p>

                          <button
                            onClick={()=>removeImage(index)}
                            className="mt-2 w-full bg-red-100 text-red-600 py-1 rounded-lg text-sm hover:bg-red-200"
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
      {images.length>0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-white/10 py-5 flex justify-center">
          <button
            disabled={loading}
            onClick={handleConvert}
            className={`px-12 py-4 rounded-2xl text-lg font-bold shadow-xl transition-all
            ${loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 hover:scale-105"}
            `}
          >
            {loading ? "Converting..." : "Convert to PDF"}
          </button>
        </div>
      )}

      {/* LOADING OVERLAY */}
      {loading && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-8 rounded-2xl text-center shadow-2xl">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-400 border-t-transparent mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Creating your PDF...</p>
            <p className="text-sm text-gray-400 mt-1">Please wait</p>
          </div>
        </div>
      )}

    </div>
  )
}
