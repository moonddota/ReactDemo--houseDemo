import React, { useState } from "react";

const LinkButton = props => {
    const [style, setStyle] = useState({ backgroundColor: "transparent", border: "none", outline: "none", color: "rgb(113, 174, 217)" });

    const MouseOut = () => {
        setStyle({ backgroundColor: "transparent", border: "none", outline: "none", color: "rgb(113, 174, 217)" });
    };

    const MouseOver = () => {
        setStyle({ backgroundColor: "transparent", border: "none", outline: "none", color: "red" });
    };

    return <button {...props} style={style} onMouseOver={MouseOver} onMouseOut={MouseOut}></button>;
};

export default LinkButton;
