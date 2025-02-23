// React

// External
import { Link } from "react-router-dom";

// Local
import { ReactComponent as InstagramIcon } from "assets/icons/instagram-icon.svg";
import { ReactComponent as GithubIcon } from "assets/icons/github-icon.svg";
import { ReactComponent as MailIcon } from "assets/icons/mail-icon.svg";
import "pages/footer/Footer.css";

interface FooterProps {
  footerHidden: boolean;
}

const Footer: React.FC<FooterProps> = ({ footerHidden }) => {
  if (footerHidden) {
    return null;
  }
  return (
    <footer className="footer-cont">
      <div className="social-item">
        <a
          aria-label="j93es의 Instagram에 방문"
          href="https://www.instagram.com/j93es_jung"
        >
          <InstagramIcon />
        </a>
        <a aria-label="j93es의 Github에 방문" href="https://github.com/j93es">
          <GithubIcon />
        </a>
        <a
          aria-label="j93es에게 Email을 통하여 연락"
          href="mailto:j93es.jung@gmail.com"
        >
          <MailIcon />
        </a>
      </div>
      <p>&copy; 2024. j93es. All rights reserved.</p>
      <Link
        to="/policy/information-protection-policy.md"
        className="policy-link"
        aria-label="정보 보호 정책 열람"
      >
        정보 보호 정책
      </Link>
    </footer>
  );
};

export default Footer;
