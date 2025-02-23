// React
import { useEffect, useState } from "react";

// External

// Local
import { useLoading } from "contexts/LoadingProvider";
import Header from "pages/header/Header";
import Body from "pages/body/Body";
import Footer from "pages/footer/Footer";

interface PagesProps {}

const Pages: React.FC<PagesProps> = () => {
  const { isLoading } = useLoading();
  const [footerHidden, setFooterHidden] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) {
      setFooterHidden(true);
    } else {
      setFooterHidden(false);
    }
    // eslint-disable-next-line
  }, [isLoading]);

  return (
    <>
      <Header />
      <Body />
      <Footer footerHidden />
    </>
  );
};

export default Pages;
