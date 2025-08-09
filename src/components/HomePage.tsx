import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ScheduleSection } from './ScheduleSection';
import { HomeworkSection } from './HomeworkSection';
import { useApp } from './AppContext';
import { GraduationCap, Star, Clock, BookOpen } from 'lucide-react';

export function HomePage() {
  const { t } = useApp();

  const stats = [
    {
      icon: GraduationCap,
      title: '완료된 수업',
      value: '24',
      description: '이번 달'
    },
    {
      icon: BookOpen,
      title: '제출한 숙제',
      value: '18',
      description: '총 과제'
    },
    {
      icon: Star,
      title: '평균 점수',
      value: '91',
      description: '점'
    },
    {
      icon: Clock,
      title: '다음 수업',
      value: '오늘 오후 2시',
      description: '중급 문법'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-4 text-primary">
            {t('home.welcome')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('home.description')}
          </p>
        </div>

        {/* Teacher Info */}
        <Card className="mb-8">
          <CardContent className="flex items-center gap-6 p-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl">
              👩‍🏫
            </div>
            <div>
              <h2 className="text-xl mb-1">Sofia (소피아 선생님)</h2>
              <p className="text-muted-foreground mb-2">러시아 출신 한국어 교육 전문가</p>
              <p className="text-sm text-muted-foreground">
                5년 이상의 한국어 교육 경험을 바탕으로 러시아어 사용자를 위한 맞춤형 한국어 수업을 제공합니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <stat.icon className="w-8 h-8 text-primary" />
                  <div>
                    <div className="text-2xl font-semibold">{stat.value}</div>
                    <div className="text-sm font-medium">{stat.title}</div>
                    <div className="text-xs text-muted-foreground">{stat.description}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-8">
        {/* Schedule Section */}
        <ScheduleSection />
        
        {/* Homework Section */}
        <HomeworkSection />
      </div>
    </div>
  );
}