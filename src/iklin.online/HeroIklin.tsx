import BgPattern from "../assets/bg-hero2.jpg";
import Hero1 from "../assets/bg-hero.jpg";
import Hero2 from "../assets/bg-hero.jpg";
import Hero3 from "../assets/bg-hero.jpg";

const Hero = () => {
  return (
    <section
      className="pt-24 pb-10 min-h-screen flex items-center px-4 sm:px-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300 relative overflow-hidden"
      style={{
        backgroundImage: `url(${BgPattern})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 z-0" />

      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-30 relative z-10 w-full">
        {/* Teks */}
        <div className="text-center md:text-left flex-1 font-sans ">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Produk Sabun Cuci Baju{" "}
            <span className="text-pink-600 dark:text-pink-400">
              Berkualitas
            </span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Bersih optimal, lembut di tangan. Temukan varian sabun cuci kami
            untuk pengalaman mencuci yang berbeda.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#"
              className="px-6 py-3 text-white bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold transition"
            >
              Beli Sekarang
            </a>
            <a
              href="#"
              className="px-6 py-3 border border-pink-600 dark:border-pink-400 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-gray-800 rounded-lg font-semibold transition"
            >
              Lihat Detail
            </a>
          </div>
        </div>

        {/* Kolase Gambar Horizontal dengan posisi bergantian */}
        <div className="flex-1 flex justify-center items-center space-x-4 max-w-md mx-auto md:mx-0">
          {/* Gambar kiri */}
          <img
            src={Hero1}
            alt="Sabun 1"
            className="rounded-xl shadow-lg w-40 h-77 object-cover translate-y-6"
          />
          {/* Gambar tengah */}
          <img
            src={Hero2}
            alt="Sabun 2"
            className="rounded-xl shadow-lg w-50 h-88 object-cover -translate-y-6"
          />
          {/* Gambar kanan */}
          <img
            src={Hero3}
            alt="Sabun 3"
            className="rounded-xl shadow-lg w-40 h-77 object-cover translate-y-6"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
