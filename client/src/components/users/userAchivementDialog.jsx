import React from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Achievements from '../../routes/achievements.jsx'; // ודא נתיב נכון

const UserAchievementDialog = ({ visible, onHide, userId }) => {
    
    const dialogFooter = (
        <Button label="סגור" icon="pi pi-times" onClick={onHide} className="p-button-text" />
    );
    
    return (
     <Dialog
            header={`הישגים של ${userId}`} // כותרת הדיאלוג
            visible={visible} // האם הדיאלוג גלוי (מגיע כ-prop)
            style={{ width: '50vw' }} // רוחב הדיאלוג
            onHide={onHide} // פונקציה לסגירה (מגיע כ-prop)
            modal // הדיאלוג מודאלי
            footer={dialogFooter} // הוספת כפתור סגירה ל-footer
        >
            {/* אם קיים userId, הצג את רכיב Achievement */}
            {userId ? (
                <Achievements userId={userId} />
            ) : (
                <p>לא נבחר משתמש להצגת הישגים.</p>
            )}
        </Dialog>
    );
}

export default UserAchievementDialog;