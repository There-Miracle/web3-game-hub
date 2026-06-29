import { Link } from "react-router-dom";

const DEFAULT_FEATURES = [
  {
    step: "01",
    title: "Join the Hub",
    desc: "Open a builder account to reach Bond, Model Studio, and the License Desk.",
    actionLabel: "Join Now",
    actionLink: "/signup",
  },
  {
    step: "02",
    title: "Bond HUB",
    desc: "Lock HUB to list or underwrite inference. Your reserve funds listings and inference runs.",
    actionLabel: "Open Bond",
    actionLink: "/bond",
  },
  {
    step: "03",
    title: "List a Model",
    desc: "Publish a custom model, set a license price, and earn when buyers take it.",
    actionLabel: "Open Model Studio",
    actionLink: "/studio",
  },
];

const FALLBACK_ACTIONS = [
  { actionLabel: "Join Now", actionLink: "/signup" },
  { actionLabel: "Bond HUB", actionLink: "/bond" },
  { actionLabel: "List a Model", actionLink: "/studio" },
];

const PlatformFeatures = ({ data }) => {
  const features = Array.isArray(data?.features) && data.features.length
    ? data.features.map((feature, index) => ({
      ...feature,
      actionLabel: feature.actionLabel || FALLBACK_ACTIONS[index]?.actionLabel || "Explore",
      actionLink: feature.actionLink || FALLBACK_ACTIONS[index]?.actionLink || "/home",
    }))
    : DEFAULT_FEATURES;

  return (
    <section className="soft-section">
      <div className="container">
        <h2 className="soft-section-title">How MarketHub Works</h2>
        <p className="soft-section-sub mb-4">
          Three steps from studio to license.
        </p>
        <div className="sg-features-grid">
          {features.map((f) => (
            <div key={f.step} className="sg-feature-card">
              <div className="sg-feature-num">{f.step}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <div className="sg-feature-actions">
                <Link to={f.actionLink} className="sg-feature-action-btn">
                  {f.actionLabel}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomeCTA = () => (
  <section className="soft-section">
    <div className="container">
      <div className="sg-cta">
        <h2>Ready to list a custom model?</h2>
        <p>Join builders and buyers licensing language, vision, audio, and multimodal models on MarketHub.</p>
        <Link to="/signup" className="btnTemp px-5 py-3">Create Builder Account</Link>
      </div>
    </div>
  </section>
);

export { HomeCTA };
export default PlatformFeatures;
