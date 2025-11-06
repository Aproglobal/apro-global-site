import { SeoHead } from "../../utils/SeoHead";

export default function Contact() {
  return (
    <main className="container-xl section-pad">
      <SeoHead title="Contact — APRO" description="Talk to Sales for pricing & lead time." />
      <h1 className="text-2xl font-extrabold">Contact</h1>
      <p className="mt-2 text-gray-700 dark:text-gray-300">
        For pricing and lead time, please submit the form with your site location and quantity.
      </p>
      <a
        className="btn btn-primary mt-6"
        href="https://forms.gle/9z6Z-example"
        target="_blank"
        rel="noreferrer"
      >
        Talk to Sales
      </a>
      <div className="mt-4 text-sm text-gray-500">
        <div>Email: <a className="underline" href="mailto:aproglobal@kukjeint.com">aproglobal@kukjeint.com</a></div>
      </div>
    </main>
  );
}
