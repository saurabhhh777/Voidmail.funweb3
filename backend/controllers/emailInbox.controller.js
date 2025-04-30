import EmailInbox from '../models/emailInbox.model.js';

export const getAllEmails = async (req, res) => {
    try {
        // Get the email from the request body
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Find all emails where the 'to' field matches the provided email
        const emails = await EmailInbox.find({ to: email })
            .sort({ createdAt: -1 }); // Sort by most recent first



        console.log('Retrieved emails:', emails);

        return res.status(200).json({
            success: true,
            message: 'Emails retrieved successfully',
            data: emails
        });
    } catch (error) {
        console.error('Error in getAllEmails:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

