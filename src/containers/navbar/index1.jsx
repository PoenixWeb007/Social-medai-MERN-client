import * as React from "react";
import { websiteName } from "../../App";
import { useSelector } from "react-redux";

const Pages = [];

function Navbar() {
  const token = useSelector((state) => state.global.token);
  return (
    <nav
      className="d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#fff", width: "100%" }}
    >
      <h1 className="mx-3"> {websiteName}</h1>
      {token
        ? Pages.map((page) => (
            <a className="mx-3" key={page} href={`/${page}`}>
              {page}
            </a>
          ))
        : null}
    </nav>
  );
}

//export default Navbar;
