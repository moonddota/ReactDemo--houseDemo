import React, { memo, useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { Tabs, Modal, Menu, Dropdown, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { MessageOutlined } from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LinkButton from "../link-button";
import PubSub from "pubsub-js";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import { logout } from "../../api";

import "./header.less";

const Header = () => {
    const pages = [
        { name: "首页", path: "/main/home" },
        { name: "广场", path: "/main/square" },
        { name: "导航", path: "/main/navigation" },
        { name: "问答", path: "/main/ask" },
        { name: "体系", path: "/main/system" },
        { name: "项目", path: "/main/project" },
        { name: "公众号", path: "/main/official-account" },
        { name: "项目分类", path: "/main/progect-class" },
        { name: "工具", path: "/main/tool" },
        { name: "中国色", path: "/main/chinacolor" },
    ];
    const navigate = useNavigate();
    const loaction = useLocation();
    const [type, setType] = useState({});

    useEffect(() => {
        setType(memoryUtils.user);
        const token = PubSub.subscribe("changeLogin", mySubscriber);
        return () => {
            PubSub.unsubscribe(token);
        };
    }, []);

    const mySubscriber = function (msg, data) {
        setType(memoryUtils.user);
    };

    function onChange(key, replace = true) {
        if (loaction.pathname === key) return;
        navigate(key, { replace: replace });
    }

    const jumpLogin = type => {
        return () => {
            if (loaction.pathname === "/main/login") {
                PubSub.publish("jumpLogin", type);
            } else {
                navigate("/main/login", { state: type });
            }
        };
    };

    const LoginOut = () => {
        Modal.confirm({
            title: "确定退出当前用户?",
            icon: <ExclamationCircleOutlined />,
            content: "",
            okText: "确定",
            okType: "danger",
            onOk() {
                logout().then(res => {
                    // 删除保存的user数据
                    storageUtils.removeUser();
                    memoryUtils.user = {};
                    setType({});
                    // 跳转到login
                    jumpLogin("login");
                });
            },
            cancelText: "取消",
            onCancel() {},
        });
    };

    const menu = (
        <Menu>
            <Menu.Item>
                <LinkButton
                    onClick={() => {
                        onChange("/my/coin", false);
                    }}
                >
                    我的积分
                </LinkButton>
            </Menu.Item>
            <Menu.Item>
                <LinkButton onClick={LoginOut}>我的收藏</LinkButton>
            </Menu.Item>
            <Menu.Item>
                <LinkButton onClick={LoginOut}>退出</LinkButton>
            </Menu.Item>
        </Menu>
    );

    return (
        <div id="header">
            <div className="header-div">
                <img
                    className="header-logo"
                    onClick={() => {
                        onChange("/main/home");
                    }}
                    src={logo}
                    alt="logo"
                />

                <Tabs className="header-tab" defaultActiveKey={loaction.pathname} onChange={onChange}>
                    {pages.map(item => {
                        return <Tabs.TabPane tab={item.name} key={item.path} />;
                    })}
                </Tabs>
                <div className="header-right">
                    {type.id ? (
                        <div>
                            <Dropdown overlay={menu} placement="bottomCenter">
                                <LinkButton
                                    onClick={() => {
                                        onChange("/my", false);
                                    }}
                                >
                                    {type.nickname}
                                </LinkButton>
                            </Dropdown>
                        </div>
                    ) : (
                        <div>
                            <LinkButton onClick={jumpLogin("login")}>登录</LinkButton>·<LinkButton onClick={jumpLogin("register")}>注册</LinkButton>
                        </div>
                    )}
                    &nbsp; &nbsp;
                    <MessageOutlined
                        className="header-right-icon"
                        onClick={() => {
                            onChange("/entertainment");
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default memo(Header);
