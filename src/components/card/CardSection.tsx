import { ShieldCheck, Sparkles, Recycle } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-pink-600" />,
    title: "Aman & Terpercaya",
    description:
      "Produk kami diformulasikan dengan bahan berkualitas tinggi dan aman digunakan.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-pink-600" />,
    title: "Efektif Membersihkan",
    description: "Mampu mengangkat noda membandel dengan mudah dan cepat.",
  },
  {
    icon: <Recycle className="w-8 h-8 text-pink-600" />,
    title: "Ramah Lingkungan",
    description:
      "Dikemas dan diformulasikan dengan memperhatikan kelestarian alam.",
  },
];

export default function CardSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Kenapa Memilih I-KLIN?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 text-center transition-transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
