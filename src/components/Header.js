import React from "react";
import headerlogo from "../images/Vector.svg";

function Header() {
  return (
    <div className="Header">
      <header className="header">
        <img
          className="header__logo"
          src={headerlogo}
          alt="логотип места Росиии"
        />
      </header>
    </div>
  );
}

export default Header;
