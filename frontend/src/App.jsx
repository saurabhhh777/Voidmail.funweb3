import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';
import { userAuthStore } from '../store/userAuthStore';

const dummyEmail = {
  from: 'TempMailo Team',
  subject: 'Welcome to Tempmailo',
  body: `Hi dfr,\n\nYour temp e-mail address is ready\n\nIf you need help read the information below and do not hesitate to contact us.\n\nAll the best,\nTempmailo Team`
};

export default function TempMailPage() {

  const { createUserSession } = userAuthStore();

  const [email, setEmail] = useState("");
  const [autorefresh, setAutorefresh] = useState(10);
  const [inbox, setInbox] = useState([dummyEmail]);
  const [selectedMail, setSelectedMail] = useState(dummyEmail);

  useEffect(() => {
    const initSession = async () => {
      const email = await createUserSession(); // This returns the email
      setEmail(email);
    };
  
    initSession();
  
    const timer = setInterval(() => {
      setAutorefresh((prev) => (prev === 1 ? 10 : prev - 1));
    }, 1000);
  
    return () => clearInterval(timer);
  }, []);
  

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    alert('Email copied!');
  };

  const handleRefresh = () => {
    // Simulate fetching new emails
    setInbox((prev) => [...prev, dummyEmail]);
    setSelectedMail(dummyEmail);
    setAutorefresh(10);

  }

  const handleChangeEmail = () => {
    // Simulate changing email
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < 8; i++) {
      randomString += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    const newEmail = `${randomString}@asksaurabh.xyz`;
    setEmail(newEmail);
    setInbox([dummyEmail]);
    setSelectedMail(dummyEmail);
    setAutorefresh(10);

  }

  return (
    <div className="p-6 font-sans max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-orange-500">
        <span className="text-yellow-600">@</span>TEMP<span className="text-blue-600">MAIL</span>.in
      </h1>
      <div className="bg-gray-100 p-4 rounded-lg shadow mb-4">
        <label className="font-medium">Your temporary email address</label>
        <div className="flex items-center mt-2">
          <input
            type="text"
            value={email}
            readOnly
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg bg-white"
          />
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-gray-300 rounded-r-lg hover:bg-gray-400"
          >
            <Copy size={16} /> Copy
          </button>
        </div>
        <div className="flex gap-4 items-center mt-2 text-sm text-gray-600">
          <span>Autorefresh in <span className="font-semibold text-black border-2 pl-1.5 pr-1.5  rounded-full">{autorefresh}</span></span>
          <button className="hover:underline" onClick={handleRefresh}>🔄 Refresh</button>
          <button className="hover:underline" onClick={handleChangeEmail}>✏️ Change</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 border rounded shadow">
          <div className="border-b p-3 font-semibold">Inbox</div>
          <div className="p-3 hover:bg-gray-200 cursor-pointer" onClick={() => setSelectedMail(dummyEmail)}>
            <div className="font-bold">Hello</div>
            <div className="text-sm text-blue-600">{dummyEmail.subject}</div>
            <div className="text-xs text-gray-500 truncate">{dummyEmail.body}</div>
          </div>
        </div>

        <div className="col-span-2 border rounded shadow p-4">
          <div className="font-semibold text-lg mb-2">Welcome</div>
          <pre className="whitespace-pre-wrap text-sm text-gray-700">{selectedMail.body}</pre>
        </div>
      </div>
    </div>
  );
}