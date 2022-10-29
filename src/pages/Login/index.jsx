import React, { useState, useEffect } from "react";
import {
  Icon,
  Typography,
  Box,
  Avatar,
  CssBaseline,
  Card,
  CardContent,
  Button,
  CircularProgress,
  CardActions,
  Tab,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { QRCode } from "react-qrcode";
import { useRequest } from "ahooks";
import { useSnackbar } from "notistack";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  loginByPhone,
  getQrKey,
  createQr,
  checkQr,
  getUserAccount,
} from "../../api";
import { userLogin } from "../../redux/actions/auth";
import LoginForm from "../../components/Form/LoginForm";

export const Login = ({ userLogin }) => {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const location = useLocation();

  // console.log(location)

  const { loading, run, runAsync } = useRequest(loginByPhone, { manual: true });

  const {
    data: qrKey,
    loading: loadingQrKey,
    runAsync: runAsyncGetQrKey,
    refreshAsync: refreshAsyncGetQrKey,
  } = useRequest(getQrKey, {
    manual: true,
  });

  /* const {
    loading: loadingCreateQr,
    runAsync: runAsyncCreateQr,
  } = useRequest(createQr, {
    manual: true,
  });
 */
  const { loading: loadingCheckQr, runAsync: runAsyncCheckQr } = useRequest(
    checkQr,
    {
      manual: true,
    }
  );

  const {
    data: userAccount,
    loading: loadingUserAccount,
    runAsync: runAsyncGetUserAccount,
  } = useRequest(getUserAccount, {
    manual: true,
  });
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(async () => {
    const result = await runAsyncGetQrKey();
  }, []);

  const checkLoginStatus = async () => {
    const result = await runAsyncCheckQr(qrKey.data.unikey);
    switch (result.code) {
      case 800:
        enqueueSnackbar(result.message, { variant: "error" });
        break;
      case 801:
        enqueueSnackbar(result.message, { variant: "info" });
        break;
      case 802:
        enqueueSnackbar(result.message, { variant: "info" });
        break;
      case 803:
        const userAccount = await runAsyncGetUserAccount(result.cookie);
        // console.log(userAccount, result);
        userLogin({
          profile: userAccount.profile,
          cookie: result.cookie,
        });
        enqueueSnackbar(result.message, { variant: "success" });
        break;
    }
    // enqueueSnackbar(result.message);
    // console.log(result);
  };

  const onSubmit = async ({ phone, password }) => {
    const result = await runAsync(phone, password);
    let variant;
    if (result.code === 200) {
      variant = "success";
      result.msg = "登录成功";
      userLogin(result);
      setTimeout(() => {
        navigate(location.state?.from || "/", { replace: true });
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
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="手机号登录" value="1" />
              <Tab label="二维码登录" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {/* 手机号登录 */}
            <LoginForm onSubmit={onSubmit} loading={loading} />
          </TabPanel>
          <TabPanel value="2">
            {/* 二维码登录 */}
            <Card sx={{ minWidth: 300, minHeight: 350, mt: 2 }}>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 250,
                }}
              >
                {qrKey ? (
                  <>
                    <QRCode
                      value={
                        "https://music.163.com/login?codekey=" +
                        qrKey.data.unikey
                      }
                    />
                  </>
                ) : (
                  <CircularProgress></CircularProgress>
                )}
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {qrKey ? (
                  <>
                    <LoadingButton
                      loading={loadingQrKey}
                      variant="outlined"
                      size="large"
                      sx={{ px: 3 }}
                      onClick={refreshAsyncGetQrKey}
                    >
                      刷新
                    </LoadingButton>
                    <LoadingButton
                      loading={loadingCheckQr}
                      variant="contained"
                      size="large"
                      sx={{ px: 3 }}
                      onClick={checkLoginStatus}
                    >
                      登录
                    </LoadingButton>
                  </>
                ) : null}
              </CardActions>
            </Card>
          </TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default connect((state) => ({}), {
  userLogin,
})(Login);
