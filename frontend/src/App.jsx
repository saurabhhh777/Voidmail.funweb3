import SessionProvider from './components/SessionProvider';
import EmailDisplay from './components/EmailDisplay';

function App() {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto py-8">
          <EmailDisplay />
        </div>
      </div>
    </SessionProvider>
  );
}

export default App; 