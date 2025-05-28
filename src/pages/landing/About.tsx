import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 px-6 py-12 flex flex-col items-center">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-700 mb-6">
          Tentang Kami
        </h1>
        <p className="text-pink-800 text-lg md:text-xl leading-relaxed mb-8">
          Kami adalah brand yang berdedikasi untuk menghadirkan produk dan layanan terbaik
          dalam bidang pembersih rumah tangga. Sejak awal berdiri, kami berkomitmen
          untuk memberikan pengalaman yang menyenangkan serta hasil yang memuaskan
          bagi setiap pelanggan.

        </p>
        <p className="text-pink-800 text-base md:text-lg leading-relaxed mb-8">
          Dengan dukungan tim profesional dan produk berkualitas tinggi,
          kami percaya bahwa setiap individu berhak merasa percaya diri setiap hari.
          Inovasi dan kepedulian terhadap kebutuhan pelanggan menjadi dasar
          dari setiap langkah kami, demi menghadirkan solusi terbaik melalui
          setiap produk dan layanan yang kami tawarkan.        
          
          </p>

        <div className="mt-10">
          <img
            src="/Logo2.png"
            alt="Tentang Kami"
            className="rounded-2xl shadow-md mx-auto w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
