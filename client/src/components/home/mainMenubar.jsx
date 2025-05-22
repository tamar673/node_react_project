import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext'; // אם תרצה תיבת חיפוש
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button'; // אם תרצה כפתורים נוספים
import { useNavigate } from 'react-router-dom'; // לייבוא אם אתה רוצה ניווט פנימי
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../appState/tokenSlice.jsx';
import Login from './login.jsx'

const MainMenubar = () => {
    const { token, role, user } = useSelector((state) => state.token);
    const navigate = useNavigate(); // Hook מ-react-router-dom לניווט
    const dispatch = useDispatch();

    const items = [
        ...(role === null ? [{
            label: 'בית',
            icon: 'pi pi-home',
            command: () => { navigate('/'); }
        }]:[]),
        ...(role === null ? [{
            label: 'זמני תפילות',
            icon: 'pi pi-clock',
            command: () => { navigate('/DaveningTimes'); }
        }]:[]),
        ...(role === null ? [{
            label: 'מראי מקומות',
            icon: 'pi pi-align-justify',
            command: () => { navigate('/ReferenceSources'); }
        }]:[]),

        {
            label: 'גלריה',
            icon: 'pi pi-images',
            command: () => { navigate('/Gallery'); },
            items: [
                {
                    label: 'לכל התמונות',
                    command: () => { navigate('/Gallery'); }
                },
                {
                    label: 'סיומים',
                    command: () => { navigate('/Gallery',{ state: { type: 'syumim' } }); }
                },
                {
                    label: 'טיולים',
                    command: () => { navigate('/Gallery',{ state: { type: 'trips' } }); }
                },
                {
                    label: 'תמונות אחרונות',
                    command: () => { navigate('/Gallery',{ state: { type: 'from_the_last_time' } }); }
                },
                {
                    label: 'יום בישיבה',
                    command: () => { navigate('/Gallery',{ state: { type: 'day_in_yeshiva' } }); }
                },
                {
                    label: 'רבנים והישיבה',
                    command: () => { navigate('/Gallery',{ state: { type: 'whithRabanim' } }); }
                },

            ]
        },
        ...(role !==null ? [{
            label: 'השגים',
            icon: 'pi pi-check',
            command: () => { navigate('/Achievemens',{ state: { type: 'student' } }); }
        }] : []),
        ...(role === "manager" ? [
            {
                label: 'אנשי צוות ',
                icon: 'pi pi-users',
                command: () => { navigate('/Users',{ state: { type: 'staff' } }); }
            }] : []),
        ...(role==="manager"||role==="staff"?[
            {
            label: 'תלמידים',
            icon: 'pi pi-users',
            command: () => { navigate('/Users'); }
        }]:[]),
        ...(role !== null ? [{
            label: 'מבצעים',
            icon: 'pi pi-trophy',
            command: () => { navigate('/Plans'); }
        }]:[]),
    ];

    const logout = () => {
        dispatch(logOut());
        navigate('./')

    }
   
    const endContent = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="חיפוש..." type="text" className="w-8rem sm:w-auto" />
            {role == null ? <Login /> :
                <><Avatar label={user.name} size="large" shape="circle" className="mr-2" />
                    <h3>{role}</h3>
                    <Button rounded onClick={() => { logout() }}> להתנתקות </Button></>
            }


        </div>
    );

    return (
        <Menubar model={items} end={endContent} />
    );
};

export default MainMenubar;




