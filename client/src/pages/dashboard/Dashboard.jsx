import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Dashboard.css";
import { api, formatHub } from "../../lib/api";
import { refreshWallet } from "../../lib/session";

const FLOW_COPY = {
  reserve: "Lock HUB against a bond pool so you can list or underwrite inference.",
  list: "Publish a custom model lot from Studio and open a license listing.",
  take: "Buy an open license from the catalog at the listed HUB price.",
  trade: "Move an open license between builders on the License Desk.",
  collect: "Claim reserved yield back into your ledger balance.",
  ledger: "Every protocol action writes an immutable house ledger row.",
};

const Dashboard = ({ Data, setData }) => {
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState("");
  const [faucetNote, setFaucetNote] = useState("");

  const load = () => {
    api("/api/protocol/dashboard")
      .then((body) => {
        setPayload(body.data);
        if (body.data?.wallet && setData) {
          setData((prev) => ({ ...prev, wallet: body.data.wallet }));
        }
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    load();
  }, []);

  const claimFaucet = async () => {
    setFaucetNote("");
    try {
      await api("/api/wallet/faucet", { method: "POST", body: {} });
      await refreshWallet(setData);
      setFaucetNote("Faucet credited 5,000 HUB.");
      load();
    } catch (err) {
      setFaucetNote(err.message);
    }
  };

  const flows = payload?.flows || [
    { key: "reserve", title: "Reserve", count: 0, path: "/bond" },
    { key: "list", title: "List", count: 0, path: "/studio" },
    { key: "take", title: "Take", count: 0, path: "/models" },
    { key: "trade", title: "Trade", count: 0, path: "/licenses" },
    { key: "collect", title: "Collect", count: 0, path: "/collect" },
    { key: "ledger", title: "Ledger", count: 0, path: "/transactions" },
  ];

  const wallet = payload?.wallet || Data?.wallet;
  const signedIn = Boolean(Data?.Access?.haveaccess);

  return (
    <>
      <Helmet>
        <title>MarketHub | Dashboard</title>
        <meta name="description" content="Reserve, List, Take, Trade, Collect, and Ledger on MarketHub" />
      </Helmet>
      <section className="mh-dashboard mt-4 mb-5 pt-lg-3">
        <div className="container">
          <span className="d-block F1 textS1">
            <span className="lemon">Protocol</span> Dashboard
          </span>
          <p className="F3 textS2 mt-2">
            Live HUB ledger. Sign in as <b>maya@markethub.local</b>, <b>kai@markethub.local</b>, or <b>nova@markethub.local</b> with password <b>demo1234</b>.
          </p>
          {error ? <p className="mh-dash-error mt-3">{error}</p> : null}

          <div className="mh-dash-wallet mt-4">
            <div>
              <span>Available</span>
              <b>{formatHub(wallet?.available)}</b>
            </div>
            <div>
              <span>Reserved</span>
              <b>{formatHub(wallet?.reserved)}</b>
            </div>
            <div>
              <span>Escrow</span>
              <b>{formatHub(wallet?.escrow)}</b>
            </div>
            <div>
              <span>House volume</span>
              <b>{formatHub(payload?.summary?.volumeHub)}</b>
            </div>
          </div>

          {signedIn ? (
            <div className="mt-3 d-flex gap-2 align-items-center flex-wrap">
              <button type="button" className="btnTemp px-3 py-2" onClick={claimFaucet}>
                Claim faucet
              </button>
              {faucetNote ? <small>{faucetNote}</small> : null}
            </div>
          ) : (
            <p className="mt-3">
              <Link to="/login">Log in</Link> to reserve, list, take, and collect against your own HUB wallet.
            </p>
          )}

          <div className="mh-dash-grid mt-4">
            {flows.map((flow) => (
              <Link key={flow.key} to={flow.path} className="mh-dash-card">
                <span className="mh-dash-key">{flow.title}</span>
                <strong>{flow.count}</strong>
                <p>{FLOW_COPY[flow.key]}</p>
                <span className="mh-dash-go">Open {flow.title}</span>
              </Link>
            ))}
          </div>
          <div className="mh-dash-meta mt-4">
            <div>
              <span>Open listings</span>
              <b>{payload?.summary?.openListings ?? 0}</b>
            </div>
            <div>
              <span>Active HUB reserved</span>
              <b>{payload?.summary?.activeBondHub ?? 0}</b>
            </div>
            <div>
              <span>Settlement</span>
              <b>{payload?.chain?.settlement || "off_chain_ledger"}</b>
            </div>
          </div>

          <div className="mh-dash-activity mt-4">
            <span className="d-block F1 mb-3">Your licenses</span>
            {(payload?.licenses || []).length === 0 ? (
              <p>No licenses yet. Take a model from the catalog to receive seats and an inference quota.</p>
            ) : (
              (payload?.licenses || []).map((license) => (
                <div key={license.id} className="mh-dash-activity-row">
                  <strong>{license.modelType}</strong>
                  <span>
                    {license.title} · {license.remainingInferences} inferences left · {license.seats} seats · {license.daysLeft}d
                  </span>
                  <button
                    type="button"
                    className="btnTemp px-3 py-1"
                    disabled={license.status !== "active"}
                    onClick={async () => {
                      try {
                        await api(`/api/protocol/licenses/${license.id}/use`, {
                          method: "POST",
                          body: { units: 25 },
                        });
                        await refreshWallet(setData);
                        load();
                      } catch (err) {
                        setError(err.message);
                      }
                    }}
                  >
                    Run 25 units
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mh-dash-activity mt-4">
            <span className="d-block F1 mb-3">House activity</span>
            {(payload?.activity || []).length === 0 ? (
              <p>No ledger rows yet.</p>
            ) : (
              (payload?.activity || []).map((row) => (
                <div key={row.id} className="mh-dash-activity-row">
                  <strong>{row.flow || row.kind}</strong>
                  <span>{row.note}</span>
                  <small>{formatHub(row.amountHub)}</small>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
