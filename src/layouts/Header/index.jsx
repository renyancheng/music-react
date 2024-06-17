import React, {useEffect} from "react";
import {Link, NavLink, useNavigate, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {
    Box,
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    Divider,
    Icon,
    Tabs,
    Tab,
    Typography,
    SwipeableDrawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ButtonGroup,
} from "@mui/material";
import PopupState, {bindTrigger, bindMenu} from "material-ui-popup-state";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import {useConfirm} from "material-ui-confirm";
import {userLogout} from "../../redux/actions/auth";
import {toggleMode} from "../../redux/actions/style";
import {DARK_MODE, LIGHT_MODE, SYSTEM_MODE} from "@/theme";

export const Header = ({isLogin, profile, mode, currentTheme, userLogout, toggleMode}) => {
    const location = useLocation();
    const confirm = useConfirm();
    const navigate = useNavigate();
    const navs = [{
        name: "首页", href: "/", icon: "home",
    }, {
        name: "排行榜", href: "/discover/toplist", icon: "format_list_numbered_rtl",
    }, {
        name: "歌单", href: "/discover/playlist", icon: "queue_music",
    }, {
        name: "歌手", href: "/discover/artist", icon: "person",
    }, {
        name: "MV", href: "/discover/mv", icon: "ondemand_video",
    }, {
        name: "搜索", href: "/search", icon: "search",
    },];

    /* const [nav, setNav] = React.useState(0);

    const handleChange = (_, newNav) => {
      navigate(navs[newNav].href);
      setNav(newNav);
    };

    useEffect(() => {
      const newNavIndex = navs.findIndex((nav) => nav.href === location.pathname);
      if (newNavIndex === -1) {
        setNav(0);
      } else {
        setNav(newNavIndex);
      }
    }, [location]); */

    const [drawer, setDrawer] = React.useState(false);

    const toggleDrawer = (open) => {
        setDrawer(open);
    };

    const logout = () => {
        confirm({
            description: "确定退出登录？",
        }).then(() => {
            userLogout();
        });
    };

    console.log("currentTheme", currentTheme);
    console.log("mode", mode);

    return (<>
        <SwipeableDrawer
            anchor="left"
            open={drawer}
            onClose={() => toggleDrawer(false)}
            onOpen={() => toggleDrawer(true)}
        >
            <Box sx={{width: 250}}>
                <List>
                    {navs.map((nav) => {
                        return (<ListItem key={nav.name} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    if (location.pathname !== nav.href) navigate(nav.href);
                                    toggleDrawer(false);
                                }}
                            >
                                <ListItemIcon>
                                    <Icon>{nav.icon}</Icon>
                                </ListItemIcon>
                                <ListItemText primary={nav.name}/>
                            </ListItemButton>
                        </ListItem>);
                    })}
                </List>
            </Box>
        </SwipeableDrawer>
        <AppBar position="fixed" color="inherit">
            <Toolbar>
                <Box
                    sx={{
                        display: "flex", alignItems: "center", flexGrow: 1,
                    }}
                >
                    <IconButton
                        sx={{
                            display: {sm: "flex", md: "none"}, mr: 1,
                        }}
                        onClick={() => {
                            toggleDrawer(true);
                        }}
                    >
                        <Icon>menu_vert</Icon>
                    </IconButton>
                    <Typography
                        sx={{
                            display: {sm: "flex", md: "none"},
                        }}
                        variant="h5"
                    >
                        Music
                    </Typography>
                </Box>
                <Box
                    sx={{
                        flexGrow: 1, display: {xs: "none", md: "flex"}, justifyContent: "flex-start",
                    }}
                >
                    {navs.map((nav) => {
                        return (<Button
                            key={nav.name}
                            sx={{mx: 1, borderRadius: 5}}
                            color={nav.href === location.pathname ? "primary" : "inherit"}
                            to={nav.href}
                            component={NavLink}
                        >
                            {nav.name}
                        </Button>);
                    })}
                    {/* <Tabs value={nav}>
              {navs.map((nav, index) => {
                // if (index === 0) return <Tab label={nav.name} key={nav.href} />;
                return <Tab label={nav.name} key={nav.href} />;
              })}
            </Tabs> */}
                </Box>
                <PopupState variant="popover" popupId="userMenu">
                    {(popupState) => (<>
                        {mode === SYSTEM_MODE ?
                            <IconButton {...bindTrigger(popupState)}
                            >
                                <SettingsBrightnessIcon/>
                            </IconButton> : mode === LIGHT_MODE ?
                                <IconButton  {...bindTrigger(popupState)}>
                                    <LightModeIcon/>
                                </IconButton> :
                                <IconButton {...bindTrigger(popupState)}>
                                    <DarkModeIcon/>
                                </IconButton>}
                        <Menu {...bindMenu(popupState)}>
                            <Typography variant="subtitle1" component="div" sx={{ml:2}}>
                                切换主题
                            </Typography>
                            <ButtonGroup size="large" sx={{p:1}}>
                                <Button key="one" startIcon={<LightModeIcon/>} onClick={() => {toggleMode(LIGHT_MODE); popupState.close();}}
                                        variant={mode === LIGHT_MODE ? "contained" : "outlined"}
                                        disableElevation>亮色模式</Button>,
                                <Button key="two" startIcon={<SettingsBrightnessIcon/>} onClick={() => {toggleMode(SYSTEM_MODE); popupState.close();}}
                                        variant={mode === SYSTEM_MODE ? "contained" : "outlined"}
                                        disableElevation>系统默认</Button>,
                                <Button key="three" startIcon={<DarkModeIcon/>} onClick={()=>{
                                    toggleMode(DARK_MODE);
                                    popupState.close();
                                }} variant={mode === DARK_MODE ? "contained" : "outlined"}
                                        disableElevation> 暗色模式</Button>,
                            </ButtonGroup>
                        </Menu>
                    </>)}
                </PopupState>
                {isLogin ? (<PopupState variant="popover" popupId="userMenu">
                    {(popupState) => (<>
                        <IconButton
                            color="inherit"
                            sx={{p: 0, ml: 1}}
                            {...bindTrigger(popupState)}
                        >
                            <Avatar
                                alt={profile?.nickname}
                                src={profile?.avatarUrl + "?param=50y50"}
                                sx={{width: 36, height: 36}}
                            />
                        </IconButton>
                        <Menu {...bindMenu(popupState)}>
                            <MenuItem
                                onClick={() => {
                                    popupState.close();
                                    navigate(`/user/home/${profile.userId}`);
                                }}
                            >
                                <ListItemIcon>
                                    <Icon fontSize="small">person</Icon>
                                </ListItemIcon>
                                我的主页
                            </MenuItem>
                            <MenuItem onClick={popupState.close}>
                                <ListItemIcon>
                                    <Icon fontSize="small">inbox</Icon>
                                </ListItemIcon>
                                我的消息
                            </MenuItem>
                            <Divider/>
                            <MenuItem onClick={popupState.close}>
                                <ListItemIcon>
                                    <Icon fontSize="small">settings</Icon>
                                </ListItemIcon>
                                设置
                            </MenuItem>
                            <Divider/>
                            <MenuItem
                                onClick={() => {
                                    popupState.close();
                                    logout();
                                }}
                            >
                                <ListItemIcon>
                                    <Icon fontSize="small">exit_to_app</Icon>
                                </ListItemIcon>
                                退出登录
                            </MenuItem>
                        </Menu>
                    </>)}
                </PopupState>) : (<Button
                    color="inherit"
                    component={Link}
                    to="/login"
                    state={{from: location.pathname}}
                >
                    登录
                </Button>)}
            </Toolbar>
        </AppBar>
    </>);
};

export default connect(({auth: {isLogin, profile}, style: {mode, currentTheme}}) => ({
    isLogin, profile, mode, currentTheme
}), {
    userLogout, toggleMode
})(Header);
