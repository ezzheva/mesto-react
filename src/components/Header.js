import React from "react";
import headerLogo from "../images/Vector.svg";

function Header() {
  return (
    <div className="Header">
      <header className="header">
        <img
          className="header__logo"
          src={headerLogo}
          alt="логотип места Росиии"
        />
      </header>
    </div>
  );
}

export default Header;
