import React from "react";
import { Outlet, Link } from "react-router-dom";

import "./my.less";

const My = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default My;
