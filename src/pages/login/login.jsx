import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoginPage from "./loginPage/login";
import RegiestPage from "./regiestPage/register";
import PubSub from "pubsub-js";

const Login = () => {
    const loaction = useLocation();
    const [type, setType] = useState("");

    useEffect(() => {
        setType(loaction.state);
        const token = PubSub.subscribe("jumpLogin", mySubscriber);
        return () => {
            PubSub.unsubscribe(token);
        };
    }, []);

    const mySubscriber = function (msg, data) {
        setType(data);
    };

    return type === "login" ? <LoginPage /> : <RegiestPage />;
};

export default Login;
