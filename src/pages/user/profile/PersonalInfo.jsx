import { Col, Form, Row } from "antd";

function PersonalInfo() {
  return (
    <Row gutter={[10, 10]}>
      <Col span={8}>
        <Form.Item label="First Name" name="firstName">
          <input type="text" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Last Name" name="lastName">
          <input type="text" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Email" name="email">
          <input type="email" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Phone Number" name="phoneNumber">
          <input type="tel" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Portfolio" name="portfolio">
          <input type="text" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Career Objective" name="careerObjective">
          <textarea type="text" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Address" name="address">
          <textarea type="text" />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default PersonalInfo;
