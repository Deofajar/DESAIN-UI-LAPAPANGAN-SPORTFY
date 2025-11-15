import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { SchedulePage } from './components/SchedulePage';
import { VenueDetailPage } from './components/VenueDetailPage';
import { BookingFormPage } from './components/BookingFormPage';
import { CompletePage } from './components/CompletePage';
import { CheckBookingPage } from './components/CheckBookingPage';
import { OpenMatchPage } from './components/OpenMatchPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';

type Page = 'home' | 'schedule' | 'venue-detail' | 'booking' | 'complete' | 'check' | 'open-match';
type AuthPage = 'login' | 'register';

interface BookingData {
  court: string;
  date: string;
  time: string;
  price: number;
  sport: string;
  name?: string;
  phone?: string;
  email?: string;
  teamName?: string;
  findOpponent?: boolean;
  findPlayers?: boolean;
  bookingCode?: string;
}

interface VenueData {
  id: string;
  name: string;
  sport: string;
  location: string;
  rating: number;
  priceFrom: number;
  image: string;
  totalCourts: number;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authPage, setAuthPage] = useState<AuthPage>('login');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedDate, setSelectedDate] = useState('');
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<VenueData | null>(null);

  const handleNavigate = (page: Page, data?: any) => {
    if (page === 'schedule') {
      setSelectedDate(data || new Date().toISOString().split('T')[0]);
      setCurrentPage('schedule');
    } else if (page === 'venue-detail') {
      setSelectedVenue(data.venue);
      setSelectedDate(data.date);
      setCurrentPage('venue-detail');
    } else if (page === 'booking') {
      setBookingData(data);
      setCurrentPage('booking');
    } else if (page === 'complete') {
      setBookingData(data);
      setCurrentPage('complete');
    } else {
      setCurrentPage(page);
    }
    
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  const handleBackToSchedule = () => {
    setCurrentPage('schedule');
    window.scrollTo(0, 0);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthPage('login');
    setCurrentPage('home');
  };

  const handleSwitchToRegister = () => {
    setAuthPage('register');
  };

  const handleSwitchToLogin = () => {
    setAuthPage('login');
  };

  // Show login/register page if not logged in
  if (!isLoggedIn) {
    return (
      <>
        {authPage === 'login' ? (
          <LoginPage 
            onLogin={handleLogin} 
            onSwitchToRegister={handleSwitchToRegister}
          />
        ) : (
          <RegisterPage 
            onRegister={handleRegister} 
            onSwitchToLogin={handleSwitchToLogin}
          />
        )}
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
      />
      
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}
        
        {currentPage === 'schedule' && (
          <SchedulePage
            selectedDate={selectedDate}
            onNavigate={handleNavigate}
            onBack={handleBack}
          />
        )}
        
        {currentPage === 'venue-detail' && selectedVenue && (
          <VenueDetailPage
            venue={selectedVenue}
            selectedDate={selectedDate}
            onNavigate={handleNavigate}
            onBack={handleBackToSchedule}
          />
        )}
        
        {currentPage === 'booking' && bookingData && (
          <BookingFormPage
            bookingData={bookingData}
            onNavigate={handleNavigate}
            onBack={handleBack}
          />
        )}
        
        {currentPage === 'complete' && bookingData && (
          <CompletePage
            bookingData={bookingData}
            onNavigate={handleNavigate}
          />
        )}
        
        {currentPage === 'check' && (
          <CheckBookingPage onNavigate={handleNavigate} />
        )}
        
        {currentPage === 'open-match' && (
          <OpenMatchPage onNavigate={handleNavigate} />
        )}
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
}
