
export type ElementType = 'Гал' | 'Ус' | 'Хий' | 'Шороо';

export interface ZodiacSign {
  id: string;
  name: string;
  symbol: string;
  dates: string;
  element: ElementType;
  description: string;
  strengths: string[];
  weaknesses: string[];
  love: string;
  career: string;
  compatibility: string[];
  mongolianTwist: string;
  color: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    value: number; // weight towards being the sign
  }[];
}

export type MoodType = 'Жаргалтай' | 'Гунигтай' | 'Ууртай' | 'Ядарсан' | 'Түгшүүртэй';
