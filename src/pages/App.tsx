import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import CompareTable from "../components/CompareTable";
import ModelSection from "../components/ModelSection";
import ModelDetail from "../components/ModelDetail";
import ContactSection from "../components/ContactSection";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main>
        <HeroSection />

        {/* Compare Table */}
        <section id="compare" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose <span className="text-pink-500">APRO</span>?
            </h2>
            <CompareTable />
          </div>
        </section>

        {/* Models Section */}
        <section id="models" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Our Models</h2>
            <ModelSection />
          </div>
        </section>

        {/* Model Details */}
        <section id="details" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              APRO in Detail
            </h2>
            <ModelDetail />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <ContactSection />
          </div>
        </section>

        {/* ===== Company information ===== */}
        <footer className="mt-20 border-t border-gray-200">
          <div className="mx-auto w-full max-w-6xl px-6 py-10">
            <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">
              Company information
            </h3>
            <div className="mt-3 text-sm leading-6 text-gray-700">
              <p className="font-medium">KUKJE INTERTRADE Co., Ltd.</p>
              <p className="mt-1">
                Address: Floor 12, 124, Sagimakgol-ro, Jungwon-gu, Seongnam-si,
                Gyeonggi-do, Republic of Korea
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
