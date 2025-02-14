import { Button, Form, Input, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPosts } from "../../services/post/PostService";
import BaseForm from "../../components/BaseForm";
import FormItem from "antd/es/form/FormItem";
import BaseInput from "../../components/BaseInput";
import BaseButton from "../../components/BaseButton";

const CreatePostPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: {
    id: number;
    title: string;
    body: string;
  }) => {
    setLoading(true);
    try {
      await createPosts(values);
      message.success("Tạo bài viết thành công!");
      navigate("/dashboard");
    } catch (error) {
      message.error("Tạo bài viết thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen p-15 bg-white">
      <Typography.Title level={1} className="text-center">
        Tạo Post
      </Typography.Title>

      <BaseForm layout="vertical" onFinish={onFinish}>
        <FormItem
          label="ID"
          name="id"
          rules={[{ required: true, message: "Vui lòng nhập ID!" }]}
        >
          <BaseInput placeholder="Nhập id" />
        </FormItem>

        <FormItem
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
        >
          <BaseInput placeholder="Nhập tiêu đề" />
        </FormItem>

        <FormItem
          label="ID"
          name="body"
          rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
        >
          <BaseInput placeholder="Nhập nội dung" />
        </FormItem>

        <Form.Item>
          <BaseButton
            children="Tạo"
            type="primary"
            htmlType="submit"
            className="w-50"
            loading={loading}
          />
        </Form.Item>
      </BaseForm>
    </div>
  );
};

export default CreatePostPage;
