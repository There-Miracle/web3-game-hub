import "./LargNavbar.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import $ from "jquery";
import { PiUser } from "react-icons/pi";
import { BiSolidCastle } from "react-icons/bi";
import { FaUserLarge } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { ImLab } from "react-icons/im";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { formatHub } from "../../../lib/api";
import { clearSession } from "../../../lib/session";

const Data = {
  navIcon: "/images/markethub.svg",
  navLink: [
    { name: "Home", link: "/home" },
    { name: "Dashboard", link: "/dashboard" },
    { name: "Reserve", link: "/bond" },
    { name: "List", link: "/studio" },
    { name: "Take", link: "/models" },
    { name: "Trade", link: "/licenses" },
    { name: "Collect", link: "/collect" },
    { name: "Ledger", link: "/transactions" },
    { name: "Support", link: "/support" },
  ],
};

const LargNavbar = ({ rowData, setData }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const searchTargets = useMemo(
    () => [
      ...Data.navLink,
      { name: "Model Studio", link: "/studio" },
      { name: "Account", link: "/account" },
      { name: "Sign Up", link: "/signup" },
      { name: "Login", link: "/login" },
    ],
    []
  );

  const searchResults = useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) return [];
    return searchTargets
      .filter((item) => item.name.toLowerCase().includes(q))
      .slice(0, 6);
  }, [searchTargets, searchValue]);

  const HandelNaveMenu = () => {
    $(".userMenu").toggleClass("show");
  };

  useEffect(() => {
    const onPointerDown = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const q = searchValue.trim().toLowerCase();
    if (!q) return;

    const exact = searchTargets.find((item) => item.name.toLowerCase() === q);
    const startsWith = searchTargets.find((item) => item.name.toLowerCase().startsWith(q));
    const includes = searchTargets.find((item) => item.name.toLowerCase().includes(q));
    const target = exact || startsWith || includes;

    if (target) {
      navigate(target.link);
      setIsSearchOpen(false);
    }
  };

  const selectSearchTarget = (link) => {
    navigate(link);
    setIsSearchOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg mx-3 mt-3 mb-2" id="Lnav">
      <div className="container-fluid">
        <Link
          className="nav-prand d-flex justify-content-center align-items-center gap-2 text-decoration-none"
          to="/home"
        >
          <img src={Data.navIcon} alt="MarketHub icon" width="25px" />
          <span className="F1">
            <span className="lemon">MARKET</span>HUB
          </span>
        </Link>

        <div className="sg-nav-search d-none d-xl-flex" ref={searchRef}>
          <form onSubmit={handleSearchSubmit}>
            <span className="sg-nav-search-icon" aria-hidden="true">
              <FiSearch />
            </span>
            <input
              type="search"
              placeholder="Search pages..."
              aria-label="Search pages"
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
            />
          </form>
          {isSearchOpen && searchResults.length > 0 && (
            <div className="sg-nav-search-results">
              {searchResults.map((item) => (
                <button
                  type="button"
                  key={`${item.link}-${item.name}`}
                  onClick={() => selectSearchTarget(item.link)}
                >
                  <span>{item.name}</span>
                  <small>{item.link}</small>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="navbar-collapse justify-content-end gap-3">
          <ul className="list-unstyled d-flex gap-4 m-0">
            {Data.navLink.map((item, index) => (
              <li key={index}>
                <NavLink className="F3" to={item.link}>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="sg-nav-wallet d-none d-lg-flex">
            <span className="sg-nav-universe">HUB</span>
            <span className="sg-nav-balance">
              {formatHub(rowData.wallet?.available ?? rowData.wallet?.total ?? 0)}
            </span>
          </div>

          {rowData.Access.haveaccess ? (
            <div className="userToolsComponant">
              <div
                to="/account"
                className="btnTempUser d-flex justify-content-center align-items-center"
                type="submit"
                onClick={HandelNaveMenu}
              >
                {rowData.Access.accountInfo.userAvatar ? (
                  <img
                    src={rowData.Access.accountInfo.userAvatar}
                    alt="user img"
                  />
                ) : (
                  <div className="parIcon d-flex justify-content-center align-items-center">
                    <FaRegCircleUser className="Icon" />
                  </div>
                )}
              </div>
              <div className="userMenu">
                <div className="triangle-up" />
                <NavLink
                  to="/home"
                  className="ps-2 d-flex align-items-center gap-2 my-2 menuButton"
                  onClick={HandelNaveMenu}
                >
                  <BiSolidCastle />
                  <span>Home</span>
                </NavLink>
                <NavLink
                  to="/studio"
                  className="ps-2 d-flex align-items-center gap-2 my-2 menuButton"
                  onClick={HandelNaveMenu}
                >
                  <ImLab />
                  <span>Model Studio</span>
                </NavLink>
                <NavLink
                  to="/account"
                  className="ps-2 d-flex align-items-center gap-2 my-2 menuButton"
                  onClick={HandelNaveMenu}
                >
                  <FaUserLarge />
                  <span>Account</span>
                </NavLink>
                <div
                  className="ps-2 d-flex align-items-center gap-2 my-2 menuButton"
                  onClick={() => clearSession(setData)}
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </div>
              </div>
            </div>
          ) : (
            <NavLink
              to="/signup"
              className="btnTemp d-flex justify-content-center align-items-center px-3 py-2"
              type="submit"
            >
              <PiUser className="PiUser me-2 my-1" />
              sign up
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LargNavbar;
