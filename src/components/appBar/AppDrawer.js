import React from "react";
import { Link, useLocation } from "react-router-dom";
import { countries } from "../../data/countries";

export const AppDrawer = ({ visible, setVisible }) => {
  const { pathname } = useLocation();

  return (
    <div className={`${visible ? "drawer_out" : "drawer_in"} `}>
      <div>
        <img src="../../../512.png" style={{ width: "100px" }} alt="" />
      </div>
      <div className="divider" />
      <ul>
        {countries.map((item) => (
          <div
            key={item.name}
            className={
              pathname === `/country/${item.value}`
                ? "country_item active"
                : "country_item"
            }
          >
            <Link
              to={`country/${item.value}`}
              className="country_flex"
              onClick={() => setVisible(false)}
            >
              <span>{item.name} </span>
              <img src={item.flag} alt="" style={{ width: "30px" }} />
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};
