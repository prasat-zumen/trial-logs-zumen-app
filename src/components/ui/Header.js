import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import logo from '../../assets/logo.svg';

function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "3em",
        [theme.breakpoints.down("md")] : {
            marginBottom: "2em"
        },
        [theme.breakpoints.down("xs")] : {
            marginBottom: "1.25em"
        }
    },
    logo: {
        height: "5em",
        [theme.breakpoints.down("md")] : {
            height: "4em"
        },
        [theme.breakpoints.down("xs")] : {
            height: "2.5em"
        }
    },
    logoContainer: {
        margin:"1em",
        padding: 0,
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    tabContainer: {
        marginLeft: "auto"
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: "25px"
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: "50px",
        marginLeft: "50px",
        marginRight: "25px",
        height: "45px",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
        }
    },
    menu: {
        backgroundColor: theme.palette.common.blue,
        color: "white",
        borderRadius: "0px"
    },
    menuItem: {
        ...theme.typography.tab,
        color: "white",
        opacity: 0.7,
        "&:hover": {
            opacity: 1
        }
    },
    drawerIconContainer: {
        marginLeft: "auto",
        "&:hover": {
            backgroundColor: "transparent",
        }
    },
    drawerIcon: {
        height: "50px",
        width: "50px",
        color: "#ffffff"
    },
    drawer: {
        backgroundColor: theme.palette.common.blue
    },
    drawerItem: {
        ...theme.typography.tab,
        color: 'white',
        opacity: 0.7
    },
    drawerItemEstimate: {
        backgroundColor: theme.palette.common.orange
    },
    drawerItemSelected: {
        "& .MuiListItemText-root": {
            opacity: 1
        }
    },
    appBar: {
        zIndex: theme.zIndex.modal + 1
    }
}))

function Header(props) {
    const classes = useStyles();
    const theme = useTheme();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const [openDrawer, setOpenDrawer] = useState(false);
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const handleChange = (e, newValue) => {
        props.setValue(newValue);
    };

    const openRoutes = [{name: "Sign In", link:"/loghistory/signIn", activeIndex: 0}];
    const closedRoutes = [{name: "Primary Users", link:"/loghistory/", activeIndex: 0},
                        {name: "Trial Users", link:"/loghistory/trialusers", activeIndex: 1},
                        {name: "Logout", link:"/loghistory/logout", activeIndex: 2}
                        ];

    const routes= props.isAuthenticated ? closedRoutes : openRoutes;

    useEffect( ()=> {
        [...routes].forEach(route=>{
            switch(window.location.pathname) {
                case "/" :
                    props.setValue(0);
                    break;
                case `${route.link}`:
                    if(props.value !== route.activeIndex) {
                        props.setValue(route.activeIndex)                        
                    }
                    break;                
                default:
                    break;
            }
        })
    }, [props.value, routes, props]);

    const tabs = (
        <React.Fragment>
            <Tabs value={props.value}
            onChange={handleChange}
            className={classes.tabContainer}
            indicatorColor="primary">
                {routes.map((route, index)=> (
                    <Tab key={`${route}${index}`}
                    className={classes.tab} 
                    component={Link} to={route.link} label={route.name}
                    aria-owns={route.ariaOwns}
                    aria-haspopup={route.ariaPopup}
                    onMouseOver={route.onMouseOver} />
                ))}                
            </Tabs>
        </React.Fragment>
    );

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer disableBackdropTransition={!iOS} 
            disableDiscovery={iOS} 
            open={openDrawer} 
            onClose={()=>setOpenDrawer(false)} onOpen={()=>setOpenDrawer(true)}
            classes={{paper: classes.drawer}}>
                <div className={classes.toolbarMargin} />
                <List disablePadding>
                    {
                        routes.map((route,index)=> (
                            <ListItem key={`${route}${index}`} 
                            onClick={()=> {setOpenDrawer(false); 
                                props.setValue(route.activeIndex)}} 
                            divider button 
                            component={Link} 
                            to={route.link} 
                            selected={props.value === route.activeIndex}
                            classes={{selected: classes.drawerItemSelected}}>
                                <ListItemText className={classes.drawerItem} 
                                disableTypography>{route.name}</ListItemText>
                            </ListItem>
                        ))
                    }
                </List>
            </SwipeableDrawer>
            <IconButton className={classes.drawerIconContainer} 
            onClick={()=> setOpenDrawer(!openDrawer)} disableRipple>
                <MenuIcon className={classes.drawerIcon} />
            </IconButton>
        </React.Fragment>
    )
    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar disableGutters>
                        <Button component={Link} to="/" 
                        className={classes.logoContainer} 
                        disableRipple
                        onClick={()=>props.setValue(0)}>
                            <img src={logo} alt="company logo" 
                            className={classes.logo} />
                        </Button>
                        {matches ? drawer : tabs}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </React.Fragment>        
    );
}

const mapStateToProps = state =>{
    return {
        isAuthenticated: state.auth.accessToken!==null
    }
}

export default connect(mapStateToProps)(Header);