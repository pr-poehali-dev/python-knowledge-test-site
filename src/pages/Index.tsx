import { useState, useEffect } from "react";
import { pythonQuestions } from "@/data/questions";
import { QuizState } from "@/types/quiz";
import QuestionCard from "@/components/QuestionCard";
import ResultsScreen from "@/components/ResultsScreen";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    score: 0,
    isCompleted: false,
    timeSpent: 0,
  });

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);

  // Таймер
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStarted && !quizState.isCompleted) {
      interval = setInterval(() => {
        setQuizState((prev) => ({
          ...prev,
          timeSpent: Math.floor((Date.now() - startTime) / 1000),
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted, quizState.isCompleted, startTime]);

  const startQuiz = () => {
    setIsStarted(true);
    setStartTime(Date.now());
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const currentQuestion = pythonQuestions[quizState.currentQuestion];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    const newAnswers = [...quizState.answers, selectedAnswer];
    const newScore = quizState.score + (isCorrect ? 1 : 0);
    const newCurrentQuestion = quizState.currentQuestion + 1;

    if (newCurrentQuestion >= pythonQuestions.length) {
      // Тест завершен
      setQuizState({
        ...quizState,
        answers: newAnswers,
        score: newScore,
        isCompleted: true,
      });
    } else {
      // Следующий вопрос
      setQuizState({
        ...quizState,
        currentQuestion: newCurrentQuestion,
        answers: newAnswers,
        score: newScore,
      });
      setSelectedAnswer(null);
    }
  };

  const restartQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      answers: [],
      score: 0,
      isCompleted: false,
      timeSpent: 0,
    });
    setSelectedAnswer(null);
    setIsStarted(false);
    setStartTime(0);
  };

  const progressPercentage =
    ((quizState.currentQuestion + 1) / pythonQuestions.length) * 100;
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0
      ? `${mins}:${secs.toString().padStart(2, "0")}`
      : `0:${secs.toString().padStart(2, "0")}`;
  };

  // Стартовый экран
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto text-center animate-fade-in">
          <CardHeader>
            <div className="text-6xl mb-4">🐍</div>
            <CardTitle className="text-3xl font-roboto mb-4">
              Тест на знание Python
            </CardTitle>
            <p className="text-gray-600 text-lg">
              Проверьте свои знания языка программирования Python!
            </p>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">10</div>
                  <div className="text-sm text-gray-600">Вопросов</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">~5</div>
                  <div className="text-sm text-gray-600">Минут</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">3</div>
                  <div className="text-sm text-gray-600">Уровня сложности</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-left mb-6">
              <p className="flex items-center gap-2">
                <span>✨</span> Вопросы разной сложности
              </p>
              <p className="flex items-center gap-2">
                <span>⏱️</span> Отслеживание времени
              </p>
              <p className="flex items-center gap-2">
                <span>📊</span> Детальная статистика
              </p>
              <p className="flex items-center gap-2">
                <span>💡</span> Объяснения к ответам
              </p>
            </div>

            <Button
              onClick={startQuiz}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
            >
              🚀 Начать тест
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Экран результатов
  if (quizState.isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-8">
        <ResultsScreen
          questions={pythonQuestions}
          answers={quizState.answers}
          score={quizState.score}
          timeSpent={quizState.timeSpent}
          onRestart={restartQuiz}
        />
      </div>
    );
  }

  // Экран вопроса
  const currentQuestion = pythonQuestions[quizState.currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Хедер с прогрессом */}
      <div className="w-full max-w-3xl mx-auto mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-roboto font-semibold text-gray-800">
              🐍 Python Quiz
            </h1>
            <div className="text-sm text-gray-600">
              ⏱️ {formatTime(quizState.timeSpent)}
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {quizState.score} / {quizState.currentQuestion + 1}
          </div>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Вопрос */}
      <div className="mb-8">
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          questionNumber={quizState.currentQuestion + 1}
          totalQuestions={pythonQuestions.length}
        />
      </div>

      {/* Кнопка "Далее" */}
      <div className="w-full max-w-3xl mx-auto text-center">
        <Button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-8"
        >
          {quizState.currentQuestion === pythonQuestions.length - 1
            ? "🏁 Завершить тест"
            : "➡️ Следующий вопрос"}
        </Button>
      </div>
    </div>
  );
};

export default Index;
