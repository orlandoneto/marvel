import React from "react";

import { Link } from "react-router-dom";
import { Card as CardAnt } from "antd";

const Card = (props) => {
  const { item } = props;
  return (
    <Link id={`card_${item.id}`} to={`/card/${item.id}`}>
      <CardAnt
        bordered={false}
        hoverable
        cover={
          <div className="container-cover">
            <img alt={item.title} src={`${item.thumbnail.path}.${item.thumbnail.extension}`} />
          </div>
        }
      >

        <p className="size-title">{item.title}</p>
        <p className="size-date">Onsale Date: {item.dates[0].date.split('T')[0]}</p>

      </CardAnt>
    </Link>
  );
};

export default Card;
