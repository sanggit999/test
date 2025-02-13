import { useState, useEffect, useMemo } from "react";
import { Button, Input, Modal, Table, Typography, message } from "antd";
import styles from "./Dashboard.module.css";
import { deletePosts, getPosts } from "../../services/post/postService";
import { useNavigate } from "react-router-dom";

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
          <>
            <Button
              onClick={() => {
                navigate(`/edit-post/${record.id}`);
              }}
              type="link"
            >
              Sửa
            </Button>
            <Button onClick={() => handleDelete(record.id)} type="link" danger>
              Xóa
            </Button>
          </>
        ),
      },
    ],
    []
  );

  return (
    <div className={styles["container"]}>
      <Typography.Title level={1}>Dashboard</Typography.Title>
      <Input
        placeholder="Tìm kiếm tiêu đề...."
        value={searchText}
        onChange={(value) => setSearchText(value.target.value)}
        style={{ width: 300, marginBottom: 20 }}
      />

      <Button
        type="primary"
        onClick={() => navigate("/create-post")}
        style={{ marginBottom: 16, marginLeft: 16 }}
      >
        Tạo Post
      </Button>

      <Table
        className={styles["custom-table"]}
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
