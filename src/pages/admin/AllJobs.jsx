import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Table } from "antd";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import PageTitle from "../../components/PageTitle";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { deleteJob, editJobDetails, getAllJobs } from "../../apis/jobs";

function AllJobsPage() {
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
        <div className="d-flex gap-2 align-items-center">
          <HiOutlineTrash size={22} onClick={() => deleteData(record.id)} />
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
      const response = await getAllJobs();
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

  const changeStatus = async (id, status) => {
    try {
      dispatch(showLoading());
      const response = await editJobDetails({ id, status });

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
        <PageTitle>Jobs</PageTitle>
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

export default AllJobsPage;
