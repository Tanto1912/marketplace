import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../services/api";

type Banner = {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
};

export default function Home() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await api.get("/api/api/banners");
        setBanners(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);

  if (banners.length === 0) {
    return <div>Loading banners...</div>;
  }

  return (
    <div className="relative w-full h-[1000px] overflow-hidden shadow-xl">
      <AnimatePresence>
        <motion.img
          key={banners[index].id}
          src={`https://api4.app.iklin.online${banners[index].imageUrl}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 bg-black/30">
        <motion.h1
          key={"title-" + banners[index].id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-white text-4xl sm:text-6xl font-bold drop-shadow-lg"
        >
          {banners[index].title}
        </motion.h1>
        <motion.p
          key={"subtitle-" + banners[index].id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white text-lg sm:text-2xl mt-4 drop-shadow-md max-w-2xl"
        >
          {banners[index].subtitle}
        </motion.p>
      </div>

      <div className="absolute inset-0 flex items-center justify-between px-6">
        <button
          onClick={prevSlide}
          className="bg-white/30 hover:bg-white/50 p-2 rounded-full"
        >
          <ChevronLeft className="text-white w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="bg-white/30 hover:bg-white/50 p-2 rounded-full"
        >
          <ChevronRight className="text-white w-6 h-6" />
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
