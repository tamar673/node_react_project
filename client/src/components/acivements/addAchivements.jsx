import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useSelector } from 'react-redux';
import achievementsService from '../services/achievementsService'; // ודא נתיב נכון

const AddAchievement = ({ userId, onAddSuccess, visible, onHide }) => {
    const { token } = useSelector((state) => state.token);
    const [newAchievement, setNewAchievement] = useState({ achievement: '', date: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // פונקציה לטיפול בלחיצה על כפתור "הוסף הישג" בתוך הדיאלוג
    const handleAddAchievement = async () => {
        if (!newAchievement.achievement) {
            setError("תיאור הישג הוא שדה חובה.");
            return;
        }
        if (!userId) {
            setError("שגיאה: ID משתמש חסר.");
            return;
        }
        if (!token) {
            setError("שגיאה: טוקן אימות חסר.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await achievementsService.createAchivement({
                userId: userId,
                achievement: newAchievement.achievement,
                date: newAchievement.date
            }, token);

            setNewAchievement({ achievement: '', date: '' }); // נקה את השדות
            onHide(); // סגור את הדיאלוג דרך ה-prop
            if (onAddSuccess) {
                onAddSuccess(); // קרא לפונקציה לרענון הטבלה בקומפוננטת האב
            }
        } catch (err) {
            console.error("שגיאה בהוספת הישג:", err.response?.data || err.message);
            setError(`שגיאה בהוספת הישג: ${err.response?.data?.message || 'נסה שוב מאוחר יותר.'}`);
        } finally {
            setLoading(false);
        }
    };

    // פונקציית ה-footer עבור דיאלוג ההוספה
    const dialogFooter = (
        <div>
            <Button
                label="ביטול"
                icon="pi pi-times"
                onClick={onHide} // סגור את הדיאלוג
                className="p-button-text"
                disabled={loading}
            />
            <Button
                label="הוסף"
                icon="pi pi-check"
                onClick={handleAddAchievement}
                autoFocus
                loading={loading}
            />
        </div>
    );

    return (
        <Dialog
            header="הוספת הישג חדש"
            visible={visible} // מנוהל ע"י קומפוננטת האב
            style={{ width: '30vw' }}
            modal
            className="p-fluid"
            footer={dialogFooter}
            onHide={onHide} // מנוהל ע"י קומפוננטת האב
        >
            <div className="field">
                <label htmlFor="achievement">תיאור הישג</label>
                <InputText
                    id="achievement"
                    value={newAchievement.achievement}
                    onChange={(e) => setNewAchievement({ ...newAchievement, achievement: e.target.value })}
                    required
                    autoFocus
                    className="p-inputtext-sm"
                />
            </div>
            <div className="field mt-3">
                <label htmlFor="date">תאריך (אופציונלי)</label>
                <InputText
                    id="date"
                    value={newAchievement.date}
                    onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
                    className="p-inputtext-sm"
                />
            </div>
            {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
        </Dialog>
    );
};

export default AddAchievement;
    