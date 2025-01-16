import * as React from "react";
const SvgComponent = (props) => (
    <svg
        width="2em"
        height="2em"
        fill="currentColor"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z" />
    </svg>
);
export { SvgComponent as Circular };