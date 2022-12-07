import "./DashBoard.scss";
import React from 'react';
import { Card, Layout, Col, Row } from "antd";

const Content = Layout.Content;

const DashBoard = (props) => {
    return (
      <Layout className="dashboard-layout">
        <Content>
            <Row>
                <Col span={10}>
                    <Card className="work-card">
                    </Card>
                </Col>
            </Row>
        </Content>
      </Layout>
    );
}

export default DashBoard;