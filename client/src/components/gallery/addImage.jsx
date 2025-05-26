import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import PropTypes from 'prop-types';

const AddImage = ({ visible, onHide, onAddImage, statusOptions }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState(null); // או סטטוס ברירת מחדל
    const [isPublic, setIsPublic] = useState(false);

    const resetForm = () => {
        setSelectedFile(null);
        setTitle('');
        setStatus(null);
        setIsPublic(false);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = () => {
        onAddImage(selectedFile, title, status, isPublic);
        onHide(); // סגור את הדיאלוג
        resetForm(); // נקה את הטופס
    };

    const dialogFooter = (
        <>
            <Button label="ביטול" icon="pi pi-times" outlined onClick={() => { onHide(); resetForm(); }} />
            <Button label="הוסף" icon="pi pi-plus" onClick={handleSubmit} disabled={!selectedFile || !title || !status} />
        </>
    );

    return (
        <Dialog visible={visible} style={{ width: '45rem' }} header="הוסף תמונה חדשה" modal
            className="p-fluid" footer={dialogFooter} onHide={() => { onHide(); resetForm(); }}>
            <div className="field">
                <label htmlFor="imageFile" className="font-bold">בחר קובץ תמונה</label>
                <input type="file" id="imageFile" accept="image/*" onChange={handleFileChange} className="p-inputtext" />
            </div>

            <div className="field">
                <label htmlFor="title" className="font-bold">כותרת התמונה</label>
                <InputText id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="field">
                <label htmlFor="status" className="font-bold">קטגוריה</label>
                <Dropdown id="status" value={status} options={statusOptions} onChange={(e) => setStatus(e.value)}
                    placeholder="בחר קטגוריה" required />
            </div>

            <div className="field flex align-items-center">
                <label htmlFor="isPublic" className="font-bold mr-3">ציבורי</label>
                <InputSwitch checked={isPublic} onChange={(e) => setIsPublic(e.value)} />
            </div>
        </Dialog>
    );
};

AddImage.propTypes = {
    visible: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onAddImage: PropTypes.func.isRequired,
    statusOptions: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    })).isRequired,
};

export default AddImage;