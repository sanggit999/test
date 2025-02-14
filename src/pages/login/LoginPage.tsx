import { Form, Input, Button, Card, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import BaseForm from "../../components/BaseForm";
import BaseInput from "../../components/BaseInput";
import BaseButton from "../../components/BaseButton";
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
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-white">
      <Card className="w-full max-w-sm p-6 shadow-lg">
        <Typography.Title level={1} className="text-center">
          Đăng nhập
        </Typography.Title>
        <BaseForm onFinish={onFinish}>
          <Form.Item name="username" label="Tài khoản" rules={usernameRules}>
            <BaseInput prefix={<UserOutlined />} placeholder="Nhập tài khoản" />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu" rules={passwordRules}>
            <BaseInput
              prefix={<LockOutlined />}
              placeholder="Nhập tài khoản"
              type="password"
            />
          </Form.Item>

          <Form.Item>
            <BaseButton
              children="Đăng nhập"
              type="primary"
              htmlType="submit"
              onClick={() => navigate("/dashboard")}
              className="w-full"
            />
          </Form.Item>
        </BaseForm>
      </Card>
    </div>
  );
};

export default LoginPage;
