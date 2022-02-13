import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Box } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

export default function LoginForm({ onSubmit, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          label="手机号"
          placeholder="请输入手机号"
          variant="outlined"
          margin="normal"
          autoFocus
          fullWidth
          {...register("phone", {
            required: "手机号是必须的",
            pattern: {
              value:
                /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
              message: "手机号格式不正确",
            },
          })}
          error={errors.phone ? true : false}
          helperText={errors.phone ? errors.phone.message : null}
        />
        <TextField
          label="密码"
          placeholder="请输入密码"
          variant="outlined"
          margin="normal"
          type="password"
          fullWidth
          {...register("password", {
            required: "密码是必须的",
          })}
          error={errors.password ? true : false}
          helperText={errors.password ? errors.password.message : null}
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          loading={loading}
          loadingIndicator="登录中..."
          sx={{ mt: 3, mb: 2 }}
        >
          登录
        </LoadingButton>
      </Box>
    </div>
  );
}
