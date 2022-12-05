import * as api from '../../api/api';
import "./join.scss";
import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Modal, Layout, message, DatePicker } from "antd";
import moment from 'moment';

const { Content } = Layout;

const Join = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const handleOK = async (value) => {
    const response = await api.Join(value.email, value.secret, value.name, moment(value.birthday).format("YYYY-MM-DD"));

    if (response.resultCode === 0) {
      message.success("가입 성공");
      history.push("/login");
    } else {
      Modal.error({
        title: "가입 실패",
        content: response.data.message,
        onOk: () => {
          form.setFieldsValue({
            email: "",
            secret: "",
          });
        },
      });
    }
  }

  return (
    <Layout className="join-layout">
      <Content>
        <Form className="join-form" form={form} onFinish={handleOK}>
          <div className="logo">
            <img alt="logo" src={"./img/sample-logo@2x.png"} />
          </div>
          <Form.Item
            rules={[{ required: true, message: "이메일을 입력해주세요." }]}
            name="email"
          >
            <Input size="large" placeholder="이메일"></Input>
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
            name="secret"
          >
            <Input type="password" size="large" placeholder="비밀번호"></Input>
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "이름을 입력해주세요." }]}
            name="name"
          >
            <Input size="large" placeholder="이름"></Input>
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "생년월일을 입력해주세요." }]}
            name="birthday"
          >
            <DatePicker size="large" style={{width: "100%"}}></DatePicker>
          </Form.Item>

          <Button
            className="join-form-button"
            size="large"
            type="primary"
            htmlType="submit"
          >
            회원가입
          </Button>

          <Button
            className="back-to-login"
            type="link"
            onClick={() => {
              history.push("/login");
            }}
          >
            로그인 페이지로
          </Button>
        </Form>
      </Content>
    </Layout>
  );
}

export default Join;