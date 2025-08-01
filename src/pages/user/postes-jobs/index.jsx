import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
import toast from "react-hot-toast";
import { deleteJob, getPostedJobsByUserId } from "../../../apis/jobs";
import { Table } from "antd";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

function PostedJobsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const columns = [
    { title: "Title", dataIndex: "title" },
    { title: "Company", dataIndex: "company" },
    { title: "Posted On", dataIndex: "postedOn" },
    { title: "Last Date to Apply", dataIndex: "lastDateToApply" },
    { title: "Status", dataIndex: "status" },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex gap-2">
          <HiOutlineTrash size={22} onClick={() => deleteData(record.id)} />
          <HiOutlinePencil
            size={22}
            onClick={() => navigate(`/posted-jobs/edit/${record.id}`)}
          />
        </div>
      ),
    },
  ];
  const getData = async () => {
    try {
      dispatch(showLoading());
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getPostedJobsByUserId(user.id);
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
  const deleteData = async (jobId) => {
    try {
      dispatch(showLoading());
      const response = await deleteJob(jobId);

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
        <PageTitle>Posted Jobs</PageTitle>
        <button
          className="primary-outlined-btn"
          onClick={() => navigate("/posted-jobs/new")}
        >
          New Job
        </button>
      </div>

      <Table columns={columns} dataSource={data}></Table>
    </div>
  );
}

export default PostedJobsPage;
