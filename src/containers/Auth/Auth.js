import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from "@material-ui/core/styles";

import * as actions from '../../store/actions/auth';
import SignIn from '../../components/SignIn';
import JSEncrypt from 'jsencrypt';

const styles = (theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
});

class Auth extends Component {

    state = {
        username: "",
        password: ""
    }

    componentDidMount() {
        if (!this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    signInClicked = (username, password) => {
        let pub_key = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCb6UbdaP7pIGCjWDWFxyUk/MZp0LW1aheUQ2Ggbn7Kw4QYGFK3dH5yjcIm8whjnx2qim0wreTv0KqbmGHZSHjL/Gu9mnY9bZL1CPx4mEZ8Q5qCCiU0eK/5VkDA5bwPmX2JGt0TIv3uCy7Kb6ts6CNCKyYqQK8hh81aigy2k/rZdQIDAQAB';
        let userName = username;
        // let passWord = btoa(password);
        const encrypt = new JSEncrypt()
        encrypt.setPublicKey(pub_key)
        const passWord = encrypt.encrypt(password);
        const roleId = 3;
        let baseURL = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
        //converted to Base64
        let buff = new Buffer(baseURL);
        const hostName = buff.toString('base64');
        let TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let TZBuff = new Buffer(TZ);
        const timeZone = TZBuff.toString('base64');
        this.props.onAuth(userName, passWord, roleId, hostName, timeZone, this.state.isSignup);
    }

    render() {
        const { classes } = this.props;
        let page = (
            <SignIn signInClicked={this.signInClicked} />);

        if (this.props.loading) {
            page = (
                <div className={classes.root}>
                    <CircularProgress size="10rem"/>
                </div>
            );
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>
                    {this.props.error}
                </p>
            );
        }
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return (
            <div>
                {authRedirect}
                {errorMessage}
                {page}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.accessToken !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (userName, password, roleId, hostName, timeZone, isSignup) => dispatch(actions.auth(userName, password, roleId, hostName, timeZone, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Auth));
