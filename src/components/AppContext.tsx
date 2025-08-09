"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "ko" | "ru";
type Theme = "light" | "dark";

interface AppContextType {
  language: string;
  setLanguage: (language: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  t: (key: TranslationKeys) => string; // 수정된 부분
}

type TranslationKeys =
  | "nav.schedule"
  | "nav.homework"
  | "nav.admin"
  | "nav.home"
  | "common.save"
  | "common.cancel"
  | "common.delete"
  | "common.edit"
  | "common.add"
  | "common.confirm"
  | "common.loading"
  | "home.getStarted"
  | "schedule.title" // 누락된 키 추가
  | "schedule.book" // 추가된 키
  | "schedule.available" // 추가된 키
  | "schedule.booked" // 추가된 키
  | "schedule.teacher" // 누락된 키 추가
  | "schedule.duration" // 추가된 키
  | "schedule.level" // 추가된 키
  | "schedule.beginner" // 추가된 키
  | "schedule.intermediate" // 누락된 키 추가
  | "schedule.advanced" // 추가된 키
  | "admin.title" // 누락된 키 추가
  | "admin.schedule" // 추가된 키
  | "admin.addSlot" // 추가된 키
  | "admin.time" // 추가된 키
  | "admin.date" // 누락된 키 추가
  | "admin.student" // 추가된 키
  | "homework.title" // 추가된 키
  | "homework.upload"
  | "homework.submitted"
  | "homework.pending"
  | "homework.graded"
  | "homework.feedback"
  | "homework.file"
  | "homework.description"
  | "home.welcome"
  | "home.description"
  | "home.features.title"
  | "home.features.personal"
  | "home.features.flexible"
  | "home.features.interactive"
  | "home.getStarted";

type Translations = {
  [language: string]: Record<TranslationKeys, string>;
};

const translations: Translations = {
  ko: {
    // Navigation
    "nav.schedule": "수업 일정",
    "nav.homework": "숙제",
    "nav.admin": "관리자",
    "nav.home": "홈",

    // Common
    "common.save": "저장",
    "common.cancel": "취소",
    "common.delete": "삭제",
    "common.edit": "편집",
    "common.add": "추가",
    "common.confirm": "확인",
    "common.loading": "로딩 중...",

    // Schedule
    "schedule.title": "수업 일정",
    "schedule.book": "예약하기",
    "schedule.available": "예약 가능",
    "schedule.booked": "예약됨",
    "schedule.teacher": "선생님: 소피아",
    "schedule.duration": "수업 시간: 60분",
    "schedule.level": "레벨",
    "schedule.beginner": "초급",
    "schedule.intermediate": "중급",
    "schedule.advanced": "고급",

    // Admin
    "admin.title": "관리자 패널",
    "admin.schedule": "일정 관리",
    "admin.addSlot": "시간대 추가",
    "admin.time": "시간",
    "admin.date": "날짜",
    "admin.student": "학생",

    // Homework
    "homework.title": "숙제",
    "homework.upload": "숙제 업로드",
    "homework.submitted": "제출된 숙제",
    "homework.pending": "대기 중",
    "homework.graded": "채점됨",
    "homework.feedback": "피드백",
    "homework.file": "파일",
    "homework.description": "설명",

    // Home
    "home.welcome": "소피아 선생님의 한국어 교실에 오신 것을 환영합니다!",
    "home.description":
      "개인 맞춤 한국어 수업으로 한국어 실력을 향상시켜보세요.",
    "home.features.title": "수업 특징",
    "home.features.personal": "개인 맞춤 수업",
    "home.features.flexible": "유연한 일정",
    "home.features.interactive": "인터랙티브 학습",
    "home.getStarted": "시작하기",
  },
  ru: {
    // Navigation
    "nav.schedule": "Расписание",
    "nav.homework": "Домашнее задание",
    "nav.admin": "Администратор",
    "nav.home": "Главная",

    // Common
    "common.save": "Сохранить",
    "common.cancel": "Отмена",
    "common.delete": "Удалить",
    "common.edit": "Редактировать",
    "common.add": "Добавить",
    "common.confirm": "Подтвердить",
    "common.loading": "Загрузка...",

    // Schedule
    "schedule.title": "Расписание уроков",
    "schedule.book": "Забронировать",
    "schedule.available": "Доступно",
    "schedule.booked": "Забронировано",
    "schedule.teacher": "Преподаватель: София",
    "schedule.duration": "Длительность урока: 60 минут",
    "schedule.level": "Уровень",
    "schedule.beginner": "Начальный",
    "schedule.intermediate": "Средний",
    "schedule.advanced": "Продвинутый",

    // Admin
    "admin.title": "Панель администратора",
    "admin.schedule": "Управление расписанием",
    "admin.addSlot": "Добавить слот",
    "admin.time": "Время",
    "admin.date": "Дата",
    "admin.student": "Студент",

    // Homework
    "homework.title": "Домашнее задание",
    "homework.upload": "Загрузить задание",
    "homework.submitted": "Отправленные задания",
    "homework.pending": "Ожидает проверки",
    "homework.graded": "Оценено",
    "homework.feedback": "Обратная связь",
    "homework.file": "Файл",
    "homework.description": "Описание",

    // Home
    "home.welcome": "Добро пожаловать в класс корейского языка Софии!",
    "home.description":
      "Улучшите свои навыки корейского языка с персонализированными уроками.",
    "home.features.title": "Особенности уроков",
    "home.features.personal": "Персонализированные уроки",
    "home.features.flexible": "Гибкое расписание",
    "home.features.interactive": "Интерактивное обучение",
    "home.getStarted": "Начать",
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ko");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    const savedTheme = localStorage.getItem("theme") as Theme;

    if (savedLanguage && ["ko", "ru"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }

    if (savedTheme && ["light", "dark"].includes(savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const t = (key: TranslationKeys): string => {
    const translation = translations[language];
    if (!translation) return key; // 언어가 없을 경우 기본값 반환
    return translation[key] || key; // 키가 없을 경우 기본값 반환
  };
  return (
    <AppContext.Provider value={{ language, setLanguage, theme, setTheme, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
