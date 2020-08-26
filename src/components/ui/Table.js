import React from 'react';
import MaterialTable from 'material-table';

const table = (props) =>(
    <MaterialTable
        title={props.title}
        columns={props.columns}
        data={props.data}    
    />
);

export default table;