import React, { useEffect, useState } from "react";
import { Layout, PageHeader } from "antd";
import { useNavigate } from "react-router-dom";
import { getUserCoin, getUserCoinList, getRankCoinList } from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import "./coin.less";

const Coin = () => {
    const navigate = useNavigate();
    const [myCoins, setMyCoins] = useState({});
    const [myList, setMyList] = useState([]);
    const [rankList, setRankList] = useState([]);

    useEffect(() => {
        getUserCoin().then(resp => {
            setMyCoins(resp);
        });
        getMyList();
        getRankList();
    }, []);

    const getMyList = () => {
        getUserCoinList().then(data => {
            const list = [...myList, ...data.datas];
            setMyList(list);
            if (data.total > list.length) {
                getMyList();
            }
        });
    };
    const getRankList = () => {
        getRankCoinList().then(data => {
            console.log(data);
            const list = [...rankList, ...data.datas];
            setRankList(list);
        });
    };

    return (
        <Layout className="coin">
            <PageHeader onBack={() => navigate(-1)} title="我的积分" subTitle="" />
            <div className="coin-body">
                <div className="coin-my">
                    <div>
                        <span>{`昵称：${myCoins.nickname ? myCoins.nickname : myCoins.username} `}</span>
                        <span>{`等级：${myCoins.level}`}</span>
                        <span>{`积分：${myCoins.coinCount} `}</span>
                        <span>{`排名：${myCoins.rank}`}</span>
                    </div>
                    {myList.map((item, index) => {
                        return (
                            <div key={index}>
                                <span>{`时间：${new Date(item.date).Format("yy-MM-dd hh:mm:ss")}`}</span>
                                <span>{`方式：${item.reason} `}</span>
                                <span>{`积分：${item.coinCount}`}</span>
                            </div>
                        );
                    })}
                </div>
                <div className="coin-rank">
                    排行榜：
                    {rankList.map((item, index) => {
                        return (
                            <div key={index}>
                                <span>{item.nickname ? item.nickname : item.username}</span>
                                <span>{`排名：${item.rank}`}</span>
                                <span>{`积分：${item.coinCount}`}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
};

export default Coin;

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        S: this.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, this.getFullYear() + "");
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return fmt;
};
