import { Modal, Table } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
import toast from "react-hot-toast";
import { changeApplicationStatus } from "../../../apis/jobs";

function AppliedCandidates({
  showAppliedCandidates,
  setShowAppliedCandidates,
  appliedCandidates,
  reloadData,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeStatus = async (applicationData, status) => {
    try {
      dispatch(showLoading());
      const response = await changeApplicationStatus({
        ...applicationData,
        status,
      });
      if (response.success) {
        toast.success(response.message);
        reloadData(applicationData.jobId);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      dispatch(hideLoading);
    }
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "userName",
      render: (text, record) => {
        return (
          <span
            className="underline"
            onClick={() => navigate(`/profile/${record.userId}`)}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div>
            {record.status === "pending" && (
              <>
                <span
                  className="underline"
                  onClick={() => changeStatus(record, "approved")}
                >
                  Approve
                </span>
                <span className="mx-1">|</span>
                <span
                  className="underline "
                  onClick={() => changeStatus(record, "rejected")}
                >
                  Reject
                </span>
              </>
            )}
            {record.status === "approved" && (
              <span
                className="underline "
                onClick={() => changeStatus(record, "rejected")}
              >
                Reject
              </span>
            )}
            {record.status === "rejected" && (
              <span
                className="underline "
                onClick={() => changeStatus(record, "approved")}
              >
                Approve
              </span>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Modal
        title="Applied Candidates"
        visible={showAppliedCandidates}
        onCancel={() => setShowAppliedCandidates(false)}
        footer={null}
        width={1000}
      >
        <Table columns={columns} dataSource={appliedCandidates} rowKey="id" />
      </Modal>
    </div>
  );
}

export default AppliedCandidates;
