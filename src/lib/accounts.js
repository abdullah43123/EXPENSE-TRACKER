import axios from "axios"

export const InsertExpenseData = async ({ formData }) => {
    try {
        const data = await axios.post('https://expense-tracker-backend-production-f9ad.up.railway.app/auth/insertExpense', formData);
        
        // const data = await axios.post('http://localhost:5000/auth/insertExpense', formData);

        console.log(data);
        return data;

    } catch (error) {
        console.log(error);

    }
}

export const GetExpenseData = async ({ User }) => {
    try {
        const data = await axios.get(`https://expense-tracker-backend-production-f9ad.up.railway.app/auth/getIdExpense/${User}`);
        // const data = await axios.get(`http://localhost:5000/auth/getIdExpense/${User}`);
        console.log(data);
        return data
    } catch (error) {
        console.log(error);

    }
}

export const InsertIncomeData = async ({ formData }) => {
    try {
        const data = await axios.post('https://expense-tracker-backend-production-f9ad.up.railway.app/auth/income', formData);
        // const data = await axios.post('http://localhost:5000/auth/income', formData);
        console.log(data);
        return data;

    } catch (error) {
        console.log(error);

    }
}

export const GetIncomeData = async ({ User }) => {
    try {
        // const data = await axios.get(`http://localhost:5000/auth/getIdIncome/${User}`);
        const data = await axios.get(`https://expense-tracker-backend-production-f9ad.up.railway.app/auth/getIdIncome/${User}`);
        console.log(data);
        return data
    } catch (error) {
        console.log(error);

    }
}

export const VerifyData = async () => {
    try {
        // const data = await axios.get(`http://localhost:5000/api/user/get`);
        const data = await axios.get(`https://expense-tracker-backend-production-f9ad.up.railway.app/api/user/get`);
        console.log(data);
        return data
    } catch (error) {
        console.log(error);

    }
}