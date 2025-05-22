// import React, { useState, useEffect, useRef } from 'react';
// import { Galleria } from 'primereact/galleria';
// import  galleryService  from '../services/galleryService';
// import { useSelector, useDispatch } from 'react-redux'
// import { useParams } from 'react-router-dom';
// //import { logOut } from '../../appState/tokenSlice.jsx';

// const Gallery = () => { 
//     const { type } = useParams();
//     const { token, role, user } = useSelector((state) => state.token);
//     const [images, setImages] = useState(null);
//     const [activeIndex, setActiveIndex] = useState(0);    
//     const galleria = useRef(null);

//       const SERVER_IMAGES_BASE_URL = 'http://localhost:1100/Uploads/';

//     useEffect(() => {
//         galleryService.getSpecificGallery(type,token).then(data => setImages(data));
//     }, []);

//     const itemTemplate = (item) => {
//         return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
//     }

//     const thumbnailTemplate = (item) => {
//         return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
//     }

//     return (
//         <div className="card flex justify-content-center">
//             <Galleria ref={galleria} value={images} numVisible={7} style={{ maxWidth: '850px' }}
//             activeIndex={activeIndex} onItemChange={(e) => setActiveIndex(e.index)}
//             circular fullScreen showItemNavigators showThumbnails={false} item={itemTemplate} thumbnail={thumbnailTemplate} />
//             <div className="grid" style={{ maxWidth: '400px' }}>
//                 {
//                     images && images.map((image, index) => {
//                         let imgEl = <img src={image.thumbnailImageSrc} alt={image.alt} style={{ cursor: 'pointer' }} onClick={
//                             () => {setActiveIndex(index); galleria.current.show()}
//                         } />
//                         return (
//                             <div className="col-3" key={index}>
//                                 {imgEl}
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         </div>
//     )
// }



// export default Gallery;

// import React, { useState, useEffect, useRef } from 'react';
// import { Galleria } from 'primereact/galleria';
// import galleryService from '../services/galleryService'; // וודא נתיב נכון
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom'; // <-- ייבוא useParams

// const Gallery = () => {
//     const { type } = useParams(); // <-- קבל את 'type' מכאן
//     const { token } = useSelector((state) => state.token);
//     const [images, setImages] = useState(null);
//     const [activeIndex, setActiveIndex] = useState(0);
//     const galleria = useRef(null);

//     // נקודת הקצה הבסיסית עבור התמונות בשרת שלך (התיקייה הסטטית)
//     // וודא שזה תואם לפורט שהשרת שלך רץ עליו (לדוגמה, 1100)
//     const SERVER_IMAGES_BASE_URL = 'http://localhost:1100/Uploads/'; // <--- חשוב מאוד!

//     useEffect(() => {
//         const fetchImages = async () => {
//             if (!token) {
//                 console.warn("No token available. Cannot fetch gallery.");
//                 setImages([]); // הגדר למערך ריק אם אין טוקן
//                 return;
//             }
//             if (!type) { // אם ה-type עדיין לא זמין (לדוגמה, בטעינה ראשונית)
//                 console.log("Type parameter is not yet available.");
//                 return;
//             }

//             try {
//                 const data = await galleryService.getSpecificGallery(type, token);
//                 console.log("Raw data from server:", data); // בדוק את הנתונים המקוריים בקונסול

//                 // <--- מפה את הנתונים לפורמט של Galleria
//                 const formattedImages = data.map(img => ({
//                     itemImageSrc: `<span class="math-inline">\{SERVER\_IMAGES\_BASE\_URL\}</span>{img.filename}`, // נתיב מלא לתמונה הגדולה
//                     thumbnailImageSrc: `<span class="math-inline">\{SERVER\_IMAGES\_BASE\_URL\}</span>{img.filename}`, // נתיב מלא לתמונה הממוזערת
//                     alt: img.title || 'Gallery Image', // טקסט חלופי
//                     title: img.title // כותרת
//                 }));
//                 setImages(formattedImages);
//                 console.log("Formatted images for Galleria:", formattedImages); // בדוק את הפורמט החדש
//             } catch (error) {
//                 console.error("Failed to fetch gallery images:", error);
//                 setImages([]); // הגדר למערך ריק במקרה של שגיאה
//             }
//         };

