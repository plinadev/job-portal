import { Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../apis/authentication";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await loginUser(values);
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <div className="h-screen d-flex justify-content-center align-items-center bg-primary">
      <div className="bg-white p-4 w-400">
        <h4>JOB PORTAL - LOGIN</h4>
        <div className="divider"></div>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email">
            <input type="text" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <input type="password" />
          </Form.Item>
          <button className="primary-contained-btn w-100 mt-3" type="submit">
            Login
          </button>
          <Link to="/register" className="d-block mt-2">
            Not a member? Click here to register
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
