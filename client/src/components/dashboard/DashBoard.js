import * as api from '../../api/api';
import "./DashBoard.scss";
import { AppDispatch } from "../../index.js";
import React from 'react';
import { Card, Layout, Col, Row, Divider, Button, message } from "antd";
import moment from "moment";
import { useEffect } from 'react';

const Content = Layout.Content;

const DashBoard = (props) => {
    const {globalState, dispatch} = React.useContext(AppDispatch);
    const [disabledStartWork, setDisabledStartWork] = React.useState(false);
    const [disabledEndWork, setDisabledEndWork] = React.useState(false);

    const workStart = async () => {
      let nowDate = moment().format('YYYY-MM-DD');

      if(globalState.workStartDate !== "" && moment(globalState.workStartDate).format('YYYY-MM-DD') === nowDate) {
        message.error("오늘은 출근을 이미 하셨습니다.");
        return;
      }

      const response = await api.WorkStart(globalState.audit.login_user_email);

      if(response.resultCode === 0) {
        message.success("출근 성공.");
        setDisabledStartWork(true);
        setDisabledEndWork(false);
        dispatch({type: "WORK_START", payload: response.data.workStartDate});
      } else {
        message.error("출근할 때 오류가 발생했습니다.");
        return;
      }
    }

    const workEnd = async () => {
      let nowDate = moment().format('YYYY-MM-DD');

      if(globalState.workEndDate && moment(globalState.workEndDate).format('YYYY-MM-DD') === nowDate) {
        message.error("오늘은 퇴근을 이미 하셨습니다.");
        return;
      }
      
      const response = await api.WorkEnd(globalState.audit.login_user_email);

      if(response.resultCode === 0) {
        message.success("퇴근 성공.");
        dispatch({type: "WORK_END", payload: response.data.workEndDate});
      } else {
        message.error("퇴근할 때 오류가 발생했습니다.");
        return;
      }
    }

    const getWorkTime = async () => {
      const response = await api.WorkOne(globalState.audit.login_user_email);

      if(response.resultCode === 0) {
        dispatch({type: "WORKS_DATA", payload: {workStartDate: response.data.workStartDate, workEndDate: response.data.workEndDate}});
        
        if(response.data.workStartDate === "") {
          setDisabledEndWork(true);
        }
        

      } else {
        message.error("근무현황을 가져오는데 오류가 발생했습니다.");
        return;
      }
    }

    useEffect(() => {
      getWorkTime();
      return () => {
        
      };
    }, []);

    return (
      <Layout className="dashboard-layout">
        <Content>
            <Row>
                <Col>
                    <Card className="dashboard-card">
                      <div className="dashboard-title">근무현황 관리</div>
                      <Divider />
                      <div className="dashboard-flex">
                        <Button size="large" onClick={workStart} disabled={disabledStartWork}>출근하기</Button>
                        <Button size="large" onClick={workEnd} disabled={disabledEndWork}>퇴근하기</Button>
                      </div>
                    </Card>
                </Col>
            </Row>  
        </Content>
      </Layout>
    );
}

export default DashBoard;