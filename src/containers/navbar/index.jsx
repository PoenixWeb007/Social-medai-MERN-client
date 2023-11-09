import * as React from "react";
import { token, websiteName } from "../../App";

const Pages = ["home", "groups"];

function Navbar() {
  return (
    <nav className="d-flex align-items-center bg-info">
      <div className="d-flex align-items-center">
        <h1 className="mx-3"> {websiteName}</h1>
        {token
          ? Pages.map((page) => (
              <a className="mx-3" key={page} href={`/${page}`}>
                {page}
              </a>
            ))
          : null}
      </div>
    </nav>
  );
}

export default Navbar;
