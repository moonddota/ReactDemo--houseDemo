import React, { useEffect, useState } from "react";
import { Layout, Button } from "antd";
import { getTreeJson, getTreeJsonList } from "../../api";
import ArticleList from "../../components/article-list/article-list";

import "./system.less";

function System() {
    const [title1, setTitle1] = useState([]);
    const [title2, setTitle2] = useState([]);
    const [CID, setCID] = useState();
    const [listID, setListID] = useState();
    const [list, setList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [pageNum, setPageNum] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getTreeJson().then(res => {
            setTitle1(res);
            setCID(res[0].id);
            if (res[0]) {
                setTitle2(res[0].children);
                if (res[0].children[0]) {
                    getListData(res[0].children[0].id);
                }
            }
        });
    }, []);

    const loadMoreData = page => {
        setCurrentPage(page);
        if (page * 7 >= list.length) {
            getListData(listID, true);
        }
    };

    const getListData = (id, isMore) => {
        let page;
        if (isMore) {
            if (!hasMore) return;
            page = pageNum;
        } else {
            page = 0;
        }
        getTreeJsonList(page, id).then(res => {
            const { total, datas } = res;
            const arr = [...list, ...datas];
            if (arr.length >= total) {
                setHasMore(false);
            } else {
                setPageNum(pageNum + 1);
            }
            if (isMore) {
                setList(arr);
            } else {
                setList(datas);
                setCurrentPage(1);
                setListID(id);
            }
        });
    };

    const title1Click = data => {
        return () => {
            if (CID === data.id) return;
            setTitle2(data.children);
            setCID(data.id);
            if (data.children[0]) {
                getListData(data.children[0].id);
            }
        };
    };
    const title2Click = data => {
        return () => {
            if (listID === data.id) return;
            getListData(data.id);
        };
    };

    return (
        <Layout className="system">
            <div className="systen-header">
                <div className="systen-header-title">
                    <Button type="text">一级分类：</Button>
                    <div>
                        {title1.map(item => {
                            return (
                                <Button
                                    key={item.id}
                                    onClick={title1Click(item)}
                                    className="systen-header-tag"
                                    type="text"
                                    style={
                                        CID === item.id
                                            ? {
                                                  border: " 1px solid #1da57a",
                                                  color: "#1da57a",
                                              }
                                            : {}
                                    }
                                >
                                    {item.name}
                                </Button>
                            );
                        })}
                    </div>
                </div>
                <div className="systen-header-title">
                    <Button type="text">二级分类：</Button>
                    <div>
                        {title2.map(item => {
                            return (
                                <Button
                                    key={item.id}
                                    onClick={title2Click(item)}
                                    className="systen-header-tag"
                                    type="text"
                                    style={
                                        listID === item.id
                                            ? {
                                                  border: " 1px solid #1da57a",
                                                  color: "#1da57a",
                                              }
                                            : {}
                                    }
                                >
                                    {item.name}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </div>
            <ArticleList data={list} size={7} currentPage={currentPage} loadMoreData={loadMoreData} />
        </Layout>
    );
}

export default System;
