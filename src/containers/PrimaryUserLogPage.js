import React, { Component } from 'react';
import Table from '../components/ui/Table';
import Grid from '@material-ui/core/Grid';
import * as actions from '../store/actions/index';
import { connect } from 'react-redux';

const columns =  [  
  { title: 'Organization Name', field: 'orgName' },
  { title: 'Name', field: 'name' },
  { title: 'Email', field: 'mail'},
  { title: 'Mobile', field: 'mobile'},
  { title: 'Created On', field: 'createdTimestamp' },
  { title: 'First Login', field: 'firstLogInTimestamp' },
  { title: 'Last Login', field: 'lastLogInTimestamp' },
  { title: 'Total Time Spent in minutes', field: 'totalLoginTime' }
];

class PrimaryUserLogPage extends Component {

  componentDidMount() {
    this.props.onFetchPrimaryUserLogs();
  }


  render(){
    return (
      <Grid container direction="column" style={{minHeight: "80em"}}>
          <Table
          title="User Log History"
          columns={columns}
          data={this.props.data}    
          />
      </Grid>
    );
  }
  
}

const mapStateToProps = state =>{
  return {
      data: state.primaryUserLog.primaryUserLogs,
      loading: state.primaryUserLog.loading,
      accessToken: state.auth.accessToken,
      userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch =>{
  return {
      onFetchPrimaryUserLogs : (accessToken,userId) => dispatch(actions.fetchPrimaryUserLogs(accessToken,userId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PrimaryUserLogPage);
