import React, { useState, useEffect } from "react";
import { Layout, List, Button, Typography } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { getProjectTree, getProjectList } from "../../api";

import "./progect-class.less";

const { Sider, Content } = Layout;
const { Paragraph, Text } = Typography;
const ProgectClass = () => {
    const [siderData, setSiderData] = useState([]);
    const [tabID, setTabID] = useState();
    const [pageNum, setPageNum] = useState(1);
    const [ListData, setListData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getProjectTree().then(res => {
            setSiderData(res);
            getListData(1, res[0].id);
        });
    }, []);

    const getListData = (page, id, isMore = false) => {
        getProjectList(page, id).then(res => {
            let list;
            if (isMore) {
                list = [...ListData, ...res.datas];
            } else {
                list = [...res.datas];
                setCurrentPage(1);
            }
            setHasMore(list.length <= res.total);
            setListData(list);
            setTabID(id);
            setPageNum(page + 1);
        });
    };

    const switchTag = item => {
        return () => {
            window.scroll(0, 0);
            getListData(1, item.id);
        };
    };

    const loadMoreData = page => {
        window.scroll(0, 0);
        setCurrentPage(page);
        if (page * 6 < ListData.length) return;
        if (!hasMore) return;
        getListData(pageNum, tabID, true);
    };

    const jumpArticle = item => {
        return () => {
            window.open(item.link);
        };
    };

    return (
        <Layout className="progrct-class">
            <Sider className="progrct-class-tags">
                <List
                    split={false}
                    itemLayout="horizontal"
                    dataSource={siderData}
                    renderItem={item => (
                        <Button
                            key={item.id}
                            onClick={switchTag(item)}
                            type="link"
                            className="progrct-class-tags-item"
                            style={item.id === tabID ? { color: "rgb(27, 138, 97)" } : { color: "#333" }}
                        >
                            {item.name}
                        </Button>
                    )}
                />
            </Sider>
            <Content>
                <List
                    grid={{ column: 2 }}
                    split={false}
                    itemLayout="horizontal"
                    dataSource={ListData}
                    pagination={{
                        onChange: page => {
                            loadMoreData(page);
                        },
                        pageSize: 6,
                        current: currentPage,
                        style: { height: "32px", lineHeight: "32px", textAlign: "center" },
                    }}
                    renderItem={item => (
                        <div className="progrct-class-list-item">
                            <img className="progrct-class-list-item-img" onClick={jumpArticle(item)} src={item.envelopePic} alt="" />
                            <div className="progrct-class-list-item-count">
                                <LinkButton onClick={jumpArticle(item)}>{item.title}</LinkButton>
                                <Paragraph ellipsis={{ rows: 5 }} style={{ color: "rgb(157, 149, 136)" }}>
                                    {item.desc}
                                </Paragraph>
                                <div className="project-class-list-item-bottom">
                                    <Text style={{ color: "rgb(157, 149, 136)" }}>
                                        {item.niceDate}
                                        &nbsp;
                                        {item.author ? item.author : item.shareUser}
                                        &nbsp; &nbsp; &nbsp;
                                    </Text>
                                    <HeartFilled className="project-class-list-item-icon" />
                                </div>
                            </div>
                        </div>
                    )}
                />
            </Content>
        </Layout>
    );
};

const LinkButton = props => {
    const [style, setStyle] = useState({ width: "100%", fontSize: "14px", color: "#333" });

    const MouseOut = () => {
        setStyle({ width: "100%", fontSize: "14px", color: "#333" });
    };

    const MouseOver = () => {
        setStyle({ width: "100%", fontSize: "14px", color: "rgb(27, 138, 97)" });
    };

    return <Paragraph ellipsis={true} {...props} style={style} onMouseOver={MouseOver} onMouseOut={MouseOut}></Paragraph>;
};

export default ProgectClass;
