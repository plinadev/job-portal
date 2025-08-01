import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { getApplicationsByUserId } from "../../apis/jobs";
import toast from "react-hot-toast";
import PageTitle from "../../components/PageTitle";
import { Table } from "antd";

function AppliedJobs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      dispatch(showLoading());
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getApplicationsByUserId(user.id);
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  const columns = [
    {
      title: "Job",
      dataIndex: "jobTitle",
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Applied On",
      dataIndex: "appliedOn",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle>Applications</PageTitle>
      </div>

      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default AppliedJobs;
