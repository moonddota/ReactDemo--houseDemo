import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { getAskList } from "../../api";
import ArticleList from "../../components/article-list/article-list";
import "./ask.less";
function Ask() {
    const [pageNum, setPageNum] = useState(1);
    const [listData, setListData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        getData(1);
    }, []);

    const getData = (page, isMore = false) => {
        getAskList(page).then(res => {
            let list;
            if (isMore) {
                list = [...listData, ...res.datas];
            } else {
                list = [...res.datas];
                setCurrentPage(1);
            }
            setHasMore(list.length <= res.total);
            setListData(list);
            setPageNum(page + 1);
        });
    };

    const loadMoreData = page => {
        window.scroll(0, 0);
        setCurrentPage(page);
        if (page * 10 < listData.length) return;
        if (!hasMore) return;
        getData(pageNum, true);
    };

    return (
        <div className="ask">
            <div className="ask-right">
                <div className="ask-list-title">
                    <Button type="text" className="ask-list-title-button">
                        问答>
                    </Button>
                    <Button type="text" className="ask-list-title-text">
                        {listData[0] ? listData[0].chapterName : ""}
                    </Button>
                </div>
                <ArticleList data={listData} size={10} currentPage={currentPage} loadMoreData={loadMoreData} />
            </div>

            <div className="ask-left"></div>
        </div>
    );
}

export default Ask;
