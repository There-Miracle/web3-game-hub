import { Link } from "react-router-dom";
import { HiSparkles } from "react-icons/hi2";
import { IoLeafOutline } from "react-icons/io5";
import { HiOutlineCpuChip } from "react-icons/hi2";
import { TbBrain } from "react-icons/tb";
import { RiRobot2Line } from "react-icons/ri";

const innerOrbitLinks = [
  { title: "Reserve", icon: HiOutlineCpuChip, to: "/bond", className: "sg-hero-node--top" },
  { title: "Take", icon: TbBrain, to: "/models", className: "sg-hero-node--left" },
  { title: "Trade", icon: RiRobot2Line, to: "/licenses", className: "sg-hero-node--right" },
];

const SoftHero = ({ data }) => {
  const hero = data?.Hero || {};

  return (
    <section className="sg-hero">
      <div className="container">
        <div className="sg-hero-grid">
          <div>
            <div className="sg-hero-badge">
              <HiSparkles />
              {hero.badge || "Custom AI model marketplace"}
            </div>
            <h1 className="sg-hero-title">
              Welcome to <span>MarketHub</span>
            </h1>
            <p className="sg-hero-desc">
              {hero.description ||
                "List custom models, license them with HUB, and settle every order on one ledger. Crypto checkout is a further feature."}
            </p>
            <div className="sg-hero-actions">
              <Link to="/signup" className="btnTemp px-4 py-3">
                <IoLeafOutline className="me-2" />
                Join MarketHub
              </Link>
              <Link to="/dashboard" className="btnTemp-outLine px-4 py-3">
                Open Dashboard
              </Link>
            </div>
            <div className="sg-stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {(hero.quickStats || [
                { value: "12.4k", label: "Open Models" },
                { value: "48M", label: "Licenses Moved" },
                { value: "8.2M", label: "HUB Reserved" },
              ]).map((stat) => (
                <div key={stat.label} className="sg-stat-card" style={{ padding: "1rem" }}>
                  <div className="sg-stat-value" style={{ fontSize: "1.2rem" }}>{stat.value}</div>
                  <div className="sg-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="sg-hero-visual">
            <div className="sg-hero-orbit">
              <div className="sg-hero-ring" />
              <div className="sg-hero-ring sg-hero-ring-2" />
              <Link to="/home" className="sg-hero-core" aria-label="Home">
                <img src="/images/markethub.svg" alt="MarketHub" />
              </Link>
              {innerOrbitLinks.map(({ title, icon: Icon, to, className }) => (
                <Link key={title} to={to} className={`sg-hero-node ${className}`} title={title} aria-label={title}>
                  <Icon color="#e8b84a" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoftHero;
