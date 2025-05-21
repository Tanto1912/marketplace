import { useEffect, useState } from "react";

const About = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200); // delay animasi
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div
        className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 transition-opacity duration-700 ease-out ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Gambar */}
        <div className="flex-shrink-0 w-full md:w-1/3 mx-auto">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
            alt="About us"
            className="rounded-xl shadow-lg w-full max-w-xs md:max-w-full object-cover"
          />
        </div>

        {/* Konten teks */}
        <div className="flex-1 text-center md:text-left space-y-6 max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold">Tentang Kami</h2>
          <p className="text-base sm:text-lg leading-relaxed">
            Kami adalah produsen sabun cuci baju berkualitas tinggi yang
            berkomitmen menghadirkan produk yang ramah lingkungan dan aman untuk
            kulit. Dengan berbagai varian sabun yang telah terbukti efektif
            membersihkan dan menjaga kelembutan pakaian Anda.
          </p>
          <p className="text-base sm:text-lg leading-relaxed">
            Bergabunglah bersama ribuan pelanggan yang sudah merasakan manfaat
            sabun kami untuk mencuci pakaian sehari-hari dengan hasil terbaik.
          </p>
          <a
            href="#"
            className="inline-block px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition"
          >
            Pelajari Lebih Lanjut
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
