import * as api from '../../api/api';
import "./Login.scss";
import { AppDispatch } from "../../index.js";
import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Modal, Layout, Image } from "antd";

const { Content } = Layout;

const Login = () => {
    const {dispatch} = React.useContext(AppDispatch);
    const history = useHistory();
    const [form] = Form.useForm();

    const handleOK = async (value) => {
        const response = await api.Login(value.email, value.secret);

        if(response.resultCode === 0) {
            dispatch({
                type: 'LOGIN_SUCCESS', 
            });

            history.push("/dashboard");
        } else {
            Modal.error({
                width: "500px",
                title: '로그인 실패',
                content: '아이디 또는 비밀번호를 확인하신 후 다시 시도해주세요.',
                onOk: () => {
                    form.setFieldsValue({
                        email: '',
                        secret: '',
                    })
                }
            });
        }
    }

    return (
      <Layout className="login-layout">
        <Content>
          <Form className="login-form" form={form} onFinish={handleOK}>
            <div className="logo">
              <Image className="logo" src={"./img/sample-logo@2x.png"} preview={false} />
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
            <Button className="login-form-button" size="large" type="primary" htmlType="submit">
              로그인
            </Button>
            <Button
              className='new-user'
              type="link"
              onClick={() => {
                history.push("/join");
              }}
            >
               회원가입
            </Button>
          </Form>
        </Content>
      </Layout>
    );
}

export default Login;