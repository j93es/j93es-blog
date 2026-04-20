// React

// External
import { Link } from "react-router-dom";

// Local
import { ReactComponent as InstagramIcon } from "assets/icons/instagram-icon.svg";
import { ReactComponent as GithubIcon } from "assets/icons/github-icon.svg";
import { ReactComponent as XIcon } from "assets/icons/x-icon.svg";
import { ReactComponent as LinkedinIcon } from "assets/icons/linkedin-icon.svg";
import { ReactComponent as MailIcon } from "assets/icons/mail-icon.svg";
import { useLoading } from "contexts/LoadingProvider";
import { usePostingIndexController } from "contexts/PostingIndexControllerProvider";
import ExternalLink from "components/ExternalLink";
import "pages/footer/Footer.css";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const { postingIndexController } = usePostingIndexController();
  const { isLoading } = useLoading();

  return isLoading || !postingIndexController ? null : (
    <footer className="footer-cont">
      <div className="social-item">
        <ExternalLink
          aria-label="j93es의 Instagram에 방문"
          href="https://www.instagram.com/j93es_jung"
        >
          <InstagramIcon />
        </ExternalLink>

        <ExternalLink
          aria-label="j93es의 X에 방문"
          href="https://x.com/j93es_jung"
        >
          <XIcon />
        </ExternalLink>

        <ExternalLink
          aria-label="j93es의 Github에 방문"
          href="https://github.com/j93es"
        >
          <GithubIcon />
        </ExternalLink>

        <ExternalLink
          aria-label="j93es의 Linkedin에 방문"
          href="https://www.linkedin.com/in/j93es"
        >
          <LinkedinIcon />
        </ExternalLink>

        <ExternalLink
          aria-label="j93es에게 Email을 통하여 연락"
          href="mailto:j93es.jung@gmail.com"
        >
          <MailIcon />
        </ExternalLink>
      </div>
      <p className="copyright">&copy; 2024. j93es. All rights reserved.</p>
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
