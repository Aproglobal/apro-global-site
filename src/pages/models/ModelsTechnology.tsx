import TechSection from "../../components/TechSection";
import TechFeatureGrid from "../../components/TechFeatureGrid";

export default function ModelsTechnology() {
  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">
        Technology
      </h1>
      <p className="text-neutral-600 dark:text-neutral-300 mb-10">
        Electronic guidance, battery systems, diagnostics, and safety controls that power APRO carts.
      </p>

      {/* 기존 컴포넌트 그대로 활용 */}
      <div className="space-y-10">
        <TechSection />
        <TechFeatureGrid />
      </div>
    </main>
  );
}
