import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Merge from "./pages/Merge";
import Split from "./pages/Split";
import Compress from "./pages/Compress";
import ImagesToPDF from "./pages/ImagesToPDF";
import PdfToImages from "./pages/PdfToImages";
import Scanner from "./pages/Scanner";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/merge" element={<Merge />} />
      <Route path="/split" element={<Split />} />
      <Route path="/compress" element={<Compress />} />
      <Route path="/images-to-pdf" element={<ImagesToPDF />} />
      <Route path="/pdf-to-images" element={<PdfToImages />} />
      <Route path="/scanner" element={<Scanner />} />

      
    </Routes>
  );
}

export default App;
