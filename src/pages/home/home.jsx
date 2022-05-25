import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons";

import Banner from "../../components/banner/banner";
import ArticleList from "../../components/article-list/article-list";
import { getTopArticle, getArticle, getBanner } from "../../api";
import "./home.less";
const { Content, Sider } = Layout;
const { SubMenu } = Menu;

function Home() {
    const [data, setData] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [bannerList, setBannerList] = useState([]);

    useEffect(() => {
        getTopArticle().then(result => {
            setData(result);
        });
        getBanner().then(data => {
            setBannerList(data);
        });
    }, []);

    const loadMoreData = page => {
        setCurrentPage(page);
        if (page * 5 >= data.length) {
            if (!hasMore) return;
            getArticle(pageNum).then(result => {
                const { total, datas } = result;
                const list = [...data, ...datas];
                if (list.length >= total) {
                    setHasMore(false);
                } else {
                    setPageNum(pageNum + 1);
                }
                setData(list);
            });
        }
    };
    return (
        <div id="scrollableDiv" className="home">
            <Banner>
                {bannerList.map(item => {
                    return (
                        <a key={item.url} href={item.url} target="_blank" rel="noreferrer">
                            <img src={item.imagePath} alt="" />
                        </a>
                    );
                })}
            </Banner>
            <Layout className="home-content">
                <Sider>
                    <Menu mode="inline" defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} style={{ height: "100%" }}>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                            <Menu.Item key="1">option1</Menu.Item>
                            <Menu.Item key="2">option2</Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                            <Menu.Item key="5">option5</Menu.Item>
                            <Menu.Item key="6">option6</Menu.Item>
                            <Menu.Item key="7">option7</Menu.Item>
                            <Menu.Item key="8">option8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <ArticleList data={data} size={5} currentPage={currentPage} loadMoreData={loadMoreData} />
            </Layout>
        </div>
    );
}

export default Home;
