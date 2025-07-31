import { Form } from "antd";
import { Link } from "react-router-dom";
import { registerUser } from "../apis/authentication";
import toast from "react-hot-toast";

function Register() {
  const onFinish = async (values) => {
    try {
      const response = await registerUser(values);
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-screen d-flex justify-content-center align-items-center bg-primary">
      <div className="bg-white p-4 w-400">
        <h4>JOB PORTAL - REGISTER</h4>
        <div className="divider"></div>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Name">
            <input type="text" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <input type="text" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <input type="password" />
          </Form.Item>
          <button className="primary-contained-btn w-100 mt-3" type="submit">
            Register
          </button>
          <Link to="/login" className="d-block mt-2">
            Already have an account? Click here to login
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
