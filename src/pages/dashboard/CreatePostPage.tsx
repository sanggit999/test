import { Button, Form, Input, message } from "antd";
import styles from "../dashboard/EditPost.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPosts } from "../../services/post/postService";

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
    <div className={styles["container"]}>
      <h2 style={{ color: "#000000" }}>Tạo Bài Viết Mới</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="ID"
          name="id"
          rules={[{ required: true, message: "Vui lòng nhập ID!" }]}
        >
          <Input type="number" placeholder="Nhập ID" />
        </Form.Item>

        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
        >
          <Input placeholder="Nhập tiêu đề" />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          name="body"
          rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
        >
          <Input.TextArea rows={4} placeholder="Nhập nội dung" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo bài viết
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatePostPage;
