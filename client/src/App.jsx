import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useParams,
} from "react-router-dom";
import {
  Navbar,
  Footer,
  ScrollToTop,
  Presentation,
} from "./components/Components";
import {
  Home,
  Dashboard,
  NFTs,
  Rankings,
  Trading,
  Staking,
  Transactions,
  Collect,
  Support,
  SignUp,
  LogIn,
  User,
  Member,
  NFTLab,
  AICreateNFT,
  Product,
} from "./pages/Pages";
import RawData from "./data/data.json";
import { hydrateSession, loadCatalog } from "./lib/session";

function App() {
  const [data, setData] = useState(RawData);

  useEffect(() => {
    hydrateSession(setData);
    loadCatalog(setData);
  }, []);
  const HadelMemberPage = () => {
    const { userName } = useParams();
    return <Member Data={data} userName={userName} />;
  };

  const HadelProductPage = () => {
    const { productName } = useParams();
    return <Product Data={data} productName={productName} setData={setData} />;
  };

  return (
    <div className="app-container">
      <Router>
        {/* <Presentation /> */}
        <Navbar Data={data} setData={setData} />
        <ScrollToTop />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home Data={data} />} />
            <Route path="/dashboard" element={<Dashboard Data={data} setData={setData} />} />
            <Route
              path="/models"
              element={<NFTs Data={data.NFTsMarket} setData={setData} />}
            />
            <Route path="/rankings" element={<Rankings Data={data} />} />
            <Route path="/licenses" element={<Trading Data={data} setData={setData} />} />
            <Route path="/trading" element={<Navigate to="/licenses" replace />} />
            <Route path="/bond" element={<Staking Data={data} setData={setData} />} />
            <Route path="/staking" element={<Navigate to="/bond" replace />} />
            <Route path="/collect" element={<Collect Data={data} setData={setData} />} />
            <Route path="/transactions" element={<Transactions Data={data} />} />
            <Route path="/support" element={<Support />} />
            <Route
              path="/signup"
              element={
                !data.Access.haveaccess ? (
                  <SignUp setData={setData} />
                ) : (
                  <Navigate to="/account" replace />
                )
              }
            />
            <Route
              path="/login"
              element={
                !data.Access.haveaccess ? (
                  <LogIn Data={data.Access} setData={setData} />
                ) : (
                  <Navigate to="/account" replace />
                )
              }
            />
            <Route
              path="/account"
              element={
                data.Access.haveaccess ? (
                  <User Data={data} setData={setData} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="/user/:userName" element={<HadelMemberPage />} />
            <Route path="/model/:productName" element={<HadelProductPage />} />
            <Route
              path="/studio"
              element={
                data.Access.haveaccess ? (
                  <NFTLab Data={data} setData={setData} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/studio/ai"
              element={
                data.Access.haveaccess ? (
                  <AICreateNFT Data={data} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="/nftlab" element={<Navigate to="/studio" replace />} />
            <Route path="/nftlab/ai" element={<Navigate to="/studio/ai" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
