import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import PropTypes from 'prop-types';

const UpdateStatus = ({ visible, onHide, selectedImage, onUpdate }) => {
    const [currentPublicStatus, setCurrentPublicStatus] = useState(false);

    useEffect(() => {
        if (selectedImage) {
            setCurrentPublicStatus(selectedImage.public);
        }
    }, [selectedImage, visible]); // עדכן סטטוס רק כשהדיאלוג נפתח או התמונה משתנה

    const onPublicChange = (e) => {
        setCurrentPublicStatus(e.value);
    };

    const dialogFooter = (
        <>
            <Button label="ביטול" icon="pi pi-times" outlined onClick={onHide} />
            <Button label="שמירה" icon="pi pi-check" onClick={() => onUpdate(currentPublicStatus)} />
        </>
    );

    return (
        <Dialog visible={visible} style={{ width: '30rem' }} header="עדכון סטטוס תמונה" modal
            className="p-fluid" footer={dialogFooter} onHide={onHide}>
            {selectedImage && (
                <div className="field flex align-items-center">
                    <label htmlFor="public" className="font-bold mr-3">
                        סטטוס ציבורי
                    </label>
                    <InputSwitch checked={currentPublicStatus} onChange={onPublicChange} />
                </div>
            )}
        </Dialog>
    );
};

UpdateStatus.propTypes = {
    visible: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    selectedImage: PropTypes.object, // יכול להיות null
    onUpdate: PropTypes.func.isRequired,
};

export default UpdateStatus;