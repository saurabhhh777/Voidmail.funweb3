import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-[#0e0e10] text-white py-8 mt-16">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Voidmail. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 space-x-4">
                <a href="/privacy-policy" className="text-gray-400 hover:text-indigo-400 transition-colors">Privacy Policy</a>
                <a href="/terms-of-service" className="text-gray-400 hover:text-indigo-400 transition-colors">Terms of Service</a>
            </div>
            </div>
        </footer>   

    </div>
  )
}

export default Footer