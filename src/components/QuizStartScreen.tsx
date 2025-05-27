import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuizStartScreenProps {
  onStart: () => void;
}

const QuizStartScreen = ({ onStart }: QuizStartScreenProps) => {
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
            onClick={onStart}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
          >
            🚀 Начать тест
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizStartScreen;
