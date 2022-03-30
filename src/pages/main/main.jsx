import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/header";

import {} from "../../api";

import "./main.less";

function Main() {
    return (
        <Layout>
            <Header />
            <Layout.Content className="main-body">
                <Outlet />
            </Layout.Content>
        </Layout>
    );
}

export default Main;
