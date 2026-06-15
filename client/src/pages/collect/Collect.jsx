import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api, formatHub } from "../../lib/api";
import { refreshWallet } from "../../lib/session";

const Collect = ({ Data, setData }) => {
  const [stakes, setStakes] = useState([]);
  const [message, setMessage] = useState("");

  const load = () => {
    api("/api/protocol/stakes")
      .then((body) => setStakes(body.data || []))
      .catch(() => setMessage("Sign in to load your reserve positions."));
  };

  useEffect(() => {
    load();
  }, []);

  const collect = async (id) => {
    setMessage("");
    try {
      const body = await api(`/api/protocol/stakes/${id}/collect`, { method: "POST", body: {} });
      setMessage(`Collected ${formatHub(body.data.amountHub)} principal + ${formatHub(body.data.yieldHub)} yield.`);
      await refreshWallet(setData);
      load();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>MarketHub | Collect</title>
      </Helmet>
      <section className="mt-4 mb-5 pt-lg-3">
        <div className="container">
          <span className="d-block F1 textS1">
            <span className="lemon">Collect</span> Yield
          </span>
          <p className="F3 textS2 mt-2">Claim HUB from your active reserve positions back into available balance.</p>
          {!Data?.Access?.haveaccess ? (
            <p className="mt-3">
              <Link to="/login">Log in</Link> to collect yield from your own bonds.
            </p>
          ) : null}
          {message ? <p className="mt-3">{message}</p> : null}
          <div className="mt-4">
            {stakes.length === 0 ? (
              <p>No reserve positions yet. Open Reserve to lock HUB.</p>
            ) : (
              stakes.map((stake) => (
                <div key={stake.id} className="d-flex justify-content-between align-items-center py-3 border-bottom">
                  <div>
                    <strong>{stake.pool}</strong>
                    <div>
                      {formatHub(stake.amountHub)} reserved · {formatHub(stake.accruedHub || stake.yieldHub)} accrued · {(stake.aprBps / 100).toFixed(2)}% APR
                    </div>
                    <small>{stake.status}</small>
                  </div>
                  <button
                    type="button"
                    className="btnTemp px-3 py-2"
                    disabled={stake.status !== "active"}
                    onClick={() => collect(stake.id)}
                  >
                    Collect
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Collect;
