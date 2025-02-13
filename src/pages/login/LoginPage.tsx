import { Form, Input, Button, Card, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const usernameRules = [
    { required: true, message: "Vui lòng nhập tên đăng nhập!" },
    { pattern: /^[^\s]+$/, message: "Tên đăng nhập không được chứa dấu cách!" },
  ];

  const passwordRules = [
    {
      required: true,
      pattern: /^[a-zA-Z0-9!@#$%^&*()_+\-=<>?/]+$/,
      message: "Mật khẩu chỉ được chứa ký tự hợp lệ!",
    },
  ];
  const onFinish = (values: any) => {
    console.log("Received values: ", values);
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className={styles["container"]}>
      <Card className={styles["login-card"]}>
        <Typography.Title level={1} className={styles["login-title"]}>
          Đăng nhập
        </Typography.Title>
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          className={styles["login-form"]}
        >
          <Form.Item
            className={styles["ant-form-item"]}
            name="username"
            label="Tài khoản"
            rules={usernameRules}
          >
            <Input
              className={styles["ant-input"]}
              prefix={<UserOutlined />}
              placeholder="Nhập tài khoản"
            />
          </Form.Item>

          <Form.Item
            className={styles["ant-form-item"]}
            name="password"
            label="Mật khẩu"
            rules={passwordRules}
          >
            <Input.Password
              className={styles["ant-input"]}
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>

          <Form.Item className={styles["ant-form-item"]}>
            <Button
              type="primary"
              htmlType="submit"
              block
              className={styles["ant-btn"]}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
