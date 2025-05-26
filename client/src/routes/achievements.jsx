
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import achievementsService from '../services/achievementsService';
import AddAchievement from '../components/achievements/addAchievement';
import { useSelector } from 'react-redux';

const Achievements = ({ userId }) => {

    const { token, role } = useSelector((state) => state.token);
    const [achievements, setAchievements] = useState([]);
    const [displayAddDialog, setDisplayAddDialog] = useState(false)

    useEffect(() => {
        if (userId && token) { // ודא ששניהם קיימים לפני הקריאה
            getAchievementsData(userId);
        } else if (userId) {
            console.warn("Token not available yet for fetching achievements.");
        }
    }, [userId, token]);

    const getAchievementsData = async (id) => { // הפונקציה מקבלת פרמטר ID
        try {
            // ודא ש-id ו-token קיימים לפני קריאה לשירות
            if (!id || !token) {
                console.warn("Skipping achievement data fetch: userId or token missing.");
                return;
            }
            const achivments = await achievementsService.getAchivementsById(id, token);
            setAchievements(achivments);
        } catch (error) {
            console.error("שגיאה באחזור הישגים:", error);
            setAchievements([]); // נקה את הנתונים במקרה של שגיאה
        }
    }

    // const getAchievementsData = async (userId) => {
    //     const achievements = await achievementsService.getAchivementsById(userId,token);
    //     setAchievements(achievements);
    //   }

    const deleteAchivement = async (id) => {
        const achivement = await achievementsService.deleteAchivement(id, token);
        if (achivement) {
            getAchievementsData(userId);
        }
    }

    const buttonDeleteAchivement = (rowData) => {
        return (
            <Button
                icon="pi pi-trash"
                className="p-button-danger p-button-text"
                onClick={() => deleteAchivement(rowData._id)}
            />
        );
    }

    const handleAddSuccess = () => {
        getAchievementsData(userId); // רענן את הנתונים בטבלה
    };



    const achivementTable = (achievements) => {

        return (
            <>
                <div className="flex justify-content-end mb-3">
                    <Button
                        label="הוסף הישג"
                        icon="pi pi-plus"
                        className="p-button-primary"
                        onClick={() => setDisplayAddDialog(true)} // פותח את דיאלוג ההוספה
                    />
                </div>

                <DataTable value={achievements} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="userId.name" header="שם"></Column>
                    <Column field="userId.identity_number" header="מספר זהות"></Column>
                    <Column field="achievement" header="הישג"></Column>
                    <Column field="date" header="תאריך"></Column>
                    <Column field="delete" header="מחיקה" body={buttonDeleteAchivement}></Column>
                </DataTable>

                <AddAchievement
                    visible={displayAddDialog}
                    userId={userId}
                    onHide={() => setDisplayAddDialog(false)} // פונקציה לסגירת הדיאלוג
                    onAddSuccess={handleAddSuccess} // פונקציה לקריאה לאחר הוספה מוצלחת
                />

            </>
        )
    }

    return (
        <>
            {achivementTable(achievements)}
        </>
    )


};

export default Achievements;