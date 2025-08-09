import React, { useState } from 'react';
import { AppProvider } from './components/AppContext';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { SchedulePage } from './components/SchedulePage';
import { AdminSchedulePage } from './components/AdminSchedulePage';
import { HomeworkPage } from './components/HomeworkPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'schedule':
        return <SchedulePage />;
      case 'admin':
        return <AdminSchedulePage />;
      case 'homework':
        return <HomeworkPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-background">
        <Header currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="min-h-[calc(100vh-4rem)]">
          {renderPage()}
        </main>
      </div>
    </AppProvider>
  );
}