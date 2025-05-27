import { useState } from "react";
import { QuizState } from "@/types/quiz";
import { pythonQuestions } from "@/data/questions";

export const useQuizState = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    score: 0,
    isCompleted: false,
    timeSpent: 0,
  });

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isStarted, setIsStarted] = useState(false);

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
      setQuizState({
        ...quizState,
        answers: newAnswers,
        score: newScore,
        isCompleted: true,
      });
    } else {
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
  };

  const startQuiz = () => {
    setIsStarted(true);
  };

  const updateTimeSpent = (timeSpent: number) => {
    setQuizState((prev) => ({ ...prev, timeSpent }));
  };

  return {
    quizState,
    selectedAnswer,
    isStarted,
    handleAnswerSelect,
    handleNextQuestion,
    restartQuiz,
    startQuiz,
    updateTimeSpent,
  };
};
