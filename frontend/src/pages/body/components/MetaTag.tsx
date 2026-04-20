// React

// External

// Local
import MetaTagV1 from "./MetaTagV1";
// import MetaTagV2 from "./MetaTagV2";

export interface MetaTagProps {
  title?: string;
  description?: string;
  useDefault?: boolean;
}

const MetaTag: React.FC<MetaTagProps> = MetaTagV1;

export default MetaTag;
