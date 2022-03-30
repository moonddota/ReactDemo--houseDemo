import React, { useEffect, useState } from "react";
import { Layout, List, Button, Image } from "antd";
import { HeartFilled } from "@ant-design/icons";
import empty from "../../assets/images/empty.png";
import { getHotProjects } from "../../api";

import "./project.less";

const Project = () => {
    const [pageNum, setPageNum] = useState(0);
    const [list, setList] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        getHotProjects(pageNum).then(res => {
            const data = [...list, ...res.datas];
            setList(data);
            setPageNum(pageNum + 1);
            if (data.length >= res.total) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
        });
    };

    const loadMoreData = page => {
        if (page * 4 < list.length) return;
        if (!hasMore) return;
        getData();
    };

    return (
        <Layout className="project">
            <span type="text" className="project-title">
                热门项目：
            </span>
            <List
                className="project-list"
                itemLayout="vertical"
                pagination={{
                    onChange: page => {
                        loadMoreData(page);
                    },
                    pageSize: 4,
                    style: { height: "32px", lineHeight: "32px", textAlign: "center" },
                }}
                dataSource={list}
                renderItem={item => (
                    <List.Item key={item.id} className="project-list-item">
                        <HeartFilled className="project-list-icon" />
                        <div className="project-list-content">
                            <Button href={item.link} type="link" target="_blank" className="project-list-content-title">
                                {item.title}
                            </Button>
                            <span className="project-list-content-body"> {item.desc}</span>
                            <span className="project-list-content-time">
                                {item.niceDate}
                                {item.author ? item.author : item.shareUser}
                                <Button href={item.link} type="link" target="_blank" className="project-list-content-button">
                                    查看同类项目
                                </Button>
                            </span>
                        </div>
                        <div className="project-list-content-img">
                            <Image width="100%" src={item.envelopePic} fallback={empty} />
                        </div>
                    </List.Item>
                )}
            />
        </Layout>
    );
};

export default Project;
