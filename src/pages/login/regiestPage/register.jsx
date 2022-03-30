import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { register } from "../../../api";
import memoryUtils from "../../../utils/memoryUtils";
import storageUtils from "../../../utils/storageUtils";

import "./register.less";

const RegiestPage = () => {
    const navigate = useNavigate();

    const onFinish = values => {
        register(values).then(res => {
            memoryUtils.user = res; // 保存在内存中
            storageUtils.saveUser(res); // 保存到local中
            message.success("登录成功");
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
    return (
        <Form className="register-form" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <h1 className="register-form-title">注册</h1>
            <Form.Item className="register-form-item" name="username" rules={getRules("用户名")}>
                <Input placeholder="用户名" size="large" />
            </Form.Item>
            <Form.Item name="password" rules={getRules("密码")}>
                <Input.Password placeholder="密码" size="large" />
            </Form.Item>
            <Form.Item
                name="repassword"
                rules={[
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject("两次密码输入不一致");
                        },
                    }),
                ]}
            >
                <Input.Password placeholder="确认密码" size="large" />
            </Form.Item>
            <Form.Item className="register-form-item">
                <Button className="register-form-button" type="primary" htmlType="submit">
                    注册
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegiestPage;
