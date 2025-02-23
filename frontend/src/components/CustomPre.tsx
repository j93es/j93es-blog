// React

// External

// Local

interface CustomPreProps {
  elementWidth: number;
  [key: string]: any;
}

const CustomPre: React.FC<CustomPreProps> = ({ elementWidth, ...props }) => {
  return (
    <pre
      style={{
        whiteSpace: "pre",
        maxWidth: `${elementWidth}px`,
        overflowX: "auto",
      }}
      {...props}
    />
  );
};

export default CustomPre;
