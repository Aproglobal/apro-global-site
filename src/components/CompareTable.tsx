export default function CompareTable() {
  useEffect(() => {
    trackEvent('compare_view');
  }, []);

  return (
    <section id="compare" className="py-16 bg-zinc-100 border-t text-black">
      <div className="max-w-6xl mx-auto px-5">
        <h3 className="text-2xl font-bold">Compare Models</h3>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-[720px] w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-600">
                <th className="py-3 pr-4">Model</th>
                <th className="py-3 pr-4">Guidance</th>
                <th className="py-3 pr-4">Seats</th>
                <th className="py-3 pr-4">Variant</th>
                <th className="py-3 pr-4">Deck</th>
                <th className="py-3 pr-4">Reverse</th>
              </tr>
            </thead>
            <tbody>
              {MODELS.map(m => (
                <tr key={m.code} className="border-t">
                  <td className="py-3 pr-4 font-medium">{m.name}</td>
                  <td className="py-3 pr-4">{m.guidance}</td>
                  <td className="py-3 pr-4">{m.seats}</td>
                  <td className="py-3 pr-4">{m.variant ?? '-'}</td>
                  <td className="py-3 pr-4">{m.deck ?? '-'}</td>
                  <td className="py-3 pr-4">{m.reverse ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <a
            href="#contact"
            className="inline-block px-5 py-3 border rounded-lg font-medium"
          >
            Download full brochure
          </a>
        </div>
      </div>
    </section>
  );
}
