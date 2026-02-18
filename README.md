# 📄 PDF Ki Bari — Online PDF Toolkit

![Preview](https://pdfkibari.vercel.app/preview.png)

**PDF Ki Bari** is a full-stack web application that provides all essential PDF utilities in one place.
It allows users to merge, split, compress, scan, and convert PDFs directly in the browser — no software installation required.

🌐 **Live Website:** https://pdfkibari.vercel.app

---

## ✨ Features

### 📑 PDF Tools

* Merge multiple PDFs into one file
* Split PDF into individual pages (ZIP download)
* Compress PDF with selectable compression level
* Convert PDF → Images (JPG pages)
* Convert Images → PDF

### 📷 Smart Scanner (Like Office Lens)

* Open mobile camera in browser
* Capture documents
* Auto clean background
* Black & white document enhancement
* Direct PDF generation

### 👁 Preview System

* First-page thumbnail preview before operations
* Drag & drop reorder before merging
* Mobile responsive UI

---

## 🧰 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Router
* Axios
* PDF.js (Preview rendering)
* OpenCV.js (Document cleaning)
* Drag & Drop (@hello-pangea/dnd)

### Backend

* Node.js
* Express.js
* Multer (file upload)
* pdf-lib
* Archiver (ZIP generation)
* Ghostscript (compression & image extraction)

### Deployment

* Frontend: Vercel
* Backend: Render

---

## 📁 Project Structure

```
pdfkibari-frontend
│
├── src
│   ├── components
│   │   ├── FileUploader.jsx
│   │   └── PDFPreview.jsx
│   │
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── Merge.jsx
│   │   ├── Split.jsx
│   │   ├── Compress.jsx
│   │   ├── ImagesToPDF.jsx
│   │   ├── PdfToImages.jsx
│   │   └── Scanner.jsx
│   │
│   └── App.jsx
│
└── public
    └── pdf.worker.min.js
```

---

## ⚙️ Installation (Local Setup)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/<your-username>/pdfkibari-frontend.git
cd pdfkibari-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 🔌 Backend API

The frontend communicates with the deployed backend API:

```
https://pdfkibari-api.onrender.com
```

---

## 📱 Mobile Usage (Scanner)

To use the document scanner:

1. Connect phone and laptop to the same WiFi
2. Run frontend locally
3. Open in phone browser:

```
http://YOUR-PC-IP:5173
```

Camera permission will be requested automatically.

---

## 🚀 Future Improvements

* Page selection before merging
* Rotate pages
* Add watermark
* PDF password protection
* OCR text extraction

---

## 👨‍💻 Author

**Aayush Sharma**
Computer Science Student & Full-Stack Developer

* Portfolio: https://pdfkibari.vercel.app
* GitHub: https://github.com/aayushsh2003

---

## 📜 License

This project is open source and available under the MIT License.
