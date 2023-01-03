import "./Work.scss";
import * as api from '../../api/api';
import React, { useState } from 'react';
import { Card, Layout, Col, Row, Divider, Table, message, Tooltip} from "antd";
import { useEffect } from 'react';
import moment from "moment";

const {Header, Content} = Layout;

const Work = (props) => {
    const columns = [
      {
        title: "이메일",
        dataIndex: "email",
        key: "email",
        width: 30,
        ellipsis: true,
        className: "work-table-column",
        render: (text) => {
          return (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: "이름",
        dataIndex: "name",
        key: "name",
        width: 30,
        ellipsis: true,
        className: "work-table-column",
        render: (text) => {
          return (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: "출근 시간",
        dataIndex: "workStartDate",
        key: "workStartDate",
        width: 30,
        ellipsis: true,
        className: "work-table-column",
        render: (text) => {
          if(text) {
            return (
              <Tooltip placement="topLeft" title={moment(text).format("YYYY년 MM월 DD일 HH시 mm분 ss초")}>
                {moment(text).format("YYYY년 MM월 DD일 HH시 mm분 ss초")}
              </Tooltip>
            );
          }
        },
      },
      {
        title: "퇴근 시간",
        dataIndex: "workEndDate",
        key: "workEndDate",
        width: 30,
        ellipsis: true,
        className: "work-table-column",
        render: (text) => {
          if(text) {
            return (
              <Tooltip placement="topLeft" title={moment(text).format("YYYY년 MM월 DD일 HH시 mm분 ss초")}>
                {moment(text).format("YYYY년 MM월 DD일 HH시 mm분 ss초")}
              </Tooltip>
            );
          }
        },
      },
    ];


    const [workData, setWorkData] = useState(null);

    const getWorkData = async (pageNum) => {
      const response = await api.Work(10, pageNum);

      if(response.resultCode === 0) {
        setWorkData(response.data);
      } else {
        message.error("테이블을 가져오는데 실패했습니다.");
        return;
      }
    }

    useEffect(() => {
      getWorkData(0);
    }, [])

    return (
      <Layout className="work-layout">
        <Content>
          <Row>
            <Col span={24}>
              <Card className="work-card">
                <div className="work-title">근무현황 관리</div>
                <Divider />

                {workData ? (
                  <div className="work-table">
                    <Table
                      dataSource={workData.user}
                      columns={columns}
                      rowKey="email"
                      pagination={{
                        pageSize: 10,
                        total: workData.total,
                        current: workData.pageNum ? (workData.pageNum + 1) : 1,
                        showQuickJumper: false,
                        showSizeChanger: false,
                        onChange: (page) => {
                          getWorkData(page - 1);
                        }
                    }}
                    ></Table>
                  </div>
                ) : null}
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
}

export default Work;