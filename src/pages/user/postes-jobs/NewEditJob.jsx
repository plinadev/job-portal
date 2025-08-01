import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import { Col, Form, Row } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
import toast from "react-hot-toast";
import { editJobDetails, getJobById, postNewJob } from "../../../apis/jobs";
import { useEffect, useState } from "react";

function NewEditJob() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getJobById(params.id);

      if (response.success) {
        setJobData(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    if (params.id) {
      getData();
    } else {
      setJobData({});
    }
  }, []);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let response = null;
      if (params.id) {
        response = await editJobDetails({
          ...values,
          id: params.id,
        });
        if (response.success) {
          toast.success(response.message);
          navigate("/posted-jobs");
        } else {
          toast.error(response.message);
        }
      } else {
        response = await postNewJob(values);
        if (response.success) {
          toast.success(response.message);
          navigate("/posted-jobs");
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <div>
      <PageTitle>{params.id ? "Edit Job" : "Post New Job"}</PageTitle>
      {jobData && (
        <Form layout="vertical" onFinish={onFinish} initialValues={jobData}>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <Form.Item
                label="Job Title"
                name="title"
                rules={[{ required: true, message: "required" }]}
              >
                <input type="text" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Industry"
                name="industry"
                rules={[{ required: true, message: "required" }]}
              >
                <select name="" id="">
                  <option value="">Select</option>
                  <option value="it">IT</option>
                  <option value="finaince">Finance</option>
                  <option value="marketing">Marketing</option>
                  <option value="realEstate">Real Estates</option>
                </select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: "required" }]}
              >
                <select name="" id="">
                  <option value="">Select</option>
                  <option value="ukraine">Ukraine</option>
                  <option value="usa">USA</option>
                  <option value="uk">UK</option>
                </select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Company Name"
                name="company"
                rules={[{ required: true, message: "required" }]}
              >
                <input type="text" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Salary"
                name="salary"
                rules={[{ required: true, message: "required" }]}
              >
                <input type="text" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Job Type"
                name="jobType"
                rules={[{ required: true, message: "required" }]}
              >
                <select name="" id="">
                  <option value="">Select</option>
                  <option value="fullTime">Full Time</option>
                  <option value="partTime">Part Time</option>
                </select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Last Date To Apply"
                name="lastDateToApply"
                rules={[{ required: true, message: "required" }]}
              >
                <input type="date" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Experience"
                name="experience"
                rules={[{ required: true, message: "required" }]}
              >
                <input type="text" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Notice Period"
                name="noticePeriod"
                rules={[{ required: true, message: "required" }]}
              >
                <input type="text" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Job Description"
                name="jobDescription"
                rules={[{ required: true, message: "required" }]}
              >
                <textarea type="text" />
              </Form.Item>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-3">
            <button
              className="primary-outlined-btn"
              onClick={() => navigate("/posted-jobs")}
              type="button"
            >
              Cancel
            </button>
            <button className="primary-contained-btn" type="submit">
              Save
            </button>
          </div>
        </Form>
      )}
    </div>
  );
}

export default NewEditJob;
