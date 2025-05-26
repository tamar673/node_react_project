import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
//  import '../src/cssFiles/galleryCss.css'

const ImageCard = ({ image, SERVER_IMAGES_BASE_URL, onConfirmDelete, onOpenUpdateStatus, role }) => {
    // נשתמש ב-backgroundImage כדי שהתמונה תמלא את כל הכרטיס
    const cardStyle = {
        backgroundImage: `url(${image.imageUrl})`, // מגדיר את התמונה כרקע
        backgroundSize: 'cover', // מכסה את כל השטח של הכרטיס
        backgroundPosition: 'center center', // ממקם את התמונה במרכז
        backgroundRepeat: 'no-repeat' // מונע חזרתיות
    };

    return (
        <div className="col-12 sm:col-6 md:col-4 lg:col-3">
            <div className="image-card-container" style={cardStyle}>
                {/* רכיב Card ישמש רק כקונטיינר עבור תוכן ה-overlay */}
                <Card
                    className="h-full image-card-prime" // הוספנו קלאס ל-Card
                >
                    {/* גוף ה-Card יכיל את כל התוכן שיופיע באוברליי */}
                    <div className="card-content-overlay">
                        <h3 className="card-title">{image.title || 'ללא כותרת'}</h3>
                        <p className="card-subtitle">סטטוס: {image.status || 'לא מוגדר'} | ציבורי: {image.public ? 'כן' : 'לא'}</p>
                        <small className="card-footer-text">הועלה ע"י: {image.uploade_by || 'לא ידוע'}</small>
                        <div className="card-buttons">
                            {/* כפתור עדכון סטטוס (ציבורי) */}
                            <Button icon="pi pi-pencil" label="סטטוס" className="p-button-sm p-button-info" onClick={() => onOpenUpdateStatus(image)} />
                            {/* כפתור מחיקה */}
                            <Button icon="pi pi-trash" label="מחק" className="p-button-sm p-button-danger" onClick={() => onConfirmDelete(image)} />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

// הוספת Prop-types לתיקוף נתונים
ImageCard.propTypes = {
    image: PropTypes.object.isRequired,
    SERVER_IMAGES_BASE_URL: PropTypes.string.isRequired,
    onConfirmDelete: PropTypes.func.isRequired,
    onOpenUpdateStatus: PropTypes.func.isRequired,
    role: PropTypes.string,
};

export default ImageCard;
// import React from 'react';
// import { Card } from 'primereact/card';
// import { Button } from 'primereact/button';
// import PropTypes from 'prop-types'; // לצורך תיקוף Prop-types

// const ImageCard = ({ image, SERVER_IMAGES_BASE_URL, onConfirmDelete, onOpenUpdateStatus, role }) => {
//     return (
//         <div className="col-12 sm:col-6 md:col-4 lg:col-3">
//             <div className="image-card-container">
//                 <Card
//                     title={image.title || 'ללא כותרת'}
//                     subTitle={`סטטוס: ${image.status || 'לא מוגדר'} | ציבורי: ${image.public ? 'כן' : 'לא'}`}
//                     className="h-full"
//                     footer={
//                         <small className="text-500">הועלה ע"י: {image.uploade_by || 'לא ידוע'}</small>
//                     }
//                 >
//                     <img src={image.imageUrl} alt={image.title} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', borderRadius: '4px' }} />
//                 </Card>
//                 <div className="image-card-overlay">
//                     {/* כפתור עדכון סטטוס (ציבורי) */}
//                     <Button icon="pi pi-pencil" label="סטטוס" className="p-button-sm p-button-info" onClick={() => onOpenUpdateStatus(image)} />
//                     {/* כפתור מחיקה */}
//                     <Button icon="pi pi-trash" label="מחק" className="p-button-sm p-button-danger" onClick={() => onConfirmDelete(image)} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// // הוספת Prop-types לתיקוף נתונים
// ImageCard.propTypes = {
//     image: PropTypes.object.isRequired,
//     SERVER_IMAGES_BASE_URL: PropTypes.string.isRequired,
//     onConfirmDelete: PropTypes.func.isRequired,
//     onOpenUpdateStatus: PropTypes.func.isRequired,
//     role: PropTypes.string, // או PropTypes.oneOf(['admin', 'user']) לדוגמה
// };

// export default ImageCard;