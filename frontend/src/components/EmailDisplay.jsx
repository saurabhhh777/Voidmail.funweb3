import { useEffect } from 'react';
import { userAuthStore } from '../../store/userAuthStore';

const EmailDisplay = () => {
    const { email, isLoading, error, createEmail } = userAuthStore();

    useEffect(() => {
        // Create email if it doesn't exist
        if (!email && !isLoading) {
            createEmail();
        }
    }, [email, isLoading, createEmail]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-red-500">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Your Temporary Email</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-lg font-mono">{email}</p>
            </div>
            <p className="text-sm text-gray-500 mt-2">
                This email will expire in 1 hour
            </p>
        </div>
    );
};

export default EmailDisplay; 