import React from "react";
import { Card } from "antd";

import { ToolLost } from "../../assets/tool-list";
import "./tool.less";
const Tool = () => {
    const handleClick = link => {
        return () => {
            window.open(link);
        };
    };
    return (
        <Card className="tool">
            {ToolLost.map(item => {
                return (
                    <Card.Grid className="tool-item" onClick={handleClick(item.link)} key={item.title}>
                        <img src={item.imgUrl} alt="" />
                        <div>
                            <h3>{item.title}</h3>
                            <p>{item.content}</p>
                        </div>
                    </Card.Grid>
                );
            })}
        </Card>
    );
};

export default Tool;
