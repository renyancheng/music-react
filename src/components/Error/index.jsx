import React from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";

function NotFound() {
  return (
    <>
      <Grid item>
        <Card variant="outlined" sx={{ p: 5 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Grid item>
              <Typography variant="h2">404</Typography>
            </Grid>
            {/* <Divider orientation="vertical" variant="absolute" sx={{mx:5}} flexItem /> */}
            <Grid item>
              <Typography variant="h5">找不到此页面</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Timestamp: {Date.now()}</Typography>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

const Error = ({ errorCode = 404 }) => {
  return (
    <Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ height: 400 }}
        spacing={2}
      >
        {errorCode == 404 && <NotFound />}
      </Grid>
    </Box>
  );
};

export default Error;
