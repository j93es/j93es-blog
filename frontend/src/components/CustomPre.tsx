// React

// External

// Local

const CustomPre = ({ elementWidth, ...props }: { elementWidth: number }) => {
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
