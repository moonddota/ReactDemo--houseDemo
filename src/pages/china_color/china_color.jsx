import React, { useState, useEffect } from "react";
import { Layout, List, Progress } from "antd";
import { getChinaColor } from "../../api";
import "./china_color.less";

function ChinaColor() {
    const [colorList, setColorList] = useState([]);
    const [item, setItem] = useState({});
    const [height, setHeight] = useState(0);
    useEffect(() => {
        getChinaColor().then(res => {
            setColorList(res);
            setItem(res[0]);
            console.log(res[0]);
        });

        // const y = window.innerHeight;
        // const menu: any = document.getElementById("header");
        // const a = y - menu.clientHeight + "px";
        // setHeight(a);
    }, []);

    const itemClicl = item => {
        return () => {
            setItem(item);
        };
    };

    const plusRGB = RGB => {
        return RGB[0] + "," + RGB[1] + "," + RGB[2];
    };

    const judgeLightOrDark = RGB => {
        if (!RGB) return false;
        const g = RGB[0] * 0.299 + RGB[1] * 0.587 + RGB[2] * 0.114;
        // 浅色模式
        return g >= 192;
    };
    const getProgressColor = (CMYK, index) => {
        if (CMYK) {
            return CMYK[index];
        } else {
            return 0;
        }
    };
    const getRGBNum = (rgb, index) => {
        if (rgb) {
            return "   " + rgb[index];
        } else {
            return "";
        }
    };

    return (
        <Layout.Content className="layout" style={{ backgroundColor: item.hex }}>
            <List
                className="list"
                grid={{ column: 7 }}
                split={false}
                itemLayout="horizontal"
                dataSource={colorList}
                renderItem={item => (
                    <div className="card" style={{ backgroundColor: item.hex }} onClick={itemClicl(item)}>
                        <div className="card-text-div">
                            <p className="p1" style={{ color: judgeLightOrDark(item.RGB) ? "black" : "white" }}>
                                {item.hex.replace("#", "")}
                            </p>
                            <div className="d1" style={{ backgroundColor: judgeLightOrDark(item.RGB) ? "black" : "white" }} />
                            <div className="d2" style={{ backgroundColor: judgeLightOrDark(item.RGB) ? "black" : "white" }} />
                            <div className="d3" style={{ backgroundColor: judgeLightOrDark(item.RGB) ? "black" : "white" }} />
                            <p className="p2" style={{ color: judgeLightOrDark(item.RGB) ? "black" : "white" }}>
                                {plusRGB(item.RGB)}
                            </p>
                        </div>
                        <p className="card-name" style={{ color: judgeLightOrDark(item.RGB) ? "black" : "white" }}>
                            {item.name}
                        </p>
                    </div>
                )}
            />

            <div className="div-middle">
                C{"：" + getProgressColor(item.CMYK, 0)}
                <Progress
                    type="circle"
                    width={60}
                    strokeColor="#0093D3"
                    trailColor="transparent"
                    percent={getProgressColor(item.CMYK, 0)}
                    format={percent => `${percent} `}
                    style={{ color: "white" }}
                />
                M {"：" + getProgressColor(item.CMYK, 1)}
                <Progress
                    type="circle"
                    width={60}
                    strokeColor="#CC006B"
                    trailColor="transparent"
                    percent={getProgressColor(item.CMYK, 1)}
                    format={percent => `${percent} `}
                    style={{ color: "white" }}
                />
                Y {"：" + getProgressColor(item.CMYK, 2)}
                <Progress
                    type="circle"
                    width={60}
                    strokeColor="#FFF10C"
                    trailColor="transparent"
                    percent={getProgressColor(item.CMYK, 2)}
                    format={percent => `${percent} `}
                    style={{ color: "white" }}
                />
                K {"：" + getProgressColor(item.CMYK, 3)}
                <Progress
                    type="circle"
                    width={60}
                    strokeColor="white"
                    trailColor="transparent"
                    percent={getProgressColor(item.CMYK, 3)}
                    format={percent => `${percent} `}
                    style={{ color: "white" }}
                />
                R<p style={{ color: "white" }}>{getRGBNum(item.RGB, 0)}</p>G<p style={{ color: "white" }}>{getRGBNum(item.RGB, 1)}</p>B
                <p style={{ color: "white" }}>{getRGBNum(item.RGB, 2)}</p>
            </div>

            <div className="div-title">
                <p className="title" style={{ color: judgeLightOrDark(item.RGB) ? "black" : "white" }}>
                    {item.name}
                </p>
                <p className="pinyin" style={{ color: judgeLightOrDark(item.RGB) ? "black" : "white" }}>
                    {item.pinyin}
                </p>
            </div>
            <p className="china" style={{ color: judgeLightOrDark(item.RGB) ? "black" : "white" }}>
                CHINESE COLORS
            </p>
        </Layout.Content>
    );
}

export default ChinaColor;
