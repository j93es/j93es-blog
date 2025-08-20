// React

// External

// Local

interface CustomLiProps {
  [key: string]: any;
}

const CustomLi: React.FC<CustomLiProps> = (props) => {
  return <li {...props} style={{ paddingBottom: "0.25rem" }} />;
};

export default CustomLi;
