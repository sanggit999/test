import { useState, useEffect, useMemo } from "react";
import { Button, Modal, Table, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { deletePosts, getPosts } from "../../services/post/PostService";
import BaseInput from "../../components/BaseInput";
import BaseButton from "../../components/BaseButton";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const DashboardPage = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const posts = await getPosts();
      setData(posts);
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setIsModalVisible(true);
  };

  const confirmDelete = async () => {
    if (deleteId !== null) {
      try {
        await deletePosts(deleteId);
        setData((prev) => prev.filter((item) => item.id !== deleteId));
        message.success("Xóa thành công!");
      } catch (error) {
        message.error("Xóa thất bại!");
      } finally {
        setIsModalVisible(false);
        setDeleteId(null);
      }
    }
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = useMemo(
    () => [
      {
        title: "User ID",
        dataIndex: "userId",
        key: "userId",
      },
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Body",
        dataIndex: "body",
        key: "body",
      },
      {
        title: "Action",
        key: "action",
        render: (_: any, record: any) => (
          <div className=" flex gap-5">
            <BaseButton
              children="Sửa"
              type="primary"
              htmlType="button"
              onClick={() => {
                navigate(`/edit-post/${record.id}`);
              }}
            />
            <BaseButton
              children="Xoá"
              type="primary"
              htmlType="button"
              onClick={() => handleDelete(record.id)}
              style={{ backgroundColor: "#E4080A" }}
            />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="min-h-screen min-w-screen bg-white">
      <Typography.Title level={1} className="text-center">
        Dashboard
      </Typography.Title>

      <div className=" pl-10 flex gap-5">
        <BaseInput
          placeholder="Tìm kiếm tiêu đề...."
          value={searchText}
          onChange={(value) => setSearchText(value.target.value)}
          className=" max-w-sm min-h-10 "
        />

        <BaseButton
          children="Tạo post"
          type="primary"
          htmlType="button"
          onClick={() => navigate("/create-post")}
        />
      </div>

      <Table
        className="p-2"
        dataSource={filteredData}
        columns={columns}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title="Xác nhận xóa"
        open={isModalVisible}
        onOk={confirmDelete}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Bạn có chắc chắn muốn xóa?</p>
      </Modal>
    </div>
  );
};

export default DashboardPage;
