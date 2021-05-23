import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Spin, message, Card, Col, Row, List, Divider, Typography, PageHeader, Tabs, Affix } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { endpoint } from "../common/constants/endpoint";

const Details = (props) => {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCard();
  }, []);

  const getCard = async () => {
    const id = props.match.params.id;

    setLoading(true);
    return await axios
      .get(`${endpoint}comics/${id}`)
      .then((result) => {
        const res = result.data;
        if (res.code === 200) {
          setCard(res.data.results[0]);
        } else {
          message.error(res.data.status);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div>
      <Spin style={{ color: "#FFFFFF" }} indicator={<LoadingOutlined />} spinning={loading}>
        <PageHeader onBack={() => window.history.back()} className="site-page-header" title={card && card.title} />
        {card && (
          <Row gutter={16} className="container-internal">
            <Col lg={8} md={8}>

              <Affix offsetTop={10}>
                <Card
                  bordered={false}
                  hoverable
                  cover={
                    <div className="container-cover">
                      <img alt={card.thumbnail.title} src={`${card.thumbnail.path}.${card.thumbnail.extension}`} />
                    </div>
                  }
                >
                  <Card.Meta title={card.title} />
                </Card>
              </Affix>

            </Col>
            <Col lg={16} md={16} >
              {card.description !== null ? (
                <React.Fragment>
                  <Divider orientation="left">Description</Divider>
                  <Typography.Text>{card.description}</Typography.Text>
                </React.Fragment>
              ) :
                (
                  <React.Fragment>
                    <Divider orientation="left">Description</Divider>
                    <Typography.Text>No description....</Typography.Text>
                  </React.Fragment>
                )
              }

              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab={`Series (${card?.series?.name?.split(' (')[0]})`} key="1">
                  <List.Item>
                    <Typography.Text>{card.series.name}</Typography.Text>
                  </List.Item>
                </Tabs.TabPane>

                <Tabs.TabPane tab={`Stories (${card?.stories?.returned})`} key="2">
                  <List
                    dataSource={card?.stories?.items}
                    renderItem={(item) => (
                      <List.Item>
                        <Typography.Text>{item.title}</Typography.Text>
                        <Typography.Text>Type: {item.type}</Typography.Text>
                      </List.Item>
                    )}
                  />
                </Tabs.TabPane>

                <Tabs.TabPane tab={`Comics (${card?.comics?.returned})`} key="3">
                  <List
                    dataSource={card?.comics?.items}
                    renderItem={(item) => (
                      <List.Item>
                        <Typography.Text>{item.title}</Typography.Text>
                      </List.Item>
                    )}
                  />
                </Tabs.TabPane>

              </Tabs>
            </Col>
          </Row>
        )}
      </Spin>
    </div >
  );
};

export default withRouter(Details);
