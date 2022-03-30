import React from "react";
import PropTypes from "prop-types";
import { List, Button } from "antd";
import { HeartFilled, SmallDashOutlined } from "@ant-design/icons";
import "./article-list.less";

const ArticleList = props => {
    const title = item => {
        return (
            <div>
                {item.fresh ? <span className="article-list-red">&nbsp;新&nbsp;</span> : ""}
                <Button href={item.link} target="_blank" type="link" className="article-list-content-title">
                    {item.title}
                </Button>
            </div>
        );
    };
    const thisStation = item => {
        for (let index = 0; index < item.tags.length; index++) {
            if (item.tags[index].name === "本站发布") {
                return (
                    <Button size="small" href="跳转路径" className="article-list-greed">
                        &nbsp;本站发布&nbsp;
                    </Button>
                );
            }
        }
    };
    const tip = item => {
        switch (item.superChapterName) {
            case "问答":
                return (
                    <Button size="small" href="跳转路径" className="article-list-greed">
                        &nbsp;问答&nbsp;
                    </Button>
                );
            case "公众号":
                return (
                    <Button size="small" href="跳转路径" className="article-list-greed">
                        &nbsp;公众号&nbsp;
                    </Button>
                );
            default:
                break;
        }
    };

    const author = item => {
        let s;
        if (item.author) s = `作者：${item.author}`;
        else if (item.shareUser) s = `分享人：${item.shareUser}`;
        return s;
    };
    return (
        <List
            className="article-list"
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    props.loadMoreData(page);
                },
                pageSize: props.size,
                current: props.currentPage,
                style: { height: "32px", lineHeight: "32px", textAlign: "center" },
            }}
            dataSource={props.data}
            renderItem={item => (
                <List.Item key={item.id} className="article-list-item">
                    <HeartFilled className="article-list-icon" />
                    <div className="article-list-content">
                        {title(item)}
                        <div className="article-list-buttom">
                            {item.type === 1 ? <span className="article-list-red">&nbsp;置顶&nbsp;</span> : ``}
                            {thisStation(item)}
                            {tip(item)}
                            &nbsp; &nbsp;
                            <span className="article-list-grey">
                                {author(item)}
                                &nbsp; &nbsp; 分类：
                                <Button type="link" size="small" href="跳转路径" className="article-list-grey button">
                                    {item.superChapterName}
                                </Button>
                                &nbsp;/&nbsp;
                                <Button type="link" size="small" href="跳转路径" className="article-list-grey button">
                                    {item.chapterName}
                                </Button>
                                &nbsp; &nbsp; 时间：<span>{item.niceDate}</span>
                            </span>
                        </div>
                    </div>
                    {props.showMore ? <SmallDashOutlined className="article-list-more" /> : ""}
                </List.Item>
            )}
        />
    );
};

ArticleList.propTypes = {
    data: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    loadMoreData: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
};
export default ArticleList;
