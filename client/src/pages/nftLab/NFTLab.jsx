import "./NFTLab.css";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { FcOpenedFolder } from "react-icons/fc";
import { MdAdd } from "react-icons/md";
import { IoChevronDown } from "react-icons/io5";
import { AiOutlineRobot } from "react-icons/ai";
import { api } from "../../lib/api";
import { loadCatalog, refreshWallet } from "../../lib/session";

const NFTLab = ({ Data, setData }) => {
  const [nftInfo, setNftInfo] = useState({
    itemName: "",
    itemPrice: "",
    itemCollection: "",
    itemExternamLink: "",
    itemDescription: "",
    seats: "5",
    monthlyInferences: "25000",
    royaltyBps: "500",
    licenseMode: "open",
    version: "1.0.0",
  });

  const HandeVisualMenu = () => {
    $(".itemsMenu").toggleClass("show");
  };
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const HandelCollactionButtonValue = (itemvalue) => {
    setNftInfo((prvData) => ({
      ...prvData,
      itemCollection: itemvalue.target.textContent,
    }));
    HandeVisualMenu();
  };

  const publishLot = async () => {
    setStatus("");
    try {
      await api("/api/protocol/lots", {
        method: "POST",
        body: {
          title: nftInfo.itemName,
          description: nftInfo.itemDescription,
          modelType: nftInfo.itemCollection || "Language",
          priceHub: Number(nftInfo.itemPrice) || 0,
          seats: Number(nftInfo.seats) || 5,
          monthlyInferences: Number(nftInfo.monthlyInferences) || 25000,
          royaltyBps: Number(nftInfo.royaltyBps) || 500,
          licenseMode: nftInfo.licenseMode,
          version: nftInfo.version,
        },
      });
      setStatus("Lot listed on the protocol ledger.");
      await loadCatalog(setData);
      await refreshWallet(setData);
      navigate("/dashboard");
    } catch (err) {
      setStatus(err.message || "List failed");
    }
  };

  return (
    <>
      <Helmet>
        <title>MarketHub | Model Studio</title>
        <meta name="description" content="Publish a custom model on MarketHub" />
      </Helmet>
      <section id="AddNFT">
        <div className="container mt-4 mb-5 mt-md-5 pt-lg-3">
          <div className="row mx-2 pageTitle mb-5">
            <div className="col-12">
              <span className="d-block F1 textS1">
                <span className="lemon">Model</span> Studio
              </span>
              <span className="d-block F3 textS2">
                Publish a custom model and list it in the MarketHub catalog.
              </span>
              <div className="mt-3">
                <button
                  type="button"
                  className="aiCreateBtn py-2 px-3 d-inline-flex align-items-center"
                  onClick={() => navigate("/studio/ai")}
                >
                  <AiOutlineRobot className="aiIcon me-2" />
                  <span>Generate Model Card</span>
                </button>
              </div>
            </div>
          </div>
          <div className="row uploadComponant p-3 mx-2">
            <div className="col-12 d-flex justify-content-center align-align-items-center py-5">
              <div className="addLyer">
                <MdAdd />
              </div>
              <div className="text-center">
                <FcOpenedFolder className="foldeIcon" />
                <span className="d-block F4 mt-3">
                  Drop a model card image here. PNG, GIF, WEBP. Max 100mb.
                </span>
              </div>
            </div>
          </div>
          <div className="row mx-2 itemInforamation mt-3">
            <div className="col-12 col-md-6">
              <div className="mt-3">
                <span className="d-flex mb-2">Item Name</span>
                <input
                  type="text"
                  className="d-block w-100 py-2 ps-2"
                  value={nftInfo.itemName}
                  onChange={(inbutValue) =>
                    setNftInfo((prvDate) => ({
                      ...prvDate,
                      itemName: inbutValue.target.value,
                    }))
                  }
                />
              </div>
              <div className="mt-3">
                <span className="d-flex mb-2">Price</span>
                <input
                  type="text"
                  className="d-block w-100 py-2 ps-2"
                  value={nftInfo.itemPrice}
                  onChange={(inbutValue) =>
                    setNftInfo((prvDate) => ({
                      ...prvDate,
                      itemPrice: inbutValue.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="mt-3 collectionCustomComponant">
                <span className="d-flex mb-2">collection</span>
                <div onClick={HandeVisualMenu}>
                  <div
                    type="text"
                    className="w-100 ps-2 collectionCustomComponantinput d-flex align-items-center"
                  >
                    {nftInfo.itemCollection}
                  </div>
                  <IoChevronDown className="IoChevronDown" />
                </div>
                <div className="w-100 itemsMenu py-2 px-2">
                  <ul className="p-0 m-0">
                    {Data.NFTsMarket.Collections.map(
                      (collectionItem, index) => (
                        <li
                          key={index}
                          className="py-3 px-3 mb-2"
                          onClick={(itemvalue) =>
                            HandelCollactionButtonValue(itemvalue)
                          }
                        >
                          {collectionItem.collectionName}
                        </li>
                      )
                    )}
                  </ul>
                  <div className="triangle-up" />
                </div>
              </div>
              <div className="mt-3">
                <span className="d-flex mb-2">Artifact / docs link</span>
                <input
                  type="text"
                  className="d-block w-100 py-2 ps-2"
                  value={nftInfo.itemExternamLink}
                  onChange={(inbutValue) =>
                    setNftInfo((prvDate) => ({
                      ...prvDate,
                      itemExternamLink: inbutValue.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="mt-3">
              <span className="d-flex mb-2">description</span>
              <textarea
                name="description"
                id="description"
                className="w-100 px-2 py-2"
                value={nftInfo.itemDescription}
                onChange={(inbutValue) =>
                  setNftInfo((prvDate) => ({
                    ...prvDate,
                    itemDescription: inbutValue.target.value,
                  }))
                }
              ></textarea>
              <div className="mt-3">
                <span className="d-flex mb-2">License terms</span>
                <div className="d-flex flex-wrap gap-2">
                  <input
                    type="number"
                    className="py-2 ps-2"
                    placeholder="Seats"
                    value={nftInfo.seats}
                    onChange={(event) => setNftInfo((prev) => ({ ...prev, seats: event.target.value }))}
                  />
                  <input
                    type="number"
                    className="py-2 ps-2"
                    placeholder="Monthly inferences"
                    value={nftInfo.monthlyInferences}
                    onChange={(event) => setNftInfo((prev) => ({ ...prev, monthlyInferences: event.target.value }))}
                  />
                  <input
                    type="number"
                    className="py-2 ps-2"
                    placeholder="Royalty bps"
                    value={nftInfo.royaltyBps}
                    onChange={(event) => setNftInfo((prev) => ({ ...prev, royaltyBps: event.target.value }))}
                  />
                  <select
                    className="py-2 ps-2"
                    value={nftInfo.licenseMode}
                    onChange={(event) => setNftInfo((prev) => ({ ...prev, licenseMode: event.target.value }))}
                  >
                    <option value="open">Open license</option>
                    <option value="exclusive">Exclusive license</option>
                  </select>
                </div>
                <small className="d-block mt-2">
                  Listing a priced lot requires an active Reserve in the matching bond pool (25 HUB minimum). Secondary trades pay the listed royalty to the original builder.
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center justify-content-md-end mt-4">
              {status ? <p className="mt-3 me-3">{status}</p> : null}
              {nftInfo.itemName && nftInfo.itemPrice && nftInfo.itemCollection && nftInfo.itemDescription ? (
                <button type="button" className="doneButton py-3 px-4 active" onClick={publishLot}>
                  List Lot
                </button>
              ) : (
                <div className="doneButton py-3 px-4" disabled>
                  List Lot
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NFTLab;
