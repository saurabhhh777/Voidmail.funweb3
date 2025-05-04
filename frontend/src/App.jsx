import React, { useState, useEffect } from "react";
import { Copy } from "lucide-react";
import { userAuthStore } from "../store/userAuthStore";

const dummyEmail = {
  from: "Voidmail.fun Team",
  subject: "Welcome to Voidmail.fun",
  body: `Hi dfr,\n\nYour temp e-mail address is ready\n\nIf you need help read the information below and do not hesitate to contact us.\n\nAll the best,\nTempmailo Team`,
};

export default function TempMailPage() {
  const { createSession, createEmail, getAllEmails } = userAuthStore();

  const [email, setEmail] = useState(() => {
    const savedEmail = localStorage.getItem("email");
    try {
      return savedEmail ? JSON.parse(savedEmail) : "";
    } catch (err) {
      return "";
    }
  });

  const [sessionCreated, setsessionCreated] = useState(() => {
    const savedSession = localStorage.getItem("sessionCreated");
    return savedSession ? savedSession : false;
  });

  const [autorefresh, setAutorefresh] = useState(10);
  const [inbox, setInbox] = useState([dummyEmail]);
  const [selectedMail, setSelectedMail] = useState(dummyEmail);
  const [token, settoken] = useState("");
  // const [changeEmail, setchangeEmail] = useState(false);
  // const [showConfirm, setshowConfirm] = useState(false);

  useEffect(() => {
    localStorage.setItem("sessionCreated", JSON.stringify(sessionCreated));
  }, [sessionCreated]);

  useEffect(() => {
    const createSessionCall = async () => {
      const res = await createSession();
      if (res) {
        const newToken = res.data.token;
        setsessionCreated(true);
        settoken(newToken);
        const emailResponse = await createEmail(newToken);
        setEmail(emailResponse);
      }
    };

    sessionCreated === false && createSessionCall(token);
  }, [sessionCreated]);

  async function onlyCreateEmail(token) {
    try {
      const res = await createEmail(token);
      console.log("Main hu email", res);
      setEmail(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (typeof email === "string") {
      localStorage.setItem("email", JSON.stringify(email));
    }
  }, [email]);

  useEffect(() => {
    const timer = setInterval(() => {
      setAutorefresh((prev) => (prev === 1 ? 10 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await getAllEmails(email);
        console.log("Fetched emails:", response);
        setInbox(response);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    if (autorefresh === 10 && email) {
      fetchEmails();
    }
  }, [autorefresh, email]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    alert("Email copied!");
  };

  const handleRefresh = () => {
    setInbox((prev) => [...prev, dummyEmail]);
    setSelectedMail(dummyEmail);
    setAutorefresh(10);
  };

  const handleChangeEmail = () => {
    onlyCreateEmail(token);
  };

  return (
    <div className="p-6 font-sans w-screen h-screen mx-auto bg-[#08141c] text-white">
      <h1 className="text-3xl font-bold mb-4 text-[#445460]">
        <span className="text-[#445460]">@</span>Void
        <span className="text-blue-600">mail</span>.fun
      </h1>
      <div className="p-4 rounded-lg shadow mb-4 bg-[#121f2a]">
        <label className="font-medium">Your temporary email address</label>
        <div className="flex items-center mt-2">
          <input
            type="text"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-3 bg-black text-white py-2 border border-gray-300 rounded-l-lg"
          />
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-gray-300 rounded-r-lg hover:bg-gray-400"
          >
            <Copy size={16} /> Copy
          </button>
        </div>
        <div className="flex gap-4 items-center mt-2 text-sm text-white">
          <span>
            Autorefresh in{" "}
            <span className="font-semibold border-2 pl-1.5 pr-1.5 rounded-full">
              {autorefresh}
            </span>
          </span>
          <button className="hover:underline" onClick={handleRefresh}>
            🔄 Refresh
          </button>
          <button className="hover:underline" onClick={handleChangeEmail}>
            ✏️ Change
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 bg-[#121f2a] shadow">
        <div className="col-span-1 border rounded shadow">
          <div className="border-b p-3 font-semibold">Inbox</div>
          {inbox.length === 0 ? (
            <div className="p-3 text-gray-400">Inbox is empty.</div>
          ) : (
            inbox.map((mail, index) => (
              <div
                key={index}
                className={`p-3 cursor-pointer hover:bg-gray-600 hover:rounded-2xl ${
                  selectedMail === mail ? "bg-gray-700 rounded-2xl" : ""
                }`}
                onClick={() => setSelectedMail(mail)}
              >
                <div className="font-bold">{mail.from || "Unknown Sender"}</div>
                <div className="text-sm text-blue-600">{mail.subject}</div>
                <div className="text-xs truncate">{mail.body}</div>
              </div>
            ))
          )}
        </div>

        <div className="col-span-2 border rounded shadow p-4">
          <div className="font-semibold text-lg mb-2">
            {selectedMail?.subject || "No Subject"}
          </div>
          <pre className="whitespace-pre-wrap text-sm">
            {selectedMail?.text || selectedMail?.body || "No content"}
          </pre>
        </div>
      </div>
    </div>
  );
}
