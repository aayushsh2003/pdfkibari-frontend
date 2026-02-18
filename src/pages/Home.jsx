import { Link } from "react-router-dom";

export default function Home() {
  const tools = [
    { name: "Merge PDF", path: "/merge", color: "from-blue-500 to-blue-700", icon: "🧩" },
    { name: "Split PDF", path: "/split", color: "from-green-500 to-green-700", icon: "✂️" },
    { name: "Compress PDF", path: "/compress", color: "from-red-500 to-red-700", icon: "📉" },
    { name: "Images to PDF", path: "/images-to-pdf", color: "from-purple-500 to-purple-700", icon: "🖼️" },
    { name: "PDF to Images", path: "/pdf-to-images", color: "from-orange-500 to-orange-700", icon: "📷" },
    { name: "Document Scanner", path: "/scanner", color: "from-teal-500 to-teal-700", icon: "📄" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center">

      {/* Header */}
      <div className="mt-16 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="text-blue-500">PDF</span> Ki Bari 🔧
        </h1>

        <p className="mt-4 text-lg text-gray-300 max-w-xl">
          Free online tools to merge, split, compress and convert your PDF files.
          Fast • Secure • No Signup Required
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 w-full max-w-5xl px-6">

        {tools.map((tool, index) => (
          <Link key={index} to={tool.path}>
            <div
              className={`bg-gradient-to-r ${tool.color} p-8 rounded-2xl shadow-xl 
              hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer`}
            >
              <div className="text-5xl mb-4">{tool.icon}</div>

              <h2 className="text-2xl font-bold">{tool.name}</h2>

              <p className="mt-2 text-white/90">
                Click to start using this tool
              </p>
            </div>
          </Link>
        ))}

      </div>

      {/* Footer */}
      <footer className="mt-20 mb-8 text-gray-400 text-sm text-center">
        © {new Date().getFullYear()} PDF Ki Bari — Made by Aayush Sharma
      </footer>

    </div>
  );
}
