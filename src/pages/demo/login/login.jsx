import React from "react";
import { Button, Form, Input } from "antd";
import { hLogin } from "../../../api/index";

function HLogin() {
    const onFinish = values => {
        hLogin(values).then(res => {
            console.log(res);
        });
    };

    const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo);
    };
    return (
        // <form action="http://192.168.100.167:8000/" method="GET">
        //     姓名：
        //     <input type="text" name="name" /> <br />
        //     年龄：
        //     <input type="text" name="age" /> <br />
        //     <input type="radio" name="sex" value="男" /> 男
        //     <input type="radio" name="sex" value="女" /> 女
        //     <br />
        //     <input type="submit" />
        // </form>
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Please input your username!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default HLogin;
