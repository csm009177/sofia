import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useApp } from './AppContext';
import { Upload, FileText, CheckCircle, Clock, MessageCircle, BookOpen } from 'lucide-react';

export function HomeworkSection() {
  const { t } = useApp();
  const [isUploading, setIsUploading] = useState(false);
  const [newHomework, setNewHomework] = useState({
    title: '',
    description: '',
    file: null as File | null
  });

  // Mock homework data
  const [homeworkList, setHomeworkList] = useState([
    {
      id: 1,
      title: '한국어 기초 문법 연습',
      description: '은/는, 이/가 조사 사용법 연습',
      submittedAt: '2024-08-08',
      status: 'graded',
      grade: 95,
      feedback: '문법 사용이 정확하고 문장 구성이 자연스럽습니다. 발음 연습을 더 해보세요.',
      fileName: 'grammar_exercise.pdf'
    },
    {
      id: 2,
      title: '한국 문화 에세이',
      description: '한국의 전통 문화에 대한 짧은 에세이 작성',
      submittedAt: '2024-08-10',
      status: 'pending',
      grade: null,
      feedback: null,
      fileName: 'culture_essay.docx'
    },
    {
      id: 3,
      title: '발음 연습 녹음',
      description: '제시된 단어와 문장 발음 녹음',
      submittedAt: '2024-08-09',
      status: 'graded',
      grade: 88,
      feedback: '전반적으로 좋습니다. 받침 발음에 더 주의해서 연습해보세요.',
      fileName: 'pronunciation.mp3'
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewHomework(prev => ({ ...prev, file }));
    }
  };

  const submitHomework = () => {
    if (newHomework.title && newHomework.description && newHomework.file) {
      const newId = Math.max(...homeworkList.map(h => h.id)) + 1;
      const today = new Date().toISOString().split('T')[0];
      
      setHomeworkList(prev => [...prev, {
        id: newId,
        title: newHomework.title,
        description: newHomework.description,
        submittedAt: today,
        status: 'pending',
        grade: null,
        feedback: null,
        fileName: newHomework.file!.name
      }]);
      
      setNewHomework({ title: '', description: '', file: null });
      setIsUploading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="w-3 h-3 mr-1" />{t('homework.pending')}</Badge>;
      case 'graded':
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="w-3 h-3 mr-1" />{t('homework.graded')}</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric'
    });
  };

  const recentHomework = homeworkList.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {t('homework.title')}
            </CardTitle>
            <CardDescription>최근 제출한 숙제를 확인하고 새로운 숙제를 업로드하세요</CardDescription>
          </div>
          
          <Dialog open={isUploading} onOpenChange={setIsUploading}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                {t('homework.upload')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('homework.upload')}</DialogTitle>
                <DialogDescription>
                  완성한 숙제를 업로드해주세요.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">제목</Label>
                  <Input
                    id="title"
                    value={newHomework.title}
                    onChange={(e) => setNewHomework(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="숙제 제목을 입력하세요"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">{t('homework.description')}</Label>
                  <Textarea
                    id="description"
                    value={newHomework.description}
                    onChange={(e) => setNewHomework(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="숙제에 대한 간단한 설명을 입력하세요"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="file">{t('homework.file')}</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.mp3,.mp4,.jpg,.png"
                    onChange={handleFileUpload}
                  />
                  {newHomework.file && (
                    <p className="text-sm text-muted-foreground mt-1">
                      선택된 파일: {newHomework.file.name}
                    </p>
                  )}
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={submitHomework}
                    disabled={!newHomework.title || !newHomework.description || !newHomework.file}
                    className="flex-1"
                  >
                    업로드
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsUploading(false)}
                    className="flex-1"
                  >
                    {t('common.cancel')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      
      <CardContent>
        {recentHomework.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">아직 제출한 숙제가 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentHomework.map((homework) => (
              <Card key={homework.id} className="border-muted">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{homework.title}</h4>
                      <p className="text-sm text-muted-foreground">{homework.description}</p>
                    </div>
                    {getStatusBadge(homework.status)}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span>제출일: {formatDate(homework.submittedAt)}</span>
                    <span>파일: {homework.fileName}</span>
                  </div>
                  
                  {homework.status === 'graded' && homework.grade && (
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">점수: {homework.grade}/100</span>
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <p className="text-sm">{homework.feedback}</p>
                    </div>
                  )}
                  
                  {homework.status === 'pending' && (
                    <div className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded-lg">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        선생님이 검토 중입니다. 곧 피드백을 받으실 수 있습니다.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            
            {homeworkList.length > 3 && (
              <div className="text-center pt-2">
                <Button variant="outline" size="sm">
                  모든 숙제 보기 ({homeworkList.length})
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}