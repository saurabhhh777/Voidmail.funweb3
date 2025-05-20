const { SMTPServer } = require("smtp-server");
const { simpleParser } = require("mailparser");
const axios = require("axios");

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,

    // Optional logging
    onConnect(session, cb) {
        console.log(`SMTP Connection from: ${session.remoteAddress}`);
        cb();
    },

    onMailFrom(address, session, cb) {
        console.log(`MAIL FROM: ${address.address}`);
        cb();
    },

    onRcptTo(address, session, cb) {
        console.log(`RCPT TO: ${address.address}`);
        cb();
    },

    onData(stream, session, cb) {
        simpleParser(stream, async (err, parsed) => {
            if (err) {
                console.error("❌ Email parse error:", err);
                return cb(err);
            }

            const emailData = {
                from: parsed.from?.text || '',
                to: parsed.to?.text || '',
                subject: parsed.subject || '',
                text: parsed.text || '',
                html: parsed.html || '',
                date: parsed.date || new Date()
            };

            console.log("📩 Parsed Email Received:", emailData);

            try {
                await axios.post("https://api.voidmail.fun/api/v1/email/saveEmail", emailData);
                console.log("✅ Email forwarded to Express backend");
            } catch (e) {
                console.error("❌ Failed to send email to Express:", e.message);
            }

            cb(); // Done processing
        });
    }
});

const PORT = 2525;

server.listen(PORT, () => {
    console.log(`📨 SMTP server is running on port ${PORT}`);
});
