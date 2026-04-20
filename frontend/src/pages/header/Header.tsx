// React

// External
import { Link } from "react-router-dom";

// Local
import { ReactComponent as J93esLogo } from "assets/logo/j93es-logo.svg";
import { appDefaultTitle } from "config";
import "pages/header/Header.css";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="header-cont">
      <Link
        to="/"
        className="logo-item"
        aria-label={`${appDefaultTitle}의 홈페이지로 이동`}
      >
        <J93esLogo />
      </Link>
    </header>
  );
};

export default Header;
