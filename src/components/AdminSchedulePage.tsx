import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { useApp } from './AppContext';
import { Plus, Edit, Trash2, Calendar, Clock, User } from 'lucide-react';

export function AdminSchedulePage() {
  const { t } = useApp();
  const [isAddingSlot, setIsAddingSlot] = useState(false);
  const [newSlot, setNewSlot] = useState({
    date: '',
    time: '',
    duration: 60
  });

  // Mock schedule data (same as SchedulePage but with admin controls)
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

  const addTimeSlot = () => {
    if (newSlot.date && newSlot.time) {
      const newId = Math.max(...scheduleData.map(s => s.id)) + 1;
      setScheduleData(prev => [...prev, {
        id: newId,
        ...newSlot,
        available: true,
        student: null,
        level: null
      }]);
      setNewSlot({ date: '', time: '', duration: 60 });
      setIsAddingSlot(false);
    }
  };

  const deleteTimeSlot = (id: number) => {
    setScheduleData(prev => prev.filter(slot => slot.id !== id));
  };

  const cancelBooking = (id: number) => {
    setScheduleData(prev => 
      prev.map(slot => 
        slot.id === id 
          ? { ...slot, available: true, student: null, level: null }
          : slot
      )
    );
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
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl mb-2">{t('admin.title')}</h1>
          <p className="text-muted-foreground">{t('admin.schedule')}</p>
        </div>
        
        <Dialog open={isAddingSlot} onOpenChange={setIsAddingSlot}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              {t('admin.addSlot')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('admin.addSlot')}</DialogTitle>
              <DialogDescription>
                새로운 수업 시간대를 추가하세요.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">{t('admin.date')}</Label>
                <Input
                  id="date"
                  type="date"
                  value={newSlot.date}
                  onChange={(e) => setNewSlot(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="time">{t('admin.time')}</Label>
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
                  disabled={!newSlot.date || !newSlot.time}
                  className="flex-1"
                >
                  {t('common.add')}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddingSlot(false)}
                  className="flex-1"
                >
                  {t('common.cancel')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Alert className="mb-8">
        <AlertDescription>
          관리자로서 모든 수업 일정을 관리하고, 시간대를 추가하거나 예약을 취소할 수 있습니다.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        {Object.entries(groupedSchedule).map(([date, slots]) => (
          <div key={date}>
            <h2 className="text-xl mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {formatDate(date)}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {slots.map((slot) => (
                <Card key={slot.id} className={slot.available ? 'border-green-200' : 'border-blue-200'}>
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
                    <div className="space-y-3">
                      {!slot.available && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span className="text-sm">{slot.student}</span>
                          </div>
                          <Badge variant="outline"> 
                            {t(slot.level as TranslationKeys)}
                          </Badge>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        {!slot.available && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => cancelBooking(slot.id)}
                            className="flex-1"
                          >
                            예약 취소
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteTimeSlot(slot.id)}
                          className={slot.available ? 'w-full' : 'flex-1'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
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