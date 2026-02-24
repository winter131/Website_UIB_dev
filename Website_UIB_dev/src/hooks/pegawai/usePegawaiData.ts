import { useState } from "react";

// Dummy hook created to bypass Next.js build module resolution error 
// because UserView.tsx imported this missing file.
export const usePegawaiData = (token?: any, status?: any) => {
    return {
        data: [],
        isLoading: false,
        refetch: () => { }
    };
};
