import { Button, Form, Input, message, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../dashboard/EditPost.module.css";
import { useEffect, useState } from "react";
import { getPostById, putPosts } from "../../services/post/postService";
const EditPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPostData = async (postId: number) => {
    try {
      setLoading(true);
      const post = await getPostById(postId);
      form.setFieldsValue({
        title: post.title,
        body: post.body,
      });
    } catch (error) {
      message.error("Không thể tải dữ liệu bài viết");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPostData(parseInt(id));
    }
  }, [id]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await putPosts(parseInt(id as string), values);
      message.success("Cập nhật bài viết thành công!");
      navigate("/dashboard");
    } catch (error) {
      message.error("Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["container"]}>
      <h2 style={{ color: "#000000" }}>Chỉnh sửa bài viết</h2>

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="id" label="Id">
          <Typography.Text>{id}</Typography.Text>
        </Form.Item>
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="body"
          label="Nội dung"
          rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Cập nhật
        </Button>

        <Button onClick={() => navigate("/dashboard")}>Hủy</Button>
      </Form>
    </div>
  );
};

export default EditPostPage;
