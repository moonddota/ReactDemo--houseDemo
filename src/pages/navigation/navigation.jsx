import React, { useEffect, useState } from "react";
import { Layout, List, Button, Anchor, BackTop, Select, Form, Input } from "antd";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import { getNaviJson } from "../../api";
import baidu from "../../assets/images/baidu.png";
import google from "../../assets/images/google.png";
import github from "../../assets/images/github_logo.png";
import sogou from "../../assets/images/sogou_logo.png";
import so360 from "../../assets/images/so_logo.png";
import bing from "../../assets/images/bing_logo.png";
import weixinhao from "../../assets/images/weixinhao_logo.png";
import weixinwenzhang from "../../assets/images/weixinwenzhang_logo.png";
import "./navigation.less";

const { Sider, Content } = Layout;
const { Link } = Anchor;
const { Option } = Select;
const Navigation = () => {
    const logoList = [
        {
            type: 1,
            src: baidu,
            value: "baidu",
        },
        { type: 1, src: google, value: "google" },
        { type: 1, src: github, value: "github" },
        { type: 1, src: sogou, value: "sogou" },
        { type: 1, src: so360, value: "so360" },
        { type: 1, src: bing, value: "bing" },
        { type: 1, src: weixinhao, value: "weixinhao" },
        { type: 1, src: weixinwenzhang, value: "weixinwenzhang" },
        { type: 0, src: "站内搜索", value: "站内搜索" },
        { type: 0, src: "dogedoge", value: "dogedoge" },
    ];

    const [list, setList] = useState([]);

    useEffect(() => {
        if (list.length === 0) {
            getNaviJson().then(resource => {
                setList(resource);
            });
        }
    }, []);

    const handleAnchorClick = (e, link) => {
        e.preventDefault();
    };

    const onFinish = (values: any) => {
        let url;
        switch (values.type) {
            case "baidu":
                url = `http://www.baidu.com/s?wd=`;
                break;
            case "google":
                url = `https://www.google.com/search?ie=UTF-8&q=`;
                break;
            case "github":
                url = `https://github.com/search?utf8=%E2%9C%93&q=`;
                break;
            case "sogou":
                url = `https://www.sogou.com/web?ie=UTF-8&query=`;
                break;
            case "so360":
                url = `https://www.so.com/s?ie=UTF-8&q=`;
                break;
            case "bing":
                url = `https://cn.bing.com/search?q=`;
                break;
            case "weixinhao":
                url = `https://weixin.sogou.com/weixin?type=1&ie=utf8&query=}`;
                break;
            case "weixinwenzhang":
                url = `https://weixin.sogou.com/weixin?type=2&ie=utf8&query=`;
                break;
            case "站内搜索":
                url = `https://www.wanandroid.com/article/query?k=`;
                break;
            case "dogedoge":
                url = `https://www.ladydaily.com/results?q=`;
                break;
            default:
                break;
        }
        window.open(url + values.keywords, "_blank");
    };
    return (
        <Layout className="navigation-content">
            <Sider style={{ backgroundColor: "#fff" }}>
                <Anchor className="navigation-menu" onClick={handleAnchorClick} affix={false}>
                    <List
                        itemLayout="horizontal"
                        dataSource={list}
                        renderItem={item => (
                            <Link
                                key={item.cid}
                                onClick={item => {
                                    console.log(item);
                                }}
                                className="navigation-menu-item"
                                href={`#${item.cid}`}
                                title={item.name}
                            />
                        )}
                    />
                </Anchor>
            </Sider>
            <Content style={{ backgroundColor: "#fff" }}>
                <div className="navigation-search">
                    <Form className="navigation-search-form" initialValues={{ type: logoList[0].value }} onFinish={onFinish} autoComplete="off">
                        <Form.Item name="type">
                            <Select size="large" listHeight="400" defaultActiveFirstOption={false} bordered={false} className="navigation-select">
                                {logoList.map(item => {
                                    return (
                                        <Option className="navigation-select-item" key={item.value} value={item.value}>
                                            {item.type === 1 ? (
                                                <img className="navigation-select-logo" src={item.src} alt="" />
                                            ) : (
                                                <span className="navigation-select-text">{item.value}</span>
                                            )}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>

                        <Form.Item name="keywords" rules={[{ required: true, message: "请输入搜索内容!" }]}>
                            <Input placeholder="请输入搜索内容" className="navigation-search-input" />
                        </Form.Item>
                        <Form.Item>
                            <Button className="navigation-search-button" type="primary" htmlType="submit">
                                搜索
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                <List
                    itemLayout="horizontal"
                    dataSource={list}
                    renderItem={item => (
                        <List.Item id={item.cid} key={item.cid} className="navigation-item">
                            <div>
                                <p className="navigation-item-title">{item.name}</p>
                                {item.articles.map(article => {
                                    return (
                                        <Button key={article.id} href={article.link} target="_blank" type="link" className="navigation-item-tag">
                                            {article.title}
                                        </Button>
                                    );
                                })}
                            </div>
                        </List.Item>
                    )}
                />
            </Content>
            <BackTop>
                <VerticalAlignTopOutlined className="BackTop" />
            </BackTop>
        </Layout>
    );
};

export default Navigation;
