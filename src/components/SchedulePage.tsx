import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useApp } from './AppContext';
import { Calendar, Clock, User } from 'lucide-react';

export function SchedulePage() {
  const { t } = useApp();
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [studentName, setStudentName] = useState('');
  const [studentLevel, setStudentLevel] = useState('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Mock schedule data
  const [scheduleData, setScheduleData] = useState([
    {
      id: 1,
      date: '2024-08-10',
      time: '10:00',
      duration: 60,
      available: true,
      student: null,
      level: null
    },
    {
      id: 2,
      date: '2024-08-10',
      time: '14:00',
      duration: 60,
      available: true,
      student: null,
      level: null
    },
    {
      id: 3,
      date: '2024-08-11',
      time: '10:00',
      duration: 60,
      available: false,
      student: 'Alexey',
      level: 'intermediate'
    },
    {
      id: 4,
      date: '2024-08-11',
      time: '16:00',
      duration: 60,
      available: true,
      student: null,
      level: null
    },
    {
      id: 5,
      date: '2024-08-12',
      time: '09:00',
      duration: 60,
      available: true,
      student: null,
      level: null
    },
    {
      id: 6,
      date: '2024-08-12',
      time: '15:00',
      duration: 60,
      available: false,
      student: 'Maria',
      level: 'beginner'
    }
  ]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const handleBooking = (slot: any) => {
    setSelectedSlot(slot);
    setIsBookingOpen(true);
  };

  const confirmBooking = () => {
    if (selectedSlot && studentName && studentLevel) {
      setScheduleData(prev => 
        prev.map(slot => 
          slot.id === selectedSlot.id 
            ? { ...slot, available: false, student: studentName, level: studentLevel }
            : slot
        )
      );
      setIsBookingOpen(false);
      setStudentName('');
      setStudentLevel('');
      setSelectedSlot(null);
    }
  };

  const groupedSchedule = scheduleData.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">{t('schedule.title')}</h1>
        <p className="text-muted-foreground">{t('schedule.teacher')}</p>
        <p className="text-muted-foreground">{t('schedule.duration')}</p>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedSchedule).map(([date, slots]) => (
          <div key={date}>
            <h2 className="text-xl mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {formatDate(date)}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {slots.map((slot) => (
                <Card key={slot.id} className={slot.available ? 'border-green-200' : 'border-red-200'}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <CardTitle className="text-lg">{slot.time}</CardTitle>
                      </div>
                      <Badge variant={slot.available ? 'default' : 'secondary'}>
                        {slot.available ? t('schedule.available') : t('schedule.booked')}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {slot.available ? (
                      <Dialog open={isBookingOpen && selectedSlot?.id === slot.id} onOpenChange={setIsBookingOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full" 
                            onClick={() => handleBooking(slot)}
                          >
                            {t('schedule.book')}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>수업 예약</DialogTitle>
                            <DialogDescription>
                              {formatDate(selectedSlot?.date)} {selectedSlot?.time} 수업을 예약하시겠습니까?
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="studentName">이름</Label>
                              <Input
                                id="studentName"
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                placeholder="이름을 입력하세요"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="studentLevel">{t('schedule.level')}</Label>
                              <Select value={studentLevel} onValueChange={setStudentLevel}>
                                <SelectTrigger>
                                  <SelectValue placeholder="레벨을 선택하세요" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="beginner">{t('schedule.beginner')}</SelectItem>
                                  <SelectItem value="intermediate">{t('schedule.intermediate')}</SelectItem>
                                  <SelectItem value="advanced">{t('schedule.advanced')}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="flex gap-2 pt-4">
                              <Button 
                                onClick={confirmBooking}
                                disabled={!studentName || !studentLevel}
                                className="flex-1"
                              >
                                {t('common.confirm')}
                              </Button>
                              <Button 
                                variant="outline" 
                                onClick={() => setIsBookingOpen(false)}
                                className="flex-1"
                              >
                                {t('common.cancel')}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span className="text-sm">{slot.student}</span>
                        </div>
                        <Badge variant="outline">
                          {t(`schedule.${slot.level}`)}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}