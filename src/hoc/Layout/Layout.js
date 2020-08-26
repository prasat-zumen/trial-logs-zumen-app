import React, {Component} from "react";
import { connect } from 'react-redux';
import Auxilary from '../Auxilary/Auxilary';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component{

    state = {
        showSideDrawer : false
    }

    sideDrawerCloseHandler = () =>{
        this.setState({showSideDrawer : false})
    }

    sideDrawerToggleHandler = () =>{
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render(){
        return (
            <Auxilary>
                <Toolbar 
                isAuth= {this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                isAuth= {this.props.isAuthenticated}
                closed={this.sideDrawerCloseHandler} open={this.state.showSideDrawer}/>
                <main className='Content'>
                    {this.props.children}
                </main>
            </Auxilary>
        );
    }
}
const mapStateToProps = state =>{
    return {
        isAuthenticated: state.userauth.accessToken!==null
    }
}

export default connect(mapStateToProps)(Layout);