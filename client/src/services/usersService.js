import axios from 'axios';
// import { baseURL } from '../App';  //  Make sure this path is correct, and that you have a baseURL exported.
const baseURL = '';
const mockUsersData = [
    {
        "name": "משה כהן",
        "identity_number": "123456789",
        "password": "hashed_password_1",
        "phone": "050-1234567",
        "address": "רחוב הארזים 10, תל אביב",
        "email": "moshe.cohen@example.com",
        "date_of_birth": "1990-05-15T00:00:00.000Z",
        "status": "תלמיד",
        "active": true
    },
    {
        "name": "שרה לוי",
        "identity_number": "987654321",
        "password": "hashed_password_2",
        "phone": "052-9876543",
        "address": "שדרות ירושלים 5, חיפה",
        "email": "sara.levi@example.com",
        "date_of_birth": "1985-11-22T00:00:00.000Z",
        "status": "איש צוות",
        "active": true
    },
    {
        "name": "דוד ישראלי",
        "identity_number": "112233445",
        "password": "hashed_password_3",
        "phone": "054-1122334",
        "address": "רחוב הנגב 20, באר שבע",
        "email": "david.israeli@example.com",
        "date_of_birth": "1978-03-01T00:00:00.000Z",
        "status": "מנהל",
        "active": true
    },
    {
        "name": "רבקה מזרחי",
        "identity_number": "554433221",
        "password": "hashed_password_4",
        "phone": "053-5544332",
        "address": "רחוב הגליל 7, ירושלים",
        "email": "rivka.mizrahi@example.com",
        "date_of_birth": "1995-07-08T00:00:00.000Z",
        "status": "תלמיד",
        "active": true
    },
    {
        "name": "יוסף חסון",
        "identity_number": "998877665",
        "password": "hashed_password_5",
        "phone": "058-9988776",
        "address": "רחוב הים 3, אילת",
        "email": "yosef.hasson@example.com",
        "date_of_birth": "1982-09-10T00:00:00.000Z",
        "status": "איש צוות",
        "active": true
    },
    {
        "name": "מרים פרץ",
        "identity_number": "102030405",
        "password": "hashed_password_6",
        "phone": "050-1020304",
        "address": "כיכר העצמאות 1, נתניה",
        "email": "miriam.peretz@example.com",
        "date_of_birth": "2000-01-25T00:00:00.000Z",
        "status": "תלמיד",
        "active": true
    },
    {
        "name": "שמעון כץ",
        "identity_number": "607080901",
        "password": "hashed_password_7",
        "phone": "052-6070809",
        "address": "רחוב הרצל 40, רחובות",
        "email": "shimon.katz@example.com",
        "date_of_birth": "1970-04-03T00:00:00.000Z",
        "status": "מנהל",
        "active": true
    },
    {
        "name": "נועה אברהם",
        "identity_number": "246813579",
        "password": "hashed_password_8",
        "phone": "054-2468135",
        "address": "שדרות בן גוריון 12, אשדוד",
        "email": "noa.avraham@example.com",
        "date_of_birth": "1998-02-14T00:00:00.000Z",
        "status": "תלמיד",
        "active": true
    },
    {
        "name": "איתי קליין",
        "identity_number": "135792468",
        "password": "hashed_password_9",
        "phone": "053-1357924",
        "address": "רחוב הגנים 8, כפר סבא",
        "email": "itay.klein@example.com",
        "date_of_birth": "1980-06-30T00:00:00.000Z",
        "status": "איש צוות",
        "active": true
    },
    {
        "name": "חנה לוין",
        "identity_number": "777888999",
        "password": "hashed_password_10",
        "phone": "058-7778889",
        "address": "רחוב הנשיא 15, רעננה",
        "email": "hana.levin@example.com",
        "date_of_birth": "1965-10-05T00:00:00.000Z",
        "status": "איש צוות",
        "active": true
    }
]

const usersServiceURL = `${baseURL}users`; // Consistent naming

const getUsersByType = async (type) => {
    try {
        console.log("in service");
        
        const response = mockUsersData;
        function getUsersByType(users, type) {
            return users.filter(user => user.status === type);
        }
        const students = getUsersByType(mockUsersData, "תלמיד");
        // const response = await axios.get(`${usersServiceURL}?status=${type}`);
        return students;
    } catch (error) {
        console.error(`Error fetching users by type ${type}`, error);
        throw error;
    }
};

const getUserById = async (id) => {
    try {
        const response = await axios.get(`${usersServiceURL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error);
        throw error;
    }
};

const createUser = async (newUserData) => { // consistent naming
    try {
        const response = await axios.post(usersServiceURL, newUserData);
        return response.data;
    } catch (error) {
        console.error('Error adding user:', error); // More specific message
        throw error;
    }
};

const updateUser = async (id, updatedUserData) => { // consistent naming
    try {
        const response = await axios.put(`${usersServiceURL}/${id}`, updatedUserData);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);  //  Simplified message
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${usersServiceURL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${usersServiceURL}/login`, userData); // Corrected URL to userServicesURL
        return response.data;
    } catch (error) {
        console.error("Error during login", error);
        throw error;
    }
};


export default {
    getUsersByType,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
};
