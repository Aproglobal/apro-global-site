import { ABOUT_PARAS, MISSION } from "../../content/company";
import { SeoHead } from "../../utils/SeoHead";

export default function CompanyAbout() {
  return (
    <main className="container-xl section-pad">
      <SeoHead title="About — APRO" description={MISSION} />
      <h1 className="text-3xl font-extrabold">About</h1>
      <p className="mt-3 text-gray-700 dark:text-gray-300">{MISSION}</p>
      <div className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
        {ABOUT_PARAS.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </main>
  );
}
