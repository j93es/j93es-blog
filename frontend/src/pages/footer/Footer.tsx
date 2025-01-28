// Local
import { ReactComponent as InstagramIcon } from "assets/icons/instagram-icon.svg";
import { ReactComponent as GithubIcon } from "assets/icons/github-icon.svg";
import { ReactComponent as MailIcon } from "assets/icons/mail-icon.svg";
import "pages/footer/Footer.css";

// External
import { Link } from "react-router-dom";

export default function Footer({ footerHideCmd }: { footerHideCmd: boolean }) {
  if (footerHideCmd) {
    return null;
  }
  return (
    <footer className="footer-cont">
      <div className="social-item">
        <a
          aria-label="Visit j93es's Instagram"
          href="https://www.instagram.com/j93es_jung"
        >
          <InstagramIcon />
        </a>
        <a aria-label="Visit j93es's Github" href="https://github.com/j93es">
          <GithubIcon />
        </a>
        <a
          aria-label="Contact j93es by email"
          href="mailto:j93es.jung@gmail.com"
        >
          <MailIcon />
        </a>
      </div>
      <p>&copy; 2024. j93es. All rights reserved.</p>
      <Link
        to="/policy/information-protection-policy.md"
        className="information-protection-policy"
      >
        정보 보호 정책
      </Link>
    </footer>
  );
}
