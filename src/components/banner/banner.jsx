import React, { memo, useEffect, useRef } from "react";
import { Carousel } from "antd";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";

import "./banner.less";

const Banner = props => {
    const carouselRef = useRef();
    useEffect(() => {}, []);

    return (
        <div className="bannerContainer">
            <LeftCircleOutlined
                className="banner-prev"
                onClick={() => {
                    carouselRef.current.next();
                }}
            />
            <Carousel className="banner-main" ref={carouselRef} draggable={true} autoplay effect="fade">
                {props.children}
            </Carousel>
            <RightCircleOutlined
                className="banner-next"
                onClick={() => {
                    carouselRef.current.next();
                }}
            />
        </div>
    );
};

export default memo(Banner);
