const { SMTPServer } = require("smtp-server");
const { simpleParser } = require("mailparser");
const axios = require("axios");

// Configuration
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";
const ALLOWED_DOMAINS = [
    'voidmail.fun',
    'voidmail.email', 
    'bigtimer.site',
    'asksaurabh.xyz'
];

// Helper function to extract email addresses
function extractEmailAddress(addressString) {
    if (!addressString) return '';
    
    // Handle different formats: "Name <email@domain.com>" or "email@domain.com"
    const match = addressString.match(/<(.+?)>/) || addressString.match(/([^\s<>]+@[^\s<>]+)/);
    return match ? match[1] : addressString;
}

// Helper function to validate domain
function isValidDomain(email) {
    if (!email) return false;
    
    const domain = email.split('@')[1];
    return ALLOWED_DOMAINS.includes(domain);
}

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,
    disabledCommands: ['STARTTLS'], // Disable TLS for development

    // Optional logging
    onConnect(session, cb) {
        console.log(`🔗 SMTP Connection from: ${session.remoteAddress}`);
        cb();
    },

    onMailFrom(address, session, cb) {
        console.log(`📤 MAIL FROM: ${address.address}`);
        cb();
    },

    onRcptTo(address, session, cb) {
        const emailAddress = address.address;
        console.log(`📥 RCPT TO: ${emailAddress}`);
        
        // Validate if the recipient domain is allowed
        if (!isValidDomain(emailAddress)) {
            console.log(`❌ Rejected email to invalid domain: ${emailAddress}`);
            return cb(new Error(`Domain not supported: ${emailAddress.split('@')[1]}`));
        }
        
        cb();
    },

    onData(stream, session, cb) {
        console.log('📨 Processing incoming email...');
        
        simpleParser(stream, async (err, parsed) => {
            if (err) {
                console.error("❌ Email parse error:", err);
                return cb(err);
            }

            try {
                // Extract and clean email data
                const fromAddress = extractEmailAddress(parsed.from?.text || parsed.from?.value?.[0]?.address || '');
                const toAddresses = [];
                
                // Handle multiple recipients
                if (parsed.to) {
                    if (Array.isArray(parsed.to.value)) {
                        parsed.to.value.forEach(addr => {
                            const email = extractEmailAddress(addr.address);
                            if (isValidDomain(email)) {
                                toAddresses.push(email);
                            }
                        });
                    } else {
                        const email = extractEmailAddress(parsed.to.text);
                        if (isValidDomain(email)) {
                            toAddresses.push(email);
                        }
                    }
                }

                // Process CC and BCC if present
                ['cc', 'bcc'].forEach(field => {
                    if (parsed[field] && parsed[field].value) {
                        parsed[field].value.forEach(addr => {
                            const email = extractEmailAddress(addr.address);
                            if (isValidDomain(email) && !toAddresses.includes(email)) {
                                toAddresses.push(email);
                            }
                        });
                    }
                });

                // Handle attachments
                const attachments = [];
                if (parsed.attachments && parsed.attachments.length > 0) {
                    parsed.attachments.forEach(attachment => {
                        attachments.push({
                            filename: attachment.filename || 'unnamed',
                            contentType: attachment.contentType || 'application/octet-stream',
                            size: attachment.size || 0,
                            content: attachment.content ? attachment.content.toString('base64') : ''
                        });
                    });
                }

                // Create email data object
                const emailData = {
                    from: fromAddress,
                    subject: parsed.subject || 'No Subject',
                    text: parsed.text || '',
                    html: parsed.html || '',
                    date: parsed.date || new Date(),
                    attachments: attachments,
                    messageId: parsed.messageId || `${Date.now()}@voidmail.fun`,
                    references: parsed.references || [],
                    inReplyTo: parsed.inReplyTo || null
                };

                console.log("📧 Parsed Email Data:", {
                    from: emailData.from,
                    to: toAddresses,
                    subject: emailData.subject,
                    attachments: attachments.length,
                    hasHtml: !!emailData.html,
                    hasText: !!emailData.text
                });

                // Send to backend for each recipient
                const savePromises = toAddresses.map(async (toAddress) => {
                    const emailToSave = {
                        ...emailData,
                        to: toAddress
                    };

                    try {
                        const response = await axios.post(
                            `${BACKEND_URL}/api/v1/email`, 
                            emailToSave,
                            {
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                timeout: 10000 // 10 second timeout
                            }
                        );
                        
                        console.log(`✅ Email saved for ${toAddress}:`, response.data.success);
                        return { success: true, email: toAddress };
                    } catch (error) {
                        console.error(`❌ Failed to save email for ${toAddress}:`, error.message);
                        return { success: false, email: toAddress, error: error.message };
                    }
                });

                // Wait for all save operations
                const results = await Promise.all(savePromises);
                const successful = results.filter(r => r.success).length;
                const failed = results.filter(r => !r.success).length;

                console.log(`📊 Email processing complete: ${successful} saved, ${failed} failed`);

                if (failed > 0) {
                    console.log('❌ Failed emails:', results.filter(r => !r.success));
                }

            } catch (error) {
                console.error("❌ Unexpected error processing email:", error);
                return cb(error);
            }

            cb(); // Signal completion
        });
    },

    onError(err) {
        console.error('❌ SMTP Server error:', err);
    }
});

// Handle server errors
server.on('error', (err) => {
    console.error('❌ SMTP Server error:', err);
});

const PORT = process.env.SMTP_PORT || 2525;
const HOST = process.env.SMTP_HOST || '0.0.0.0';

server.listen(PORT, HOST, () => {
    console.log(`📨 SMTP server is running on ${HOST}:${PORT}`);
    console.log(`🏠 Backend URL: ${BACKEND_URL}`);
    console.log(`🌐 Accepting emails for domains: ${ALLOWED_DOMAINS.join(', ')}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down SMTP server...');
    server.close(() => {
        console.log('✅ SMTP server closed');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down SMTP server...');
    server.close(() => {
        console.log('✅ SMTP server closed');
        process.exit(0);
    });
});
