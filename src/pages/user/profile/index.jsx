import PageTitle from "../../../components/PageTitle";
import { Form, Tabs } from "antd";
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import Experience from "./Experience";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
import { getUserProfileData, updateUserProfile } from "../../../apis/users";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const { TabPane } = Tabs;

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const params = useParams();
  const userId = params.id;
  const navigate = useNavigate();
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getUserProfileData(userId);

      if (response.success) {
        setUserData(response.data);
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
    getData();
  }, []);
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await updateUserProfile(values);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
  return (
    <div>
      <PageTitle>Profile</PageTitle>
      {userData && (
        <Form layout="vertical" onFinish={onFinish} initialValues={userData}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Personal Information" key="1">
              <PersonalInfo />
            </TabPane>
            <TabPane tab="Education" key="2">
              <Education />
            </TabPane>
            <TabPane tab="Experience" key="3">
              <Experience />
            </TabPane>
          </Tabs>
          <div className="d-flex justify-content-end gap-3">
            <button
              className="primary-outlined-btn"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            {userId === user.id && (
              <button className="primary-contained-btn" type="submit">
                Save
              </button>
            )}
          </div>
        </Form>
      )}
    </div>
  );
}

export default Profile;
