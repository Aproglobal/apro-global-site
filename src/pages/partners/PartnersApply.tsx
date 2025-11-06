import { SeoHead } from "../../utils/SeoHead";

export default function PartnersApply() {
  return (
    <main className="container-xl section-pad">
      <SeoHead title="Partners — Apply" description="Submit your company profile to start." />
      <h1 className="text-2xl font-extrabold">Apply to Partner</h1>
      <p className="mt-2 text-gray-700 dark:text-gray-300">
        Share your company profile and region. We’ll get back quickly.
      </p>
      <a
        className="btn btn-primary mt-6"
        href="https://forms.gle/your-partner-form"
        target="_blank"
        rel="noreferrer"
      >
        Open Google Form
      </a>
    </main>
  );
}
