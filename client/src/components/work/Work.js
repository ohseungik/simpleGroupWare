import "./Work.scss";
import React from 'react';
import { Card, Layout, Col, Row, Button, Input} from "antd";

const {Header, Content} = Layout;

const Work = (props) => {
    return (
      <Layout className="work-layout">
        <Header className="work-header">
          <div>근무현황 관리 (max)</div>
          <div className="work-header-right-content">
            <h3>부서명</h3>
            <Input bordered={false}/>
            <h3>직원명</h3>
            <Input bordered={false}/>
            <h3>정렬</h3>
            <h3>기간</h3>
            <Button type="default">조회</Button>
          </div>
        </Header>
        <Content>
          <Row>
            <Col span={24}>
              <Card className="work-card"></Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
}

export default Work;