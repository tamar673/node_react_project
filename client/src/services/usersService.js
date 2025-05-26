
import axios from 'axios';
import achievementsService from './achievementsService'

const usersServiceURL = 'http://localhost:1100/api/user/';


const getUsersByType = async (type,token) => {
    console.log(type);
    const allUsers=await axios.get(`${usersServiceURL}${type}`,{headers:{Authorization:`Bearer ${token}`}})
    console.log(allUsers.data);
        return allUsers.data;

};

const createUser = async (token,Data) => {
    const create=await axios.post('http://localhost:1100/api/auth/',Data,{headers:{Authorization:`Bearer ${token}`}})
    return create.data;
};

const updateUser = async (updatedUserData,token) => { // consistent naming
    const user=await axios.put (`${usersServiceURL}`,updatedUserData,{headers:{Authorization:`Bearer ${token}`}})
    return user
};

const deleteUser = async (id,token) => {
    const user=await axios.delete (`${usersServiceURL}${id}`,{headers:{Authorization:`Bearer ${token}`}})
    // achievementsService.
    return user
};

export default {
    getUsersByType,
    createUser,
    updateUser,
    deleteUser,
};
