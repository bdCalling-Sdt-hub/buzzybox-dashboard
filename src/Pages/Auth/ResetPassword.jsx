import { Button, Form, Input, ConfigProvider } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/apiSlices/authSlice";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const token = new URLSearchParams(location.search).get("auth");
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();

  const onFinish = async (values) => {
    toast.loading("Updating password...", { id: "updatePasswordToast" });
    try {
      const response = await resetPassword({ payload: values, token }).unwrap();
      if (response.success) {
        toast.success(response.message || "Password reseted successfully", {
          id: "updatePasswordToast",
        });
        navigate("/auth/login");
      }
    } catch (error) {
      toast.error(error.data.message || "Failed to update", {
        id: "updatePasswordToast",
      });
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-[25px] font-semibold mb-6">Reset Password</h1>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Form: {
              labelColor: "black",
            },
          },
        }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="newPassword"
            label={
              <p
                style={{
                  display: "block",
                }}
                htmlFor="email"
                className="text-base font-normal text-black"
              >
                New Password
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please input your new Password!",
              },
            ]}
            style={{ marginBottom: 0 }}
          >
            <Input.Password
              type="password"
              placeholder="Enter New password"
              style={{
                border: "1px solid #E0E4EC",
                height: "52px",
                background: "white",
                borderRadius: "8px",

                outline: "none",
              }}
              className="mb-6"
            />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: 0 }}
            label={
              <p
                style={{
                  display: "block",
                }}
                htmlFor="email"
                className="text-base text-black font-normal"
              >
                Confirm Password
              </p>
            }
            name="confirmPassword"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Enter Confirm password"
              style={{
                border: "1px solid #E0E4EC",
                height: "52px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
              }}
              className="mb-6"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              htmlType="submit"
              style={{
                width: "100%",
                height: 45,
                color: "white",
                fontWeight: "400px",
                fontSize: "18px",
                border: "1px solid #ffc301",
                background: "#ffc301 ",
                marginTop: 20,
              }}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default ResetPassword;
