import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import WorkerDashboard from './pages/WorkerDashboard';
import AssessorDashboard from './pages/AssessorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AssessmentFlow from './pages/AssessmentFlow';
import { NetworkProvider } from './hooks/useNetwork';

function App() {
  return (
    <NetworkProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
          <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center font-bold text-xl">R</div>
                <span className="text-xl font-bold text-gray-900">RPL Platform</span>
              </Link>
              <nav className="flex space-x-4">
                <Link to="/worker" className="text-gray-600 hover:text-blue-600 font-medium text-sm">Worker</Link>
                <Link to="/assessor" className="text-gray-600 hover:text-blue-600 font-medium text-sm">Assessor</Link>
                <Link to="/admin" className="text-gray-600 hover:text-blue-600 font-medium text-sm">Admin</Link>
              </nav>
            </div>
          </header>
          
          <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/worker" element={<WorkerDashboard />} />
              <Route path="/worker/assessment" element={<AssessmentFlow />} />
              <Route path="/assessor" element={<AssessorDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </NetworkProvider>
  );
}

export default App;
