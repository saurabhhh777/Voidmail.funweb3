import { useEffect } from 'react';
import { userAuthStore } from '../../store/userAuthStore';

const SessionProvider = ({ children }) => {
    const { sessionId, createSession } = userAuthStore();

    useEffect(() => {
        // Create session if one doesn't exist
        if (!sessionId) {
            createSession();
        }
    }, [sessionId, createSession]);

    return children;
};

export default SessionProvider; 