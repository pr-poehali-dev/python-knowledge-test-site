import { Question } from "@/types/quiz";

export const pythonQuestions: Question[] = [
  {
    id: 1,
    question: "Какой результат выведет этот код: print(type([]))",
    options: [
      "<class 'list'>",
      "<class 'tuple'>",
      "<class 'dict'>",
      "<class 'set'>",
    ],
    correctAnswer: 0,
    explanation:
      "[] создает пустой список, поэтому type([]) возвращает <class 'list'>",
    difficulty: "easy",
  },
  {
    id: 2,
    question:
      "Что произойдет при выполнении: x = [1, 2, 3]; y = x; y.append(4); print(x)",
    options: ["[1, 2, 3]", "[1, 2, 3, 4]", "Ошибка", "None"],
    correctAnswer: 1,
    explanation:
      "y и x ссылаются на один и тот же объект в памяти, поэтому изменение y влияет на x",
    difficulty: "medium",
  },
  {
    id: 3,
    question:
      "Какой метод используется для добавления элемента в конец списка?",
    options: ["add()", "append()", "insert()", "push()"],
    correctAnswer: 1,
    explanation: "append() добавляет элемент в конец списка",
    difficulty: "easy",
  },
  {
    id: 4,
    question: "Что вернет выражение: bool([])",
    options: ["True", "False", "None", "Ошибка"],
    correctAnswer: 1,
    explanation: "Пустой список считается False в логическом контексте",
    difficulty: "easy",
  },
  {
    id: 5,
    question: "Как правильно открыть файл для чтения в Python?",
    options: [
      "open('file.txt', 'r')",
      "file('file.txt', 'read')",
      "read('file.txt')",
      "open('file.txt', 'read')",
    ],
    correctAnswer: 0,
    explanation:
      "open() с параметром 'r' - стандартный способ открытия файла для чтения",
    difficulty: "medium",
  },
  {
    id: 6,
    question: "Что выведет: print('Python'[1:4])",
    options: ["Pyt", "yth", "ytho", "thon"],
    correctAnswer: 1,
    explanation:
      "Срез [1:4] извлекает символы с индексами 1, 2, 3 (не включая 4)",
    difficulty: "medium",
  },
  {
    id: 7,
    question: "Какая функция используется для получения длины объекта?",
    options: ["length()", "size()", "len()", "count()"],
    correctAnswer: 2,
    explanation: "len() - встроенная функция для получения длины объекта",
    difficulty: "easy",
  },
  {
    id: 8,
    question: "Что такое list comprehension?",
    options: [
      "Способ создания списков",
      "Метод сортировки",
      "Тип данных",
      "Функция",
    ],
    correctAnswer: 0,
    explanation:
      "List comprehension - это синтаксический способ создания списков в одну строку",
    difficulty: "medium",
  },
  {
    id: 9,
    question: "Какой результат: print(2 ** 3)",
    options: ["6", "8", "9", "23"],
    correctAnswer: 1,
    explanation: "** - оператор возведения в степень, 2³ = 8",
    difficulty: "easy",
  },
  {
    id: 10,
    question: "Что делает функция enumerate()?",
    options: [
      "Сортирует список",
      "Добавляет индексы к элементам",
      "Считает элементы",
      "Удаляет дубликаты",
    ],
    correctAnswer: 1,
    explanation:
      "enumerate() возвращает пары (индекс, значение) для итерируемого объекта",
    difficulty: "hard",
  },
];
