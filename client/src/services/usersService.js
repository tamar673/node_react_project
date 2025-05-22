import axios from 'axios';
// import { baseURL } from '../App';  //  Make sure this path is correct, and that you have a baseURL exported.
const baseURL = 'http://localhost:1100/api/user/';


const usersServiceURL = `${baseURL}users`; // Consistent naming

const getUsersByType = async (type,token) => {
    const gallery=await axios.get(`${baseURL} ${type}`,{headers:{Authorization:`Bearer ${token}`}})
        return gallery.json();
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
