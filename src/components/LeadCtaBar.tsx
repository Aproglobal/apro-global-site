export function LeadCtaBar() {
  return (
    <div className="mt-12 rounded-2xl p-6 card flex items-center justify-between gap-4">
      <div>
        <div className="text-base font-semibold">Get pricing & lead time</div>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Share your model interest and site location. We’ll reply quickly.
        </div>
      </div>
      <a
        href="https://forms.gle/9z6Z-example"
        target="_blank"
        rel="noreferrer"
        className="btn btn-primary"
        onClick={() => {
          // @ts-ignore
          if (typeof window.gtag === "function")
            window.gtag("event", "lead_click", { location: "cta_bar" });
        }}
      >
        Talk to Sales
      </a>
    </div>
  );
}
