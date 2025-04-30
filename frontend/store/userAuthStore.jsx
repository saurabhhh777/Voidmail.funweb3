import {create} from "zustand";
import {persist} from "zustand/middleware";
import { axiosInstance } from "../lib/axios";

export const userAuthStore = create(persist((set) => ({
    sessionId: null,
    expiresAt: null,
    email: null,
    isLoading: false,
    error: null,

    createSession: async () => {
        try {
            set({ isLoading: true, error: null });
            const response = await axiosInstance.post('/api/v1/user/createUserSession');
            set({
                sessionId: response.data.data.sessionId,
                expiresAt: response.data.data.expiresAt,
                isLoading: false
            });

            console.log("Email of the user session:", response.data.data.email);
            return response.data.data.email; // Return the sessionId for further use
            

        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to create session',
                isLoading: false
            });
        }
    },

    createEmail: async () => {
        try {
            set({ isLoading: true, error: null });
            const { sessionId } = userAuthStore.getState();
            
            if (!sessionId) {
                throw new Error('No session found. Please create a session first.');
            }

            const response = await axiosInstance.post('/api/v1/user/createEmail', {
                sessionId
            });
            
            set({
                email: response.data.data.email,
                isLoading: false
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || error.message || 'Failed to create email',
                isLoading: false
            });
        }
    },

    clearSession: () => {
        set({
            sessionId: null,
            expiresAt: null,
            email: null,
            error: null
        });
    }
}), {
    name: 'user-auth-storage',
    partialize: (state) => ({
        sessionId: state.sessionId,
        expiresAt: state.expiresAt,
        email: state.email
    })
}));