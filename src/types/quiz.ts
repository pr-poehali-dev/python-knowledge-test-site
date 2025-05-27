export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface QuizState {
  currentQuestion: number;
  answers: number[];
  score: number;
  isCompleted: boolean;
  timeSpent: number;
}
