import React, { useState, useEffect, useLayoutEffect } from "react";
import { Layout, Typography, Button, List, Image, Tabs } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Player } from "video-react";
import "../../../node_modules/video-react/dist/video-react.css";
import { getWwallpaperMenu, getWallpaperVideo } from "../../api";
import "./entertainment.less";

const { Content, Sider } = Layout;
const Entertainment = () => {
    const [pages, setPages] = useState([{ name: "动态壁纸" }, { name: "Wallhaven壁纸" }]);
    const [tabList, setTabList] = useState([
        { name: "热门", sorting: "toplist", id: "" },
        { name: "蜘蛛侠", sorting: "random", id: "id:2319" },
        { name: "动漫女孩", sorting: "random", id: "id:5" },
        { name: "极简主义", sorting: "random", id: "id:2278" },
        { name: "日漫", sorting: "random", id: "id:1" },
        { name: "吉卜力工作室", sorting: "random", id: "id:1748" },
        { name: "火影忍者", sorting: "random", id: "id:78174" },
        { name: "赛博朋克", sorting: "random", id: "id:376" },
        { name: "像素艺术", sorting: "random", id: "id:2321" },
        { name: "Artwork", sorting: "random", id: "id:323" },
        { name: "Cityscape", sorting: "random", id: "id:479" },
        { name: "Digital Art", sorting: "random", id: "id:13" },
        { name: "Fantasy Art", sorting: "random", id: "id:853" },
        { name: "Final Fantasy", sorting: "random", id: "id:997" },
        { name: "科幻", sorting: "random", id: "id:14" },
        { name: "角色扮演", sorting: "random", id: "id:12757" },
        { name: "图案", sorting: "random", id: "id:869" },
        { name: "风景", sorting: "random", id: "id:711" },
        { name: "自然", sorting: "random", id: "id:37" },
        { name: "4K", sorting: "random", id: "id:65348" },
    ]);

    const [page, setPage] = useState("动态壁纸");
    const [tabName, setTabName] = useState("热门");
    const [pageName, setPageNume] = useState(1);
    const [imageList, setImageList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [imgCurrent, setImgCurrent] = useState(0);
    const [videoList, setVideoList] = useState([]);

    useEffect(() => {
        getImages(1, "toplist", "");
    }, []);

    const getImages = (page, sorting, id, isMore = false) => {
        getWwallpaperMenu(page, sorting, id).then(res => {
            console.log(res);
            setPageNume(page + 1);
            if (isMore) {
                setImageList([...imageList, ...res]);
            } else {
                setImageList(res);
            }
        });
    };
    const tabClick = item => {
        return () => {
            window.scroll(0, 0);
            setTabName(item.name);
            setPageNume(1);
            setImageList([]);
            getImages(1, item.sorting, item.id);
        };
    };

    const loadMore = () => {
        const item = tabList.find(item => {
            return item.name === tabName;
        });
        getImages(pageName, item.sorting, item.id, true);
    };

    return (
        <Layout className="entertainment">
            <Typography.Title level={4} className="entertainment-sider-title">
                壁纸库
            </Typography.Title>
            <Tabs
                className="header-tab"
                defaultActiveKey={page}
                onChange={key => {
                    if (key === page) return;
                    setPage(key);
                }}
            >
                {pages.map(item => {
                    return <Tabs.TabPane tab={item.name} key={item.name} />;
                })}
            </Tabs>

            {page === "动态壁纸" ? (
                <VideoList />
            ) : (
                <Layout>
                    <Sider className="entertainment-sider">
                        {tabList.map(item => {
                            return (
                                <div key={item.name}>
                                    <Button
                                        className="entertainment-sider-buttomn"
                                        style={item.name === tabName ? { color: "rgb(27, 138, 97)" } : { color: "#333" }}
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
                            grid={{ gutter: 16, column: 3 }}
                            dataSource={imageList}
                            loadMore={
                                <Button type="primary" onClick={loadMore}>
                                    加载更多
                                </Button>
                            }
                            renderItem={(item, index) => (
                                <List.Item>
                                    <ImageView
                                        item={item}
                                        onClick={() => {
                                            setVisible(true);
                                            setImgCurrent(index);
                                        }}
                                    />
                                </List.Item>
                            )}
                        />
                        <div style={{ display: "none" }}>
                            <Image.PreviewGroup preview={{ current: imgCurrent, visible, onVisibleChange: vis => setVisible(vis) }}>
                                {imageList.map(item => {
                                    return <Image key={item.id} src={item.path} />;
                                })}
                            </Image.PreviewGroup>
                        </div>
                    </Content>
                </Layout>
            )}
        </Layout>
    );
};

const ImageView = props => {
    const [visible, setVisible] = useState(false);
    return (
        <div
            className="imageview"
            onMouseEnter={e => {
                setVisible(true);
            }}
            onMouseLeave={e => {
                setVisible(false);
            }}
        >
            <Image
                preview={{ visible: false }}
                width={300}
                height={200}
                src={props.item.thumbs.small}
                onClick={() => {
                    props.onClick();
                }}
            />
            {visible ? (
                <div className="imageview-icon">
                    <CheckCircleOutlined
                        onClick={() => {
                            console.log("111");
                            downloadWithBlob(props.item.path);
                        }}
                    />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};
function downloadWithBlob(path) {
    fetch(path).then(res =>
        res.blob().then(blob => {
            const name = path.split("/").pop();
            var a = document.createElement("a");
            var url = window.URL.createObjectURL(blob);
            var filename = name;
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
        })
    );
}

const VideoList = () => {
    const [visible, setVisible] = useState(false);
    const [item, setItem] = useState();

    return (
        <div className="entertainment-videolist">
            <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={videos}
                renderItem={item => (
                    <List.Item>
                        <img
                            src={item.thumb}
                            onClick={e => {
                                setVisible(true);
                                setItem(item);
                                console.log(e);
                            }}
                            alt=""
                        />
                    </List.Item>
                )}
            />
            {visible ? (
                <div className="entertainment-videolist-video">
                    <Player className="entertainment-videolist-player" playsInline poster={item.thumb} src={item.src} />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Entertainment;
const videos = [
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/00.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/00.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/01.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/01.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/02.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/02.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/03.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/03.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/04.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/04.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/05.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/05.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/06.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/06.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/07.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/07.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/08.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/08.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/09.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/09.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/10.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/10.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/11.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/11.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/12.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/12.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/13.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/13.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/14.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/14.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/15.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/15.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/16.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/16.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/17.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/17.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/18.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/18.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/19.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/19.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/20.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/20.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/21.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/21.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/22.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/22.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/23.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/23.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/24.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/24.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/25.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/25.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/26.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/26.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/27.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/27.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/28.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/28.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/29.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/29.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/30.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/30.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/31.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/31.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/32.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/32.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/33.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/33.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/34.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/34.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/35.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/35.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/36.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/36.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/37.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/37.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/38.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/38.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/39.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/39.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/40.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/40.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/41.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/41.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/42.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/42.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/43.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/43.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/44.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/44.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/45.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/45.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/46.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/46.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/47.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/47.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/48.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/48.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/49.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/49.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/50.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/50.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/51.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/51.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/52.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/52.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/53.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/53.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/54.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/54.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/55.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/55.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/56.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/56.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/57.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/57.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/58.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/58.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/59.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/59.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/60.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/60.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/61.mp4",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/61.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/v-0.webm",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/v-0.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/v-1.webm",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/v-1.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/v-2.webm",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/v-2.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/v-3.webm",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/v-3.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/v-4.webm",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/v-4.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/v-5.webm",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/v-5.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/v-6.webm",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/v-6.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/v-7.webm",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/v-7.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/v-8.webm",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/v-8.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/v-9.webm",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/v-9.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/v-10.webm",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/v-10.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/v-11.webm",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/v-11.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/v-12.webm",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/v-12.jpg",
    },
    {
        src: "https://itab.s3.ladydaily.com/files/itab/videos/v-13.webm",
        thumb: "https://itab.s3.ladydaily.com/files/itab/videos/v-13.jpg",
    },
];
