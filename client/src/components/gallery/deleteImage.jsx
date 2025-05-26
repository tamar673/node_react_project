import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';

const DeleteImage = ({ visible, onHide, selectedImage, onDelete }) => {
    const dialogFooter = (
        <>
            <Button label="ביטול" icon="pi pi-times" outlined onClick={onHide} />
            <Button label="מחיקה" icon="pi pi-trash" severity="danger" onClick={onDelete} />
        </>
    );

    return (
        <Dialog visible={visible} style={{ width: '32rem' }} onHide={onHide}
            footer={dialogFooter} header="אשר מחיקה" modal>
            <div className="flex align-items-center">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                {selectedImage && (
                    <span>האם אתה בטוח שברצונך למחוק את התמונה <b>{selectedImage.filename}</b>?</span>
                )}
            </div>
        </Dialog>
    );
};

DeleteImage.propTypes = {
    visible: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    selectedImage: PropTypes.object, // יכול להיות null
    onDelete: PropTypes.func.isRequired,
};

export default DeleteImage;