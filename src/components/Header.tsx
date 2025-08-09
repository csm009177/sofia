import React from 'react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { useApp } from './AppContext';
import { Moon, Sun, Languages, Settings } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Header({ currentPage, onPageChange }: HeaderProps) {
  const { language, setLanguage, theme, setTheme, t } = useApp();

  const toggleLanguage = () => {
    setLanguage(language === 'ko' ? 'ru' : 'ko');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navItems = [
    { id: 'home', label: '대시보드' },
    { id: 'schedule', label: '전체 스케줄' },
    { id: 'homework', label: '전체 숙제' },
    { id: 'admin', label: '관리자' }
  ];

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl text-primary cursor-pointer" onClick={() => onPageChange('home')}>
              Sofia's 한국어 교실
            </h1>
            <nav className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? 'default' : 'ghost'}
                  onClick={() => onPageChange(item.id)}
                  size="sm"
                >
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Languages className="h-4 w-4" />
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="min-w-[60px]"
              >
                {language === 'ko' ? '한국어' : 'Русский'}
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
              />
              <Moon className="h-4 w-4" />
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <nav className="md:hidden mt-3 flex space-x-2 overflow-x-auto">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onPageChange(item.id)}
              className="whitespace-nowrap"
            >
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}