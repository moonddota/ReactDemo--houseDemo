import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api";
import memoryUtils from "../../../utils/memoryUtils";
import storageUtils from "../../../utils/storageUtils";
import PubSub from "pubsub-js";
import "./login.less";

const LoginPage = () => {
    const navigate = useNavigate();

    const onFinish = values => {
        login(values).then(res => {
            memoryUtils.user = res; // 保存在内存中
            storageUtils.saveUser(res); // 保存到local中
            message.success("登录成功");
            PubSub.publish("changeLogin", "login");
            navigate(-1);
        });
    };

    const onFinishFailed = errorInfo => {};

    const getRules = name => {
        return [
            { required: true, whitespace: true, message: `${name}必须输入` },
            { min: 4, message: `${name}至少4位` },
            { max: 12, message: `${name}最多12位` },
            { pattern: /^[a-zA-Z0-9_]+$/, message: `${name}必须是英文、数字或下划线组成` },
        ];
    };

    const jumpRegister = () => {
        PubSub.publish("jumpLogin", "register");
    };

    const forget = () => {
        window.open("https://www.wanandroid.com/blog/show/2947");
    };

    return (
        <Form className="login-form" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <h1 className="login-form-title">登录</h1>
            <Form.Item className="login-form-item" name="username" rules={getRules("用户名")}>
                <Input placeholder="用户名" size="large" />
            </Form.Item>
            <Form.Item name="password" rules={getRules("密码")}>
                <Input.Password placeholder="密码" size="large" />
            </Form.Item>
            <Form.Item className="login-form-item">
                <Button className="login-form-button" type="primary" htmlType="submit">
                    登录
                </Button>
                <Button className="login-form-register" type="link" onClick={jumpRegister}>
                    立即注册>
                </Button>
                <Button className="login-form-forget" type="link" onClick={forget}>
                    忘记密码？
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginPage;
