import React, { useState, useEffect } from "react";
import { Copy, RefreshCw, Mail, Edit2 } from "lucide-react";
import { userAuthStore } from "../store/userAuthStore";

const TempMailPage = () => {
  const { createSession, createEmail, getAllEmails } = userAuthStore();

  // State management
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [inbox, setInbox] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [autorefresh, setAutorefresh] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Restore session from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedToken = localStorage.getItem("token");
    if (savedEmail) setEmail(JSON.parse(savedEmail));
    if (savedToken) setToken(savedToken);
  }, []);

  // Initialize session and email
  useEffect(() => {
    const initSession = async () => {
      if (!token) {
        setIsLoading(true);
        try {
          const res = await createSession();
          const newToken = res?.data?.token;
          if (newToken) {
            setToken(newToken);
            localStorage.setItem("token", newToken);
            const emailRes = await createEmail(newToken);
            setEmail(emailRes);
            localStorage.setItem("email", JSON.stringify(emailRes));
          }
        } catch (err) {
          setError("Failed to create session. Please try again.");
          console.error("Session creation failed:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    initSession();
  }, [token]);

  // Autorefresh timer
  useEffect(() => {
    const interval = setInterval(() => {
      setAutorefresh((prev) => (prev === 1 ? 10 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch inbox emails
  useEffect(() => {
    const fetchInbox = async () => {
      if (email && token) {
        setIsLoading(true);
        try {
          const res = await getAllEmails(email);
          if (Array.isArray(res)) {
            setInbox(res);
            if (!selectedMail && res.length > 0) {
              setSelectedMail(res[0]);
            }
          }
        } catch (err) {
          setError("Failed to fetch emails. Please refresh.");
          console.error("Fetching inbox failed:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (autorefresh === 10) fetchInbox();
  }, [autorefresh, email, token]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    // Consider using a toast notification instead of alert
    alert("Email copied to clipboard!");
  };

  const handleRefresh = () => {
    setAutorefresh(10);
    setError(null);
  };

  const handleChangeEmail = async () => {
    setIsLoading(true);
    try {
      const newEmail = await createEmail(token);
      setEmail(newEmail);
      setInbox([]);
      setSelectedMail(null);
      localStorage.setItem("email", JSON.stringify(newEmail));
    } catch (err) {
      setError("Failed to change email. Please try again.");
      console.error("Changing email failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-4 md:p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="text-blue-400">@</span>Void
          <span className="text-blue-500">mail</span>.fun
        </h1>
        <p className="text-gray-400">Disposable temporary email service</p>
      </header>

      {/* Email Address Card */}
      <div className="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">Your temporary email</h2>
            <p className="text-sm text-gray-400">
              Expires after 24 hours of inactivity
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm disabled:opacity-50"
            >
              <RefreshCw size={16} />
              {isLoading ? "Refreshing..." : "Refresh"}
            </button>
            <button
              onClick={handleChangeEmail}
              disabled={isLoading}
              className="flex items-center gap-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm disabled:opacity-50"
            >
              <Edit2 size={16} />
              Change
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={email || ""}
              readOnly
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg pr-12"
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white"
              title="Copy to clipboard"
            >
              <Copy size={18} />
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center text-sm text-gray-400">
          <span className="flex items-center gap-2">
            <RefreshCw size={14} />
            Auto-refresh in{" "}
            <span className="font-medium text-white px-2 py-0.5 bg-gray-700 rounded-full">
              {autorefresh}s
            </span>
          </span>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-900/50 text-red-200 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Inbox and Email Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inbox Panel */}
        <div className="lg:col-span-1 bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700 bg-gray-900/50">
            <h3 className="font-semibold flex items-center gap-2">
              <Mail size={18} /> Inbox
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {inbox.length} {inbox.length === 1 ? "email" : "emails"}
            </p>
          </div>

          {isLoading && !inbox.length ? (
            <div className="p-6 text-center text-gray-500">
              Loading emails...
            </div>
          ) : inbox.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Your inbox is empty. Share your temporary email to receive messages.
            </div>
          ) : (
            <div className="divide-y divide-gray-700 max-h-[500px] overflow-y-auto">
              {inbox.map((mail, index) => (
                <div
                  key={index}
                  className={`p-4 hover:bg-gray-700/50 cursor-pointer transition-colors ${
                    selectedMail === mail ? "bg-gray-700" : ""
                  }`}
                  onClick={() => setSelectedMail(mail)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium truncate">
                      {mail.from || "Unknown Sender"}
                    </h4>
                    <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                      {new Date(mail.date).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-blue-400 truncate mt-1">
                    {mail.subject || "No Subject"}
                  </p>
                  <p className="text-xs text-gray-400 truncate mt-1">
                    {mail.text || mail.body || "No preview available"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Email Viewer Panel */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {selectedMail ? (
            <>
              <div className="p-4 border-b border-gray-700 bg-gray-900/50">
                <h3 className="text-lg font-semibold">{selectedMail.subject}</h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-400">
                    From: <span className="text-white">{selectedMail.from}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(selectedMail.date).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <pre className="whitespace-pre-wrap font-sans text-gray-300">
                  {selectedMail.text || selectedMail.body}
                </pre>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-gray-500 h-full flex items-center justify-center">
              <div>
                <Mail size={48} className="mx-auto mb-4 text-gray-600" />
                <h3 className="text-lg font-medium mb-2">No email selected</h3>
                <p className="text-sm">
                  {inbox.length > 0
                    ? "Select an email from your inbox to view"
                    : "Your inbox is currently empty"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>Voidmail.fun - Temporary disposable email service</p>
        <p className="mt-1">
          Messages are automatically deleted after 24 hours
        </p>
      </footer>
    </div>
  );
};

export default TempMailPage;
