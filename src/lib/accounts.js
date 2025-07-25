import axios from "axios"

export const InsertExpenseData = async ({ formData }) => {
    try {
        const data = await axios.post('http://localhost:5000/auth/insertExpense', formData);
        console.log(data);
        return data;

    } catch (error) {
        console.log(error);

    }
}

export const GetExpenseData = async ({ User }) => {
    try {
        const data = await axios.get(`http://localhost:5000/auth/getIdExpense/${User}`);
        console.log(data);
        return data
    } catch (error) {
        console.log(error);

    }
}

export const InsertIncomeData = async ({ formData }) => {
    try {
        const data = await axios.post('http://localhost:5000/auth/income', formData);
        console.log(data);
        return data;

    } catch (error) {
        console.log(error);

    }
}

export const GetIncomeData = async ({ User }) => {
    try {
        const data = await axios.get(`http://localhost:5000/auth/getIdIncome/${User}`);
        console.log(data);
        return data
    } catch (error) {
        console.log(error);

    }
}

export const VerifyData = async () => {
    try {
        const data = await axios.get(`http://localhost:5000/api/user/get`);
        console.log(data);
        return data
    } catch (error) {
        console.log(error);

    }
}