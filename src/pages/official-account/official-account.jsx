import React, { useEffect, useState } from "react";
import { Layout, Button, List } from "antd";
import { HeartFilled, StarOutlined } from "@ant-design/icons";
import { getWxarticleChapters, getWxarticleList } from "../../api";
import "./official-account.less";

const { Content, Sider } = Layout;
const OfficialAccount = () => {
    const [tabList, setTabList] = useState([]);
    const [tabID, setTabid] = useState();
    const [listData, setListData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        getWxarticleChapters().then(res => {
            console.log(res);
            setTabList(res);
            if (res[0]) getData(res[0].id, 1);
        });
    }, []);

    const tabClick = item => {
        return () => {
            window.scroll(0, 0);
            getData(item.id, 1);
        };
    };

    const getData = (id, page, isMore = false) => {
        getWxarticleList(id, page).then(res => {
            console.log(res);
            let list;
            if (isMore) {
                list = [...listData, ...res.datas];
            } else {
                list = [...res.datas];
                setCurrentPage(1);
            }
            setHasMore(list.length <= res.total);
            setListData(list);
            setTabid(id);
            setPageNum(page + 1);
        });
    };

    const loadMoreData = page => {
        window.scroll(0, 0);
        setCurrentPage(page);
        if (page * 8 < listData.length) return;
        if (!hasMore) return;
        getData(tabID, pageNum, true);
    };

    const onFinish = values => {
        console.log(values);
    };
    return (
        <Layout className="gzh">
            <Sider className="gzh-left">
                {tabList.map(item => {
                    return (
                        <div key={item.id}>
                            <StarOutlined className="gzh-lef-icon" />
                            <Button
                                className="gzh-lef-buttomn"
                                style={
                                    item.id === tabID ? { color: "rgb(27, 138, 97)", borderBottom: "1px solid rgb(27, 138, 97)" } : { color: "#333" }
                                }
                                onClick={tabClick(item)}
                                type="text"
                            >
                                {item.name}
                            </Button>
                        </div>
                    );
                })}
            </Sider>
            <Content>
                <List
                    split={false}
                    itemLayout="horizontal"
                    dataSource={listData}
                    pagination={{
                        onChange: page => {
                            loadMoreData(page);
                        },
                        pageSize: 8,
                        current: currentPage,
                        style: { height: "32px", lineHeight: "32px", textAlign: "center" },
                    }}
                    renderItem={item => (
                        <List.Item className="gzh-list">
                            <HeartFilled className="gzh-list-icon" />
                            <div>
                                <Button href={item.link} target="_blank" type="link" className="gzh-list-button">
                                    {item.title}
                                </Button>
                                <p> 时间：{item.niceDate}</p>
                            </div>
                        </List.Item>
                    )}
                />
            </Content>
        </Layout>
    );
};

export default OfficialAccount;
