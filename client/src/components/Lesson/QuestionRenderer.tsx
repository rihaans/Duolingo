import React from 'react';
import { Question } from '../../types';
import TranslationQuestion from './QuestionTypes/TranslationQuestion';
import MultipleChoiceText from './QuestionTypes/MultipleChoiceText';
import MultipleChoiceImage from './QuestionTypes/MultipleChoiceImage';
import ListenAndTypeQuestion from './QuestionTypes/ListenAndTypeQuestion';
import FillInBlankQuestion from './QuestionTypes/FillInBlankQuestion';
import SentenceBuilderQuestion from './QuestionTypes/SentenceBuilderQuestion';
import MatchPairsQuestion from './QuestionTypes/MatchPairsQuestion';

interface QuestionRendererProps {
  question: Question;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  onAnswer,
}) => {
  // Render the appropriate question component based on the question type
  switch (question.type) {
    case 'translation':
      return <TranslationQuestion question={question} onAnswer={onAnswer} />;

    case 'multiple-choice-text':
      return <MultipleChoiceText question={question} onAnswer={onAnswer} />;

    case 'multiple-choice-image':
      return <MultipleChoiceImage question={question} onAnswer={onAnswer} />;

    case 'listen-and-type':
      return <ListenAndTypeQuestion question={question} onAnswer={onAnswer} />;

    case 'fill-in-blank':
      return <FillInBlankQuestion question={question} onAnswer={onAnswer} />;

    case 'sentence-builder':
      return <SentenceBuilderQuestion question={question} onAnswer={onAnswer} />;

    case 'match-pairs':
      return <MatchPairsQuestion question={question} onAnswer={onAnswer} />;

    default:
      return (
        <div className="text-center p-8">
          <p className="text-xl text-red-500 font-bold">
            Unknown question type: {question.type}
          </p>
          <p className="text-gray-600 mt-2">
            This question type is not supported yet.
          </p>
        </div>
      );
  }
};

export default QuestionRenderer;
