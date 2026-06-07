import "./LogIn.css";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { api } from "../../../lib/api";
import { saveSession } from "../../../lib/session";

const LogIn = ({ Data, setData }) => {
  const [userInput, setUserInput] = useState({
    userName: "",
    passWord: "",
  });
  const [messageInbutHandler, setMessageInbutHandler] = useState({
    InbutNotFound: "",
  });

  const [busy, setBusy] = useState(false);

  const HandelInput = async (event) => {
    event.preventDefault();
    setBusy(true);
    setMessageInbutHandler({ InbutNotFound: "" });
    try {
      const body = await api("/api/auth", {
        method: "POST",
        auth: false,
        body: {
          email: userInput.userName,
          name: userInput.userName,
          password: userInput.passWord,
        },
      });
      saveSession(setData, body);
    } catch (err) {
      setMessageInbutHandler({ InbutNotFound: true });
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>MarketHub | Log in</title>
        <meta name="description" content="Log in to MarketHub" />
      </Helmet>
      <section id="Login" className="pt-0 pt-lg-1 pb-4">
        <div className="container">
          <div className="row my-5 mx-2">
            <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center order-1 order-lg-0 my-4">
              <div className="LoginBudy px-lg-4">
                <div className="text-center FORMhED">
                  <span className="F1 d-block">Welcome</span>
                  <span className="F4">
                    We are glad to see you back with us
                  </span>
                </div>
                <form onSubmit={HandelInput} className="mt-3">
                  {messageInbutHandler.InbutNotFound ? (
                    <div
                      style={{
                        color: "red",
                        textAlign: "center",
                        fontSize: ".8rem",
                      }}
                    >
                      <span>*username or password not match try again</span>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="d-flex justify-content-center mt-3">
                    <div className="w-100 position-relative inputComponant">
                      <input
                        className="w-100 py-2"
                        type="text"
                        required
                        minLength={6}
                        value={userInput.userName}
                        onChange={(inputValue) =>
                          setUserInput({
                            ...userInput,
                            userName: inputValue.target.value,
                          })
                        }
                      />
                      {!userInput.userName ? (
                        <div className="F4 inputContant">
                          <FiUser className="FiUser" />
                          <span>Username or Email</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-100 position-relative inputComponant">
                      <input
                        className="w-100 py-2"
                        type="password"
                        required
                        minLength={6}
                        value={userInput.passWord}
                        onChange={(inputValue) =>
                          setUserInput({
                            ...userInput,
                            passWord: inputValue.target.value,
                          })
                        }
                      />
                      {!userInput.passWord ? (
                        <div className="F4 inputContant">
                          <FiLock className="FiUser" />
                          <span>Password</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="w-100 position-relative buttonInputComponant py-2" disabled={busy}>
                      <span>{busy ? "Signing in..." : "NEXT"}</span>
                    </button>
                  </div>
                </form>
                <p className="F4 mt-3 text-center">
                  Demo: maya@markethub.local / kai@markethub.local / nova@markethub.local — password demo1234
                </p>
                <div className="hrStyle gap-1">
                  <span className="F1">Login</span>
                  <span className="F4">with Others</span>
                </div>
                <div>
                  <div className="d-flex justify-content-center mt-4">
                    <div className="w-100 sochialButtonComponant py-2 gap-2">
                      <FaGoogle className="sochialIcon my-1" />
                      <div className="sochialButtonComponantTitle gap-1">
                        <span className="F4">Login with</span>
                        <span className="F1">Google</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <div className="w-100 sochialButtonComponant py-2 gap-2">
                      <FaSquareFacebook className="sochialIcon" />
                      <div className="sochialButtonComponantTitle gap-1">
                        <span className="F4">Login with</span>
                        <span className="F1">Facebook</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hrStyle gap-1 mt-4">
                  <Link to="/signup">
                    <span className="F1">SingUp</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 order-0 order-lg-1 formeImg my-4">
              <img
                src="/images/access/welcomeBack.png"
                alt="login Img"
                width="100%"
                className="p-lg-3"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogIn;
