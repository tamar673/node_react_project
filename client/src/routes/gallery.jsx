import React, { useEffect, useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import galleryService from '../services/galleryService'; // ודא שהנתיב נכון למיקום השירות
import '../cssFiles/galleryCss.css'; // הנתיב לקובץ ה-CSS

// ייבוא הקומפוננטות החדשות
import ImageCard from '../components/gallery/imageCard';
import DeleteImage from '../components/gallery/deleteImage';
import UpdateStatus from '../components/gallery/updateStatus';
import AddImage from '../components/gallery/addImage'; // ייבוא קומפוננטת הוספת תמונה

const Gallery = () => {
    const { token, role } = useSelector((state) => state.token);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
   
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [updateStatusDialogVisible, setUpdateStatusDialogVisible] = useState(false);
    const [addImageVisible, setAddImageVisible] = useState(false); // סטייט לדיאלוג הוספת תמונה
    const [selectedImage, setSelectedImage] = useState(null);
    const toast = useRef(null);

    const SERVER_IMAGES_BASE_URL = 'http://localhost:1100/Uploads/';

    const statusOptions = [
        { label: 'מהזמן האחרון', value: 'from_the_last_time' },
        { label: 'סיומים', value: 'syumim' },
        { label: 'טיולים', value: 'trips' },
        { label: 'יום בישיבה', value: 'day_in_yeshiva' },
        { label: 'רבנים והישיבה', value: 'whithRabanim' },
    ];

    useEffect(() => {
        fetchImages();
    }, [token]);

    const fetchImages = async () => {//רשימת התמונות
        if (!token) {
            toast.current.show({ severity: 'warn', summary: 'אזהרה', detail: 'אין טוקן זמין. לא ניתן לטעון גלריה.', life: 3000 });
            setImages([]);
            setLoading(false);
            return;
        }//אם אין טוקן נשלח מערך ריק והמשתנה של הטעינה folse
        setLoading(true);
        try {//טעינה של התמונות
            const data = await galleryService.getAllGallery(token);
            const formattedImages = data.map(img => ({
                ...img,
                imageUrl: `${SERVER_IMAGES_BASE_URL}${img.filename}`,
                public: typeof img.public === 'boolean' ? img.public : (img.public === true || img.public === 1)
            }));
            setImages(formattedImages);
            console.log("Gallery images fetched:", formattedImages);
        } catch (error) {
            console.error("Failed to fetch gallery images:", error);
            toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'נכשל בטעינת תמונות הגלריה.', life: 3000 });
            setImages([]);
        } finally {
            setLoading(false);
        }
    };

    // --- פונקציות לטיפול בפעולות שונות ---

    // מחיקה
    const confirmDeleteImage = (image) => {
        setSelectedImage(image);
        setDeleteDialogVisible(true);
    };

    const handleDeleteImage = async () => {
        if (selectedImage && token) {
            try {
                await galleryService.deleteImageFromGallery(selectedImage._id, token);
                toast.current.show({ severity: 'success', summary: 'הצלחה', detail: 'התמונה נמחקה בהצלחה.', life: 3000 });
                setDeleteDialogVisible(false);
                setSelectedImage(null);
                fetchImages(); // רענן את רשימת התמונות
            } catch (error) {
                console.error("Error deleting image:", error);
                toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'נכשל במחיקת התמונה.', life: 3000 });
            }
        }
    };

    // עדכון סטטוס Public
    const openUpdateStatusDialog = (image) => {
        setSelectedImage({ ...image }); // שכפל את האובייקט
        setUpdateStatusDialogVisible(true);
    };

    const handleUpdateStatus = async (updatedPublicStatus) => {
        if (selectedImage && token) {
            try {
                await galleryService.changeImageStatus(selectedImage._id, updatedPublicStatus, token);
                toast.current.show({ severity: 'success', summary: 'הצלחה', detail: 'סטטוס ציבורי עודכן בהצלחה.', life: 3000 });
                setUpdateStatusDialogVisible(false);
                setSelectedImage(null);
                fetchImages();
            } catch (error) {
                console.error("Error updating public status:", error);
                toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'נכשל בעדכון סטטוס ציבורי.', life: 3000 });
            }
        }
    };

    // הוספת תמונה
    const handleAddImage = async (newImageFile, newImageTitle, newImageStatus, newImagePublic) => {
        if (token && newImageFile) {
            try {
                await galleryService.createNewGalleryItem(newImageFile, newImageTitle, newImageStatus, newImagePublic, token);
                toast.current.show({ severity: 'success', summary: 'הצלחה', detail: 'התמונה נוספה בהצלחה.', life: 3000 });
                setAddImageVisible(false);
                fetchImages(); // רענן את רשימת התמונות
            } catch (error) {
                console.error("Error adding image:", error);
                toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'נכשל בהוספת התמונה.', life: 3000 });
            }
        } else {
             toast.current.show({ severity: 'warn', summary: 'אזהרה', detail: 'נא לבחור קובץ תמונה.', life: 3000 });
        }
    };


    if (loading) {
        return <div>טוען גלריית תמונות...</div>;
    }

    return (
        <div className="card">
            <Toast ref={toast} />
            <h2 className="gallery-title">ניהול גלריית תמונות</h2>
            <div className="flex justify-content-end mb-3">
                <Button label="הוסף תמונה חדשה" icon="pi pi-plus" onClick={() => setAddImageVisible(true)} />
            </div>

            {images.length === 0 ? (
                <div>אין תמונות להצגה.</div>
            ) : (
                <div className="grid">
                    {images.map((image) => (
                        <ImageCard
                            key={image._id}
                            image={image}
                            SERVER_IMAGES_BASE_URL={SERVER_IMAGES_BASE_URL}
                            onConfirmDelete={confirmDeleteImage}
                            onOpenUpdateStatus={openUpdateStatusDialog}
                            role={role} // העברת ה-role אם יש לו רלוונטיות לכפתורים
                        />
                    ))}
                </div>
            )}

            <DeleteImage
                visible={deleteDialogVisible}
                onHide={() => setDeleteDialogVisible(false)}
                selectedImage={selectedImage}
                onDelete={handleDeleteImage}
            />

            <UpdateStatus
                visible={updateStatusDialogVisible}
                onHide={() => setUpdateStatusDialogVisible(false)}
                selectedImage={selectedImage}
                onUpdate={handleUpdateStatus}
            />

            <AddImage
                visible={addImageVisible}
                onHide={() => setAddImageVisible(false)}
                onAddImage={handleAddImage}
                statusOptions={statusOptions} // העברת אפשרויות סטטוס
            />
        </div>
    );
};

export default Gallery;
