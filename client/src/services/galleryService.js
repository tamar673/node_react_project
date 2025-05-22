import axios from 'axios'
const BASE_URL = 'http://localhost:1100/api/gallery'; 

// פונקציה לקבלת כל התמונות מהגלריה
const getAllGallery = async (token) => {
        const gallery=await axios.get(`${BASE_URL}/`,{headers:{Authorization:`Bearer ${token}`}})
        return gallery.data;
};

// פונקציה לקבלת תמונות גלריה מסוג מסוים
const getSpecificGallery = async (type, token) => {
        console.log(type)
        const gallery=await axios.get(`${BASE_URL}/ ${type}`,{headers:{Authorization:`Bearer ${token}`}})
        return gallery.data;
};

const getSpecificPublicGallery = async (type, token) => {
        const gallery=await axios.get(`${BASE_URL}/`,{headers:{Authorization:`Bearer ${token}`}})
        return gallery.data;
};

// פונקציה ליצירת פריט חדש בגלריה (עם העלאת קובץ)
const createNewGalleryItem = async (Data, token) => {
    const create=await axios.post(`${BASE_URL}/`,Data,{headers:{Authorization:`Bearer ${token}`}})
    return create.data;
};

// פונקציה לשינוי סטטוס תמונה בגלריה
const changeImageStatus = async (_id, status, token) => {
     const image = await axios.put(`${BASE_URL}/`,{_id,status},{headers:{Authorization:`Bearer ${token}`}})
};

// פונקציה לשינוי מצב ה-public של תמונה בגלריה
// שים לב: פונקציה זו דורשת verifyJWT_Manager בשרת, אז רק מנהלים יוכלו לבצע אותה.
const changeImagePublicStatus = async (_id, isPublic, token) => {
         const image = await axios.put(`${BASE_URL}/`,{_id,isPublic},{headers:{Authorization:`Bearer ${token}`}})
};

// פונקציה למחיקת תמונה מהגלריה
const deleteImageFromGallery = async (_id, token) => {
        const image = await axios.delete(`${BASE_URL}/${_id}`,{headers:{Authorization:`Bearer ${token}`}})
};

// ייצוא כל הפונקציות כ-Named Exports
 export default {
    getAllGallery,
    getSpecificGallery,
    getSpecificPublicGallery,
    createNewGalleryItem,
    changeImageStatus,
    changeImagePublicStatus,
    deleteImageFromGallery,
};