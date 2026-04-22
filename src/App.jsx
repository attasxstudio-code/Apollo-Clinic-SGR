import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import OurDoctors from './pages/OurDoctors';
import Services from './pages/Services';
import Diagnostics from './pages/Diagnostics';
import Contact from './pages/Contact';
import BookAppointment from './pages/BookAppointment';
import BookCheckup from './pages/BookCheckup';
import FAQ from './pages/FAQ';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ReportVerify from './pages/ReportVerify';
import Reports from './pages/Reports';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-layout flex flex-col" style={{ minHeight: '100vh' }}>
          <Routes>
            {/* ── Admin routes — no public navbar/footer ── */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* ── Report pages — standalone, no navbar/footer ── */}
            <Route path="/reports" element={<Reports />} />
            <Route path="/report/:token" element={<ReportVerify />} />

            {/* ── Public routes — with Navbar and Footer ── */}
            <Route path="/*" element={
              <>
                <Navbar />
                <main style={{ flex: 1 }}>
                  <Routes>
                    <Route path="/"            element={<Home />} />
                    <Route path="/about"       element={<About />} />
                    <Route path="/doctors"     element={<OurDoctors />} />
                    <Route path="/services"    element={<Services />} />
                    <Route path="/diagnostics" element={<Diagnostics />} />
                    <Route path="/contact"     element={<Contact />} />
                    <Route path="/book"          element={<BookAppointment />} />
                    <Route path="/book-checkup"   element={<BookCheckup />} />
                    <Route path="/faq"             element={<FAQ />} />
                    <Route path="*"            element={<Home />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
