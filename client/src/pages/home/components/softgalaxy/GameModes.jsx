import { Link } from "react-router-dom";
import { HiOutlineCpuChip } from "react-icons/hi2";
import { TbBrain } from "react-icons/tb";
import { RiRobot2Line } from "react-icons/ri";
import { MdOutlineHub } from "react-icons/md";
import { AiOutlineHistory } from "react-icons/ai";
import { RiCoinsLine } from "react-icons/ri";

const defaultModules = [
  { name: "Reserve", desc: "Lock HUB to underwrite listings", icon: RiCoinsLine, color: "rgba(122, 155, 62, 0.2)", link: "/bond" },
  { name: "List", desc: "Publish a custom model lot from Studio", icon: HiOutlineCpuChip, color: "rgba(232, 184, 74, 0.15)", link: "/studio" },
  { name: "Take", desc: "License an open model from the catalog", icon: TbBrain, color: "rgba(196, 106, 43, 0.15)", link: "/models" },
  { name: "Trade", desc: "Move licenses on the desk", icon: RiRobot2Line, color: "rgba(109, 66, 38, 0.18)", link: "/licenses" },
  { name: "Collect", desc: "Claim reserved yield", icon: MdOutlineHub, color: "rgba(122, 155, 62, 0.16)", link: "/collect" },
  { name: "Ledger", desc: "Read every protocol settlement", icon: AiOutlineHistory, color: "rgba(232, 184, 74, 0.12)", link: "/transactions" },
];

const GameModes = ({ data }) => {
  const modules = Array.isArray(data?.games) && data.games.length ? data.games : defaultModules;

  return (
    <section className="soft-section">
      <div className="container">
        <h2 className="soft-section-title">Protocol Flows</h2>
        <p className="soft-section-sub mb-4">
          Reserve, List, Take, Trade, Collect, Ledger — each writes the house ledger.
        </p>
        <div className="sg-games-grid">
          {modules.map((module) => {
            const Icon = module.icon || HiOutlineCpuChip;
            return (
              <Link key={module.name} to={module.link || "/dashboard"} className="sg-game-card">
                <div className="sg-game-icon" style={{ background: module.color }}>
                  <Icon />
                </div>
                <h3>{module.name}</h3>
                <p>{module.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GameModes;
