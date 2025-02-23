// React
import { useEffect } from "react";

// External

// Local
import { useLoading } from "contexts/LoadingProvider";
import { useFooterHidden } from "contexts/FooterHiddenProvider";
import Header from "pages/header/Header";
import Body from "pages/body/Body";
import Footer from "pages/footer/Footer";

const Pages = () => {
  const { isLoading } = useLoading();
  const { setFooterHidden } = useFooterHidden();

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
      <Footer />
    </>
  );
};

export default Pages;
