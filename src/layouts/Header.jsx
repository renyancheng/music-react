import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Box, AppBar, Toolbar, Button, IconButton } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const navs = [
    {
      name: "首页",
      href: "/",
    },
    {
      name: "排行榜",
      href: "/discover/toplist",
    },
    {
      name: "歌单",
      href: "/discover/playlist",
    },
    {
      name: "歌手",
      href: "/discover/artist",
    },
    {
      name: "电台",
      href: "/discover/djradio",
    },
  ];

  return (
    <>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Box
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, justifyContent: "center" }}
          >
            {navs.map((nav) => {
              return (
                <Button
                  key={nav.name}
                  sx={{ mx: 1, borderRadius: 5 }}
                  color={nav.href === location.pathname ? "primary" : "inherit"}
                  variant={nav.href === location.pathname ? "contained" : "default"}
                  to={nav.href}
                  component={NavLink}
                  disableElevation
                >
                  {nav.name}
                </Button>
              );
            })}
          </Box>
          <IconButton
            color="inherit"
            onClick={() => {
              navigate("/login");
            }}
          >
            <PersonOutlineIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
