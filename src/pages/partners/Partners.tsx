import { SeoHead } from "../../utils/SeoHead";
import { SectionTitle } from "../../components/Section";
import { Link } from "react-router-dom";

export default function Partners() {
  return (
    <main className="container-xl section-pad">
      <SeoHead title="Partners — APRO" description="Local delivery, training, and after-sales together." />
      <SectionTitle title="Partners" desc="Join our network to deliver and support APRO carts." />
      <p className="text-gray-700 dark:text-gray-300">
        We collaborate with regional distributors and service providers across APAC.
      </p>
      <div className="mt-6">
        <Link to="/partners/apply" className="btn btn-primary">Apply to Partner</Link>
      </div>
    </main>
  );
}
