// import { data } from "react-router-dom";
// import { supabase } from "../supabase/supabase";
import axios from "axios"

// export const InsertCategories = async ({ TableName, Name, Budget, Color, UserId }) => {
//     try {
//         const { data, error } = await supabase
//             .from(TableName)
//             .insert({ name: Name, budget: Budget, color: Color, userId: UserId })
//             .select()
//         if (error) throw error;

//         return data;
//     } catch (error) {
//         console.log(error);

//     }
// }

// export const InsertIncome = async ({ DateData, Desc, Amount, Source, UserId }) => {
//     try {
//         const { data, error } = await supabase
//             .from('income')
//             .insert({ date: DateData, description: Desc, amount: Amount, source: Source, userId: UserId })
//             .select()
//         if (error) throw error;

//         return data;
//     } catch (error) {
//         console.log(error);

//     }
// }

// export const GetAllData = async ({ TableName, ColName, ColValue }) => {
//     console.log('Fetching:', TableName, ColName, ColValue);
//     try {
//         const { data, error } = await supabase
//             .from(TableName)
//             .select()
//             .eq(ColName, ColValue)
//         if (error) throw error;

//         return data;
//     } catch (error) {
//         console.log(data);

//     }
// }

// export const DeleteData = async ({ TableName, ColName, ColValue }) => {
//     try {
//         const { data, error } = await supabase
//             .from(TableName)
//             .delete()
//             .eq(ColName, ColValue)
//             .select()

//         if (error) throw error;
//         return data;
//     } catch (error) {
//         console.log(error);

//     }
// }


export const InsertExpenseData = async ({ formData }) => {
    try {
        const data = await axios.post('http://localhost:5000/auth/insertExpense', formData);
        console.log(data);
        return data;

    } catch (error) {
        console.log(error);

    }
}

export const GetExpenseData = async ({User}) => {
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

export const GetIncomeData = async ({User}) => {
    try {
        const data = await axios.get(`http://localhost:5000/auth/getIdIncome/${User}`);
        console.log(data);
        return data
    } catch (error) {
        console.log(error);

    }
}