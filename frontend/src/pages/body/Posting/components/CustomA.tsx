// React

// External

// Local
import ExternalLink from "components/ExternalLink";

interface CustomAProps {
  [key: string]: any;
}

const CustomA: React.FC<CustomAProps> = (props) => {
  return (
    <ExternalLink {...props} href={props.href} children={props.children} />
  );
};

export default CustomA;
