import { FaUsers, FaChartLine, FaCoins, FaNetworkWired } from "react-icons/fa6";

const iconMap = {
  users: FaUsers,
  chart: FaChartLine,
  coins: FaCoins,
  network: FaNetworkWired,
};

const colorMap = ["gold", "purple", "green", "pink"];

const PlatformStats = ({ data }) => {
  const stats = data?.stats || [
    { icon: "users", value: "12.4k", label: "Open Models" },
    { icon: "chart", value: "48M HUB", label: "License Volume" },
    { icon: "coins", value: "8.2M HUB", label: "Stake Reserved" },
    { icon: "network", value: "214 / 96", label: "Active / Resting Nodes" },
  ];

  return (
    <section className="soft-section">
      <div className="container">
        <h2 className="soft-section-title">Marketplace Overview</h2>
        <p className="soft-section-sub mb-4">
          Live figures across stake, licenses, and inference settlement.
        </p>
        <div className="sg-stats-grid">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || FaChartLine;
            return (
              <div key={stat.label} className="sg-stat-card">
                <div className={`sg-stat-icon ${colorMap[i % colorMap.length]}`}>
                  <Icon />
                </div>
                <div className="sg-stat-value">{stat.value}</div>
                <div className="sg-stat-label">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;
