import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useEffect, useState } from 'react';
import usersService from '../services/usersService.js'
import { useSelector } from 'react-redux';
import Users from '../../../../server/models/Users.js';

const AddUser = () => {
    const { token, role } = useSelector((state) => state.token);
    const [users, setUsers] = useState([]);
    const type = "student";

    const createUser = async (userData) => {
        const newUser = await usersService.createUser(token, userData);
        if (newUser) {
            Users.getUsersData(type);
        }
    }

    return (
        <div>
            <Button
                className="p-button p-component p-button-success"
                onClick={() => createUser({
                    name: 'New User',
                    identity_number,
                    password,
                    phone,
                    address,
                    email,
                    date_of_birth,
                    status
                })}/>
        </div>
    );
}