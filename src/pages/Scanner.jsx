import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Scanner(){

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [captured,setCaptured] = useState(null);
  const [loading,setLoading] = useState(false);

  // open camera
  useEffect(()=>{
    const startCamera = async()=>{
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" } // back camera
      });
      videoRef.current.srcObject = stream;
    };

    startCamera();
  },[]);

  // capture photo
  const capture = ()=>{
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video,0,0);

    const imageData = canvas.toDataURL("image/jpeg",1.0);
    setCaptured(imageData);
  };

  // enhance (office lens effect)
  const enhance = ()=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let img = new Image();
    img.src = captured;

    img.onload = ()=>{
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img,0,0);

      let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
      let data = imageData.data;

      // grayscale + threshold
      for(let i=0;i<data.length;i+=4){
        let gray = 0.3*data[i] + 0.59*data[i+1] + 0.11*data[i+2];

        // threshold (clean white paper)
        let value = gray>140 ? 255 : 0;

        data[i]=value;
        data[i+1]=value;
        data[i+2]=value;
      }

      ctx.putImageData(imageData,0,0);
      setCaptured(canvas.toDataURL("image/jpeg",1.0));
    };
  };

  // convert to PDF
  const makePDF = async()=>{
    setLoading(true);

    const blob = await (await fetch(captured)).blob();

    const formData = new FormData();
    formData.append("images", blob, "scan.jpg");

    const res = await axios.post(
      "http://localhost:5000/api/pdf/images-to-pdf",
      formData,
      { responseType:"blob" }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement("a");
    a.href=url;
    a.download="scanned.pdf";
    a.click();

    setLoading(false);
  };

  return(
    <div className="min-h-screen bg-gray-900 text-white p-4">

      <Link to="/" className="text-blue-400">← Back</Link>

      <h1 className="text-3xl text-center font-bold mt-2">
        Document Scanner
      </h1>

      {!captured && (
        <div className="flex flex-col items-center mt-6">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="rounded-xl max-w-md w-full"
          />

          <button
            onClick={capture}
            className="bg-green-600 px-8 py-3 rounded-full mt-6 text-xl"
          >
            Capture
          </button>
        </div>
      )}

      {captured && (
        <div className="flex flex-col items-center mt-6">
          <canvas ref={canvasRef} className="max-w-md w-full rounded-xl"/>

          <div className="flex gap-4 mt-6">
            <button
              onClick={enhance}
              className="bg-yellow-500 px-6 py-3 rounded-xl"
            >
              Enhance
            </button>

            <button
              onClick={makePDF}
              className="bg-blue-600 px-6 py-3 rounded-xl"
            >
              {loading ? "Creating..." : "Create PDF"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
