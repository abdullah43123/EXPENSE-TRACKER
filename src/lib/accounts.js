import { data } from "react-router-dom";
import { supabase } from "../supabase/supabase";

export const InsertCategories = async ({ Name, Budget, Color, UserId }) => {
    try {
        const { data, error } = await supabase
            .from('categories   ')
            .insert({ name: Name, budget: Budget, color: Color, userId: UserId })
            .select()
        if (error) throw error;

        return data;
    } catch (error) {
        console.log(error);

    }
}

export const GetAllData = async ({ TableName, ColName, ColValue }) => {
    console.log('Fetching:', TableName, ColName, ColValue);
    try {
        const { data, error } = await supabase
            .from(TableName)
            .select()
            .eq(ColName, ColValue)
        if (error) throw error;

        return data;
    } catch (error) {
        console.log(data);

    }
}

export const DeleteData = async ({ TableName, ColName, ColValue }) => {
    try {
        const { data, error } = await supabase
            .from(TableName)
            .delete()
            .eq(ColName, ColValue)
            .select()

        if (error) throw error;
        return data;
    } catch (error) {
        console.log(error);

    }
}