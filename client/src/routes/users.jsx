import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import usersService from '../services/usersService.js'
import UserAchievementDialog from '../components/users/userAchivementDialog.jsx';
import { useSelector } from 'react-redux';

const Users = () => {
const { token, role } = useSelector((state) => state.token);
    const [users, setUsers] = useState([]);
    const type="student"
   
     useEffect(() => {
        getUsersData(type);
    }, []);

    const [displayAchievementsDialog, setDisplayAchievementsDialog] = useState(false);
    const [selectedUserIdForAchievements, setSelectedUserIdForAchievements] = useState(null);
    const [selectedUserNameForAchievements, setSelectedUserNameForAchievements] = useState('');


    // פונקציית עזר לפתיחת הדיאלוג - נשארת כאן
    const openAchievementsDialog = (rowData) => {
        setSelectedUserIdForAchievements(rowData._id); // ודא ש-rowData._id מכיל את ID המשתמש
        setSelectedUserNameForAchievements(rowData.name); // נשמור גם את שם המשתמש לכותרת הדיאלוג
        setDisplayAchievementsDialog(true);
    };

// פונקציית עזר לסגירת הדיאלוג - נשארת כאן
    const closeAchievementsDialog = () => {
        setDisplayAchievementsDialog(false);
        setSelectedUserIdForAchievements(null);
        setSelectedUserNameForAchievements('');
    };

    // פונקציית עזר לעמודת הכפתור של ההישגים - נשארת כאן
    const ButtonShowAchivement = (rowData) => {
        return (
            <Button 
                label="להצגת השגים" 
                color='green'
                onClick={() => openAchievementsDialog(rowData)} 
            />    
        )
    }

    const getUsersData = async(type) => {
        const userByType = await usersService.getUsersByType(type,token) 
        setUsers(userByType);
    }

    const deleteUser = async (id) => {
        const user = await usersService.deleteUser(id,token);
        if (user) {
            getUsersData(type);
        }
    }
    const buttonDeleteUser = (rowData) => {
        return (
            <Button 
                icon="pi pi-trash" 
                className="p-button-danger p-button-text" 
                onClick={() => deleteUser(rowData._id)} 
            />
        );
    }
    
    const usersTable = (users) => {
        return (
            <>
            <DataTable value={users} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="שם"></Column>
                <Column field="identity_number" header="מספר זהות"></Column>
                {/* <Column field="password" header="סיסמא"></Column> */}
                <Column field="phone" header="טלפון"></Column>
                <Column field="address" header="כתובת"></Column>
                <Column field="email" header="כתובת מייל"></Column>
                <Column field="date_of_birth" header="תאריך לידה"></Column>
                <Column field="activ" header="סטטוס"></Column>
                <Column field="delete" header="מחיקה" body={buttonDeleteUser}></Column>
                <Column field="delete" header="עידכון" body={buttonDeleteUser}></Column>
                <Column header="הישגים" body={ButtonShowAchivement}></Column>
            
                 {/* <Column  header="השגים" body={getAchivment}></Column>
                <Column  header="מבצעים" body={getPlans}></Column>  */}
                
            </DataTable>
            
            </>
        )
    }

    return (
        <div>
            {usersTable(users)}
           <UserAchievementDialog
                visible={displayAchievementsDialog}
                userId={selectedUserIdForAchievements}
                userName={selectedUserNameForAchievements}
                onHide={closeAchievementsDialog}
            />
        </div>
    );
};

export default Users;