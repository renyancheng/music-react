import React from "react";
import { Icon, Typography, Box, Avatar, CssBaseline } from "@mui/material";
import { useRequest } from "ahooks";
import { useSnackbar } from "notistack";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { loginByPhone } from "../../api";
import { userLogin } from "../../redux/actions/auth";
import LoginForm from "../../components/Form/LoginForm";

export const Login = ({ userLogin }) => {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const location = useLocation();

  const { loading, run, runAsync } = useRequest(loginByPhone, { manual: true });

  const onSubmit = async ({ phone, password }) => {
    const result = await runAsync(phone, password);
    let variant;
    if (result.code === 200) {
      variant = "success";
      result.msg = "登录成功";
      userLogin(result);
      setTimeout(() => {
        navigate(location.state.from || "/", { replace: true });
      }, 1000);
    } else {
      variant = "error";
    }
    enqueueSnackbar(result.msg || "登录失败（未知错误）", { variant });
  };
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main", width: 50, height: 50 }}>
          <Icon>lock_outline</Icon>
        </Avatar>
        <Typography component="h1" variant="h5">
          登录
        </Typography>
        <LoginForm onSubmit={onSubmit} loading={loading} />
      </Box>
    </>
  );
};

export default connect((state) => ({}), {
  userLogin,
})(Login);
