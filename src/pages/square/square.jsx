import React, { useState, useEffect } from "react";
import ArticleList from "../../components/article-list/article-list";
import { getUserArticle } from "../../api";
import "./square.less";
function Square() {
    const [data, setData] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getData();
    }, []);

    const loadMoreData = page => {
        setCurrentPage(page);
        if (page * 10 >= data.length) {
            if (!hasMore) return;
            getData();
        }
    };

    const getData = () => {
        getUserArticle(pageNum).then(result => {
            const { total, datas } = result;
            const list = [...data, ...datas];
            if (list.length >= total) {
                setHasMore(false);
            } else {
                setPageNum(pageNum + 1);
            }
            setData(list);
        });
    };

    return (
        <div className="square">
            <div className="square-content">
                <ArticleList data={data} size={10} currentPage={currentPage} showMore={false} loadMoreData={loadMoreData} />
            </div>
        </div>
    );
}

export default Square;
