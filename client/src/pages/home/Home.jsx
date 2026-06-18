import { Helmet } from "react-helmet-async";
import "./Home.css";
import SoftHero from "./components/softgalaxy/SoftHero";
import PlatformStats from "./components/softgalaxy/PlatformStats";
import GameModes from "./components/softgalaxy/GameModes";
import EarningsOverview from "./components/softgalaxy/EarningsOverview";
import VolumeSection from "./components/softgalaxy/VolumeSection";
import PlatformFeatures, { HomeCTA } from "./components/softgalaxy/PlatformFeatures";

const Home = ({ Data }) => {
  const homeData = Data?.Home || {};

  return (
    <div className="soft-home">
      <Helmet>
        <title>AI Custom Model MarketHub</title>
        <meta
          name="description"
          content="MarketHub — license custom AI models. Crypto checkout is a further feature."
        />
      </Helmet>
      <SoftHero data={homeData} />
      <PlatformStats data={homeData} />
      <GameModes data={homeData} />
      <EarningsOverview data={homeData} />
      <VolumeSection data={homeData} />
      <PlatformFeatures data={homeData} />
      <HomeCTA />
    </div>
  );
};

export default Home;
