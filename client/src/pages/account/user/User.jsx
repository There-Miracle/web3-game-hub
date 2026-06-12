import { UserInfo, UserProducts, Setting } from "./components/memberComponents";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const User = ({ Data, setData }) => {
  const [bodyComponant, serBodyComponant] = useState(0);
  return (
    <>
      <Helmet>
        <title>MarketHub | Account</title>
        <meta name="description" content="Manage your MarketHub account" />
      </Helmet>
      <UserInfo rowData={Data} serBodyComponant={serBodyComponant} />
      {bodyComponant === 0 ? (
        <UserProducts rowData={Data} />
      ) : (
        <Setting
          rowData={Data}
          setData={setData}
          serBodyComponant={serBodyComponant}
        />
      )}
    </>
  );
};

export default User;
