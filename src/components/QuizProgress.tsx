import { Progress } from "@/components/ui/progress";
import { formatTime } from "@/utils/timeUtils";

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  timeSpent: number;
}

const QuizProgress = ({
  currentQuestion,
  totalQuestions,
  score,
  timeSpent,
}: QuizProgressProps) => {
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-roboto font-semibold text-gray-800">
            🐍 Python Quiz
          </h1>
          <div className="text-sm text-gray-600">
            ⏱️ {formatTime(timeSpent)}
          </div>
        </div>
        <div className="text-sm text-gray-600">
          {score} / {currentQuestion + 1}
        </div>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default QuizProgress;