//         fetchImages();
//     }, [type, token]); // תלויות: type ו-token

//     const itemTemplate = (item) => {
//         // וודא ש-itemImageSrc קיים
//         return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
//     }

//     const thumbnailTemplate = (item) => {
//         // וודא ש-thumbnailImageSrc קיים
//         return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
//     }

//     // הודעת טעינה או אין תמונות
//     if (images === null) {
//         return <div>טוען גלריה...</div>;
//     }

//     if (images.length === 0) {
//         return <div>אין תמונות להצגה עבור סוג זה.</div>;
//     }

//     return (
//         <div className="card flex justify-content-center">
//             <Galleria ref={galleria} value={images} numVisible={7} style={{ maxWidth: '850px' }}
//                 activeIndex={activeIndex} onItemChange={(e) => setActiveIndex(e.index)}
//                 circular fullScreen showItemNavigators showThumbnails={false} item={itemTemplate} thumbnail={thumbnailTemplate} />
//             <div className="grid" style={{ maxWidth: '400px' }}>
//                 {
//                     images.map((image, index) => {
//                         let imgEl = <img src={image.thumbnailImageSrc} alt={image.alt} style={{ cursor: 'pointer' }} onClick={
//                             () => { setActiveIndex(index); galleria.current.show() }
//                         } />
//                         return (
//                             <div className="col-3" key={index}>
//                                 {imgEl}
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         </div>
//     )
// }

// export default Gallery;

import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import galleryService from '../services/galleryService';
import { useSelector } from 'react-redux';
import { Galleria } from 'primereact/galleria';

const Gallery = () => {
  const { token } = useSelector((state) => state.token);
  const location = useLocation();
  const { type } = location.state || {};
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const galleria = useRef(null);

  useEffect(() => {
    if (type && token) {
      galleryService.getSpecificGallery(type, token).then((data) => {
        const mapped = data.map(img => ({
          itemImageSrc: `http://localhost:1100/${img.image.replaceAll('\\', '/')}`,
          thumbnailImageSrc: `http://localhost:1100/${img.image.replaceAll('\\', '/')}`,
          alt: img.filename || "",
          filename: img.filename // שמור גם את filename אם צריך
        }));
        setImages(mapped);
        console.log("images:", mapped);
      });
    }
  }, [type, token]);

  const itemTemplate = (item) => (
    <img
      src={item.itemImageSrc}
      alt={item.alt}
      style={{ width: '100%', display: 'block' }}
    />
  );

  const thumbnailTemplate = (item) => (
    <img
      src={item.thumbnailImageSrc}
      alt={item.alt}
      style={{ display: 'block' }}
    />
  );

  return (
    <div className="card flex justify-content-center">
      {/* הצג תמונה ראשונה רק אם קיימת */}
      
      <Galleria
        ref={galleria}
        value={images}
        numVisible={2}
        style={{ maxWidth: '850px' }}
        activeIndex={activeIndex}
        onItemChange={(e) => setActiveIndex(e.index)}
        circular
        fullScreen
        showItemNavigators
        showThumbnails={false}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
      />
            {/* כאן מתחיל הקטע החדש */}
      <div
        style={{
          maxWidth: '600px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px'
        }}
      >
        {images &&
          images.map((image, index) => (
            <div
              key={index}
              style={{
                flex: '0 0 20%',
                maxWidth: '20%',
                padding: '4px',
                boxSizing: 'border-box'
              }}
            >
              <img
                src={image.thumbnailImageSrc}
                alt={image.alt}
                style={{
                  cursor: 'pointer',
                  width: '100%',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
                onClick={() => {
                  setActiveIndex(index);
                  galleria.current.show();
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Gallery;