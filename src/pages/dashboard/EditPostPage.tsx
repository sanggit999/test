import { Button, Form, Input, message, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { getPostById, putPosts } from "../../services/post/PostService";
import BaseForm from "../../components/BaseForm";
import BaseInput from "../../components/BaseInput";
import BaseButton from "../../components/BaseButton";
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
    <div className="min-h-screen min-w-screen p-15 bg-white">
      <Typography.Title level={1} className="text-center">
        Chỉnh sửa Post
      </Typography.Title>

      <BaseForm form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="id" label="Id">
          <Typography.Text>{id}</Typography.Text>
        </Form.Item>
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
        >
          <BaseInput />
        </Form.Item>
        <Form.Item
          name="body"
          label="Nội dung"
          rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
        >
          <BaseInput type="textarea" />
        </Form.Item>

        <div className="flex gap-5">
          <Form.Item>
            <BaseButton
              children="Cập nhật"
              type="primary"
              htmlType="button"
              onClick={() => navigate("/dashboard")}
              loading={loading}
            />
          </Form.Item>

          <BaseButton
            children="Huỷ"
            type="dashed"
            htmlType="button"
            onClick={() => navigate("/dashboard")}
          />
        </div>
      </BaseForm>
    </div>
  );
};

export default EditPostPage;
