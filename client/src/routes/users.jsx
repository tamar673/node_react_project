import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useEffect, useState } from 'react';
import getUsersByType from '../services/usersService'

const Users = () => {

    const [users, setUsers] = useState([]);

    const getUsersData = (type) => {
        console.log("in function at component");
        const userByType= getUsersByType(type);
         setUsers(userByType);
    }



    const usersTable = (users) => {
        return (
            <DataTable value={users} tableStyle={{ minWidth: '50rem' }}>
                <Column field="status" header="Status"></Column>
                <Column field="name" header="Name"></Column>
               
            </DataTable>
        )
    }

    return (
        <div>
            <h1>Users</h1>
            <Button title='תצוגת צוות' onClick={ ()=>getUsersData('איש צוות')} />
            <Button title='תצוגת תלמידים' onClick={ ()=>getUsersData('תלמיד') } />
            <usersTable users={users}/>
            {/* {usersTable(users)} */}
        </div>
    );
};

export default Users;