import { Question } from "@/types/quiz";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ResultsScreenProps {
  questions: Question[];
  answers: number[];
  score: number;
  timeSpent: number;
  onRestart: () => void;
}

const ResultsScreen = ({
  questions,
  answers,
  score,
  timeSpent,
  onRestart,
}: ResultsScreenProps) => {
  const percentage = Math.round((score / questions.length) * 100);

  const getGradeEmoji = (percentage: number) => {
    if (percentage >= 90) return "🏆";
    if (percentage >= 80) return "🥇";
    if (percentage >= 70) return "🥈";
    if (percentage >= 60) return "🥉";
    return "📚";
  };

  const getGradeText = (percentage: number) => {
    if (percentage >= 90) return "Отлично! Вы эксперт Python!";
    if (percentage >= 80) return "Очень хорошо! Продолжайте изучать!";
    if (percentage >= 70) return "Хорошо! Есть что улучшить.";
    if (percentage >= 60) return "Неплохо! Нужно больше практики.";
    return "Начните с основ Python.";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}м ${secs}с` : `${secs}с`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Основные результаты */}
      <Card className="text-center">
        <CardHeader>
          <div className="text-6xl mb-4">{getGradeEmoji(percentage)}</div>
          <CardTitle className="text-3xl font-roboto mb-2">
            Тест завершен!
          </CardTitle>
          <p className="text-xl text-gray-600">{getGradeText(percentage)}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {score}/{questions.length}
              </div>
              <div className="text-sm text-gray-600">Правильных ответов</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {percentage}%
              </div>
              <div className="text-sm text-gray-600">Процент успеха</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {formatTime(timeSpent)}
              </div>
              <div className="text-sm text-gray-600">Время прохождения</div>
            </div>
          </div>

          <Progress value={percentage} className="mb-6" />

          <Button
            onClick={onRestart}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            🔄 Пройти тест еще раз
          </Button>
        </CardContent>
      </Card>

      {/* Детальный разбор ответов */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-roboto">
            📝 Разбор ответов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-lg border ${
                    isCorrect
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{isCorrect ? "✅" : "❌"}</div>
                    <div className="flex-1">
                      <div className="font-medium mb-2">
                        {index + 1}. {question.question}
                      </div>
                      <div className="text-sm space-y-1">
                        <div>
                          <span className="font-medium">Ваш ответ:</span>{" "}
                          {question.options[userAnswer]}
                        </div>
                        {!isCorrect && (
                          <div>
                            <span className="font-medium text-green-600">
                              Правильный ответ:
                            </span>{" "}
                            {question.options[question.correctAnswer]}
                          </div>
                        )}
                        <div className="text-gray-600 mt-2">
                          💡 {question.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsScreen;
