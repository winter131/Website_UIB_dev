import { useState } from "react";



export const usePegawaiData = (token?: any, status?: any) => {
    return {
        data: [],
        isLoading: false,
        refetch: () => { }
    };
};