import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Table } from "antd";
import { HiOutlineTrash } from "react-icons/hi";
import PageTitle from "../../components/PageTitle";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { editJobDetails } from "../../apis/jobs";
import {
  getAllUsers,
  updateUserProfile,
  updateUserProfileStatus,
} from "../../apis/users";

function AllUsersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const columns = [
    { title: "User ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Status", dataIndex: "status" },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex gap-2 align-items-center">
          {record.status === "approved" && (
            <span
              className="underline"
              onClick={() => changeStatus(record.id, "rejected")}
            >
              Reject
            </span>
          )}
          {record.status === "rejected" && (
            <span
              className="underline"
              onClick={() => changeStatus(record.id, "approved")}
            >
              Approve
            </span>
          )}
          {record.status === "pending" && (
            <>
              <span
                className="underline"
                onClick={() => changeStatus(record.id, "approved")}
              >
                Approve
              </span>
              <span>|</span>
              <span
                className="underline"
                onClick={() => changeStatus(record.id, "rejected")}
              >
                Reject
              </span>
            </>
          )}
        </div>
      ),
    },
  ];

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllUsers();
      if (!response.success) {
        toast.error(response.message);
      } else {
        setData(response.data);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
  const changeStatus = async (id, status) => {
    try {
      dispatch(showLoading());
      const response = await updateUserProfileStatus(id, status);

      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        getData();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle>Users</PageTitle>
      </div>

      <Table columns={columns} dataSource={data}></Table>
    </div>
  );
}

export default AllUsersPage;
