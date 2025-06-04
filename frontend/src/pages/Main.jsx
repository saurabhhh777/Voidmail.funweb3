import React, { useState, useEffect } from "react";
import { Copy, RefreshCw, Mail, Edit2 } from "lucide-react";
import {Toaster,toast} from "react-hot-toast";

import { userAuthStore } from "../../store/userAuthStore";
import Footer from "../components/Footer";
import CtaSection from "../components/CtaSection";

const Main = () => {
  const { createSession, createEmail, getAllEmails } = userAuthStore();

  // State management (unchanged)
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [inbox, setInbox] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [autorefresh, setAutorefresh] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // All useEffect hooks remain exactly the same
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedToken = localStorage.getItem("token");
    if (savedEmail) setEmail(JSON.parse(savedEmail));
    if (savedToken) setToken(savedToken);
  }, []);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setAutorefresh((prev) => (prev === 1 ? 10 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

  // All handler functions remain exactly the same
  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    toast.success("Email Copied",{
      style:{
        background:"#151517",
        color:"white",
        border:"1px solid #ffffff08"
      }
    })
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
      toast.success("Email changed successfully", {
        style: {
          background: "#151517",
          color: "white",
          border: "1px solid #ffffff08"
        }
      });
    } catch (err) {
      setError("Failed to change email. Please try again.");
      console.error("Changing email failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Updated UI with new color scheme and design
  return (
    <div className="min-h-screen bg-[#0e0e10] text-gray-100 p-4 md:p-8">
      <Toaster/>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-[#10B981]">
          Voidmail.fun
        </h1>
        <p className="text-gray-400">Secure temporary email service</p>
      </header>

      {/* Email Address Card */}
      <div className="bg-[#151517] rounded-xl p-6 mb-6 border border-[#ffffff08]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">Your temporary email</h2>
            <p className="text-sm text-gray-400">
              Automatically expires after 24 hours
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-1 px-3 py-2 bg-[#10B981] hover:bg-[#10B981]/90 rounded-lg text-sm disabled:opacity-50 transition-colors"
            >
              <RefreshCw size={16} />
              {isLoading ? "Refreshing..." : "Refresh"}
            </button>
            <button
              onClick={handleChangeEmail}
              disabled={isLoading}
              className="flex items-center gap-1 px-3 py-2 bg-[#ffffff08] hover:bg-[#ffffff12] rounded-lg text-sm disabled:opacity-50 transition-colors"
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
              className="w-full px-4 py-3 bg-[#0e0e10] border border-[#ffffff08] rounded-lg pr-12 focus:outline-none focus:ring-1 focus:ring-[#10B981]"
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-[#10B981] transition-colors"
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
            <span className="font-medium text-white px-2 py-0.5 bg-[#ffffff08] rounded-full">
              {autorefresh}s
            </span>
          </span>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-900/50 text-red-200 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Inbox and Email Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inbox Panel */}
        <div className="lg:col-span-1 bg-[#151517] rounded-xl border border-[#ffffff08] overflow-hidden">
          <div className="p-4 border-b border-[#ffffff08] bg-[#ffffff03]">
            <h3 className="font-semibold flex items-center gap-2">
              <Mail size={18} className="text-[#10B981]" /> Inbox
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
              Your inbox is empty. Share your temporary email to receive
              messages.
            </div>
          ) : (
            <div className="divide-y divide-[#ffffff08] max-h-[500px] overflow-y-auto">
              {inbox.map((mail, index) => (
                <div
                  key={index}
                  className={`p-4 hover:bg-[#ffffff05] cursor-pointer transition-colors ${
                    selectedMail === mail ? "bg-[#ffffff08]" : ""
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
                  <p className="text-sm text-[#3B82F6] truncate mt-1">
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
        <div className="lg:col-span-2 bg-[#151517] rounded-xl border border-[#ffffff08] overflow-hidden">
          {selectedMail ? (
            <>
              <div className="p-4 border-b border-[#ffffff08] bg-[#ffffff03]">
                <h3 className="text-lg font-semibold">
                  {selectedMail.subject}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-400">
                    From:{" "}
                    <span className="text-white">{selectedMail.from}</span>
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
                <Mail size={48} className="mx-auto mb-4 text-[#ffffff08]" />
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

      <div className="mt-8 rounded-2xl">
        {/* CTA Section - Professional Gradient */}
        <CtaSection className="rounded-t-2xl"/>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Main;
