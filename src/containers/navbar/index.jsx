import * as React from "react";
import { token, websiteName } from "../../App";

const Pages = [];

function Navbar() {
  return (
    <nav className="d-flex align-items-center justify-content-center">
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

export default Navbar;
