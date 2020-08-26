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
  { title: 'Dummy User Name', field: 'dummyUserName' },
  { title: 'Dummy User Email', field: 'dummyUserMail'},
  { title: 'Dummy User Profile', field: 'dummyUserProfile'},
  { title: 'Created On', field: 'createdTimestamp' },
  { title: 'First Login', field: 'firstLogInTimestamp' },
  { title: 'Last Login', field: 'lastLogInTimestamp' },
  { title: 'Total Time Spent in minutes', field: 'totalLoginTime' }
];

class TrialUserLogPage extends Component {

  componentDidMount() {
    this.props.onFetchTrialUserLogs();
  }


  render(){
    return (
      <Grid container direction="column" style={{minHeight: "80em"}}>
          <Table
          title="Trial User Log History"
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
      onFetchTrialUserLogs : (accessToken,userId) => dispatch(actions.fetchTrialUserLogs(accessToken,userId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TrialUserLogPage);
