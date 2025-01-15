import * as React from "react";
const SvgComponent = (props) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 580 1000"
    {...props}
  >
    <path d="M550 450c20 0 30 16.667 30 50s-10 50-30 50H340v210c0 20-16.667 30-50 30s-50-10-50-30V550H30c-20 0-30-16.667-30-50s10-50 30-50h210V240c0-20 16.667-30 50-30s50 10 50 30v210h210" />
  </svg>
);
export { SvgComponent as PlusIcon };
