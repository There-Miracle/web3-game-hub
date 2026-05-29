import "./Footer.css";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="pb-3 pb-lg-0">
      <div className="container py-5">
        <div className="row d-flex justify-content-center justify-content-lg-between align-items-center">
          <div className="col-10 col-lg-3 logoIco">
            <Link
              className="nav-prand d-flex justify-content-center align-items-center gap-2 text-decoration-none"
              to="/home"
            >
              <img src="/images/markethub.svg" alt="MarketHub icon" width="25px" />
              <span className="F1">
                <span className="lemon">MARKET</span>HUB
              </span>
            </Link>
          </div>
          <div className="col-10 col-lg-3 d-flex justify-content-center mb-2 mt-2 mb-lg-0 mt-lg-0 linklist">
            <ul className="list-unstyled m-0 d-block d-lg-flex text-center gap-lg-5">
              <li className="my-2 my-lg-0">
                <NavLink className="F5" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="my-2 my-lg-0">
                <NavLink className="F5" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li className="my-2 my-lg-0">
                <NavLink className="F5" to="/models">
                  Take
                </NavLink>
              </li>
              <li className="my-2 my-lg-0">
                <NavLink className="F5" to="/licenses">
                  Trade
                </NavLink>
              </li>
              <li className="my-2 my-lg-0">
                <NavLink className="F5" to="/collect">
                  Collect
                </NavLink>
              </li>
              <li className="my-2 my-lg-0">
                <NavLink className="F5" to="/transactions">
                  Ledger
                </NavLink>
              </li>
              <li className="my-2 my-lg-0">
                <NavLink className="F5" to="/support">
                  Support
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="d-none d-lg-block">
        <hr />
        <div className="d-flex justify-content-center copyriter py-4">
          <p className="F3">
            © 2026 AI Custom Model MarketHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
