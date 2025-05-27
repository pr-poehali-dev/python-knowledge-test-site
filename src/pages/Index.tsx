import { pythonQuestions } from "@/data/questions";
import QuestionCard from "@/components/QuestionCard";
import ResultsScreen from "@/components/ResultsScreen";
import QuizStartScreen from "@/components/QuizStartScreen";
import QuizProgress from "@/components/QuizProgress";
import { useQuizState } from "@/hooks/useQuizState";
import { useQuizTimer } from "@/hooks/useQuizTimer";
import { Button } from "@/components/ui/button";

const Index = () => {
  const {
    quizState,
    selectedAnswer,
    isStarted,
    handleAnswerSelect,
    handleNextQuestion,
    restartQuiz,
    startQuiz,
    updateTimeSpent,
  } = useQuizState();

  useQuizTimer(isStarted, quizState.isCompleted, updateTimeSpent);

  if (!isStarted) {
    return <QuizStartScreen onStart={startQuiz} />;
  }

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

  const currentQuestion = pythonQuestions[quizState.currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <QuizProgress
        currentQuestion={quizState.currentQuestion}
        totalQuestions={pythonQuestions.length}
        score={quizState.score}
        timeSpent={quizState.timeSpent}
      />

      <div className="mb-8">
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          questionNumber={quizState.currentQuestion + 1}
          totalQuestions={pythonQuestions.length}
        />
      </div>

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
