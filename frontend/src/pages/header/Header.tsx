// React

// External
import { Link } from "react-router-dom";

// Local
import { ReactComponent as J93esLogo } from "assets/logo/j93es-logo.svg";
import "pages/header/Header.css";

const Header = () => {
  return (
    <header className="header-cont">
      <Link to="/" className="logo-item" aria-label="Go to homepage">
        <J93esLogo />
      </Link>
    </header>
  );
};

export default Header;
