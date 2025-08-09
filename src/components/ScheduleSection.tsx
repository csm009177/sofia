import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Calendar } from './ui/calendar';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useApp } from './AppContext';
import { Clock, User, Plus, Calendar as CalendarIcon } from 'lucide-react';

export function ScheduleSection() {
  const { t } = useApp();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminAddOpen, setIsAdminAddOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [studentName, setStudentName] = useState('');
  const [studentLevel, setStudentLevel] = useState('');
  const [newSlot, setNewSlot] = useState({
    time: '',
    duration: 60
  });

  // Mock schedule data with dates
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
      date: '2024-08-12',
      time: '16:00',
      duration: 60,
      available: true,
      student: null,
      level: null
    },
    {
      id: 5,
      date: '2024-08-15',
      time: '09:00',
      duration: 60,
      available: false,
      student: 'Maria',
      level: 'beginner'
    },
    {
      id: 6,
      date: '2024-08-16',
      time: '15:00',
      duration: 60,
      available: true,
      student: null,
      level: null
    }
  ]);

  const formatDateString = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getScheduleForDate = (date: Date) => {
    const dateString = formatDateString(date);
    return scheduleData.filter(slot => slot.date === dateString);
  };

  const getScheduledDates = () => {
    return scheduleData.map(slot => new Date(slot.date));
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

  const addTimeSlot = () => {
    if (selectedDate && newSlot.time) {
      const newId = Math.max(...scheduleData.map(s => s.id)) + 1;
      const dateString = formatDateString(selectedDate);
      
      setScheduleData(prev => [...prev, {
        id: newId,
        date: dateString,
        time: newSlot.time,
        duration: newSlot.duration,
        available: true,
        student: null,
        level: null
      }]);
      setNewSlot({ time: '', duration: 60 });
      setIsAdminAddOpen(false);
    }
  };

  const deleteTimeSlot = (id: number) => {
    setScheduleData(prev => prev.filter(slot => slot.id !== id));
  };

  const selectedDateSchedule = selectedDate ? getScheduleForDate(selectedDate) : [];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              {t('schedule.title')}
            </CardTitle>
            <CardDescription>{t('schedule.teacher')}</CardDescription>
          </div>
          <Dialog open={isAdminAddOpen} onOpenChange={setIsAdminAddOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                시간대 추가
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>시간대 추가</DialogTitle>
                <DialogDescription>
                  {selectedDate ? formatDateString(selectedDate) : '날짜를 선택하세요'}에 새로운 수업 시간을 추가합니다.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="time">시간</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newSlot.time}
                    onChange={(e) => setNewSlot(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={addTimeSlot}
                    disabled={!selectedDate || !newSlot.time}
                    className="flex-1"
                  >
                    추가
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAdminAddOpen(false)}
                    className="flex-1"
                  >
                    취소
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                hasSchedule: getScheduledDates()
              }}
              modifiersStyles={{
                hasSchedule: { 
                  backgroundColor: 'var(--color-primary)', 
                  color: 'var(--color-primary-foreground)',
                  borderRadius: '4px'
                }
              }}
            />
          </div>

          {/* Schedule for selected date */}
          <div>
            <h3 className="mb-4">
              {selectedDate ? 
                `${selectedDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })} 일정` : 
                '날짜를 선택하세요'
              }
            </h3>
            
            {selectedDateSchedule.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>이 날짜에는 예정된 수업이 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDateSchedule.map((slot) => (
                  <Card key={slot.id} className={`${slot.available ? 'border-green-200' : 'border-blue-200'}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">{slot.time}</span>
                          <Badge variant={slot.available ? 'default' : 'secondary'}>
                            {slot.available ? t('schedule.available') : t('schedule.booked')}
                          </Badge>
                        </div>
                        
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteTimeSlot(slot.id)}
                        >
                          삭제
                        </Button>
                      </div>
                      
                      {slot.available ? (
                        <Dialog open={isBookingOpen && selectedSlot?.id === slot.id} onOpenChange={setIsBookingOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              className="w-full mt-3" 
                              size="sm"
                              onClick={() => handleBooking(slot)}
                            >
                              {t('schedule.book')}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>수업 예약</DialogTitle>
                              <DialogDescription>
                                {selectedDate?.toLocaleDateString('ko-KR')} {selectedSlot?.time} 수업을 예약하시겠습니까?
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
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span className="text-sm">{slot.student}</span>
                          </div>
                          <Badge variant="outline"> 
                            {t(slot.level as TranslationKeys)}
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}