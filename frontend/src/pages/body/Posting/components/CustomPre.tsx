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
      {...props}
      style={{
        whiteSpace: "pre",
        maxWidth: `${elementWidth}px`,
        overflowX: "auto",
      }}
    />
  );
};

export default CustomPre;
