import axios from "axios"

export const LoginUser = async ({ formData }) => {
    try {
        // const res = await axios.post('http://localhost:5000/auth/login', formData)
        const res = await axios.post('https://expense-tracker-backend-production-f9ad.up.railway.app/auth/login', formData)
        console.log(res);
        return res;

    } catch (error) {
        console.log(error);

    }
}

export const CreateUser = async ({ formData }) => {
    try {
        // const res = await axios.post('http://localhost:5000/auth/register', formData)
        const res = await axios.post('https://expense-tracker-backend-production-f9ad.up.railway.app/auth/register', formData)
        console.log(res);
        return res;

    } catch (error) {
        console.log(error);

    }
}

export const InsertSession = async ({ formData }) => {
    try {
        const res = await axios.post('https://expense-tracker-backend-production-f9ad.up.railway.app/auth/session', formData)
        // const res = await axios.post('http://localhost:5000/auth/session', formData)
        console.log(res);
        return res;

    } catch (error) {
        console.log(error);

    }
}

export const GetSession = async ({ Token }) => {
    console.log('Frontend Token', Token);

    try {
        // const res = await axios.get(`http://localhost:5000/auth/getSession/${Token}`);
        const res = await axios.get(`https://expense-tracker-backend-production-f9ad.up.railway.app/${Token}`);
        // console.log(res);
        return res;

    } catch (error) {
        console.log(error);

    }
}