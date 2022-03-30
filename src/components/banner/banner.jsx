import React, { useEffect } from "react";
import "./banner.less";

import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const Banner = props => {
    useEffect(() => {
        console.log(props);
        new Swiper(".swiper", {
            loop: true,
            pagination: {
                el: ".swiper-pagination",
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }, [props]);

    return (
        <div className="bannerContainer">
            <div className="swiper" style={{ height: "318px" }}>
                <div className="swiper-wrapper">{props.children}</div>

                <div className="swiper-pagination"></div>

                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </div>
        </div>
    );
};

export const BannerTiem = props => {
    return <div className="swiper-slide">{props.children}</div>;
};

export default Banner;
