
import React, { useEffect, useState } from 'react';
import { fetchQuestionsFromSalimaLogic, fetchArchetypeQuestions } from '@/utils/fetchQuestionsFromDB';

const QuestionFetcher = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [archetypeQuestions, setArchetypeQuestions] = useState<any[]>([]);

  useEffect(() => {
    const loadQuestions = async () => {
      const salimaQuestions = await fetchQuestionsFromSalimaLogic();
      const archQuestions = await fetchArchetypeQuestions();
      
      setQuestions(salimaQuestions);
      setArchetypeQuestions(archQuestions);
      
      console.log('=== SALIMA QUESTIONS FROM DB ===');
      salimaQuestions.forEach(q => {
        console.log(`${q.order}: ${q.text}`);
      });
      
      console.log('=== ARCHETYPE QUESTIONS FROM DB ===');
      archQuestions.forEach(q => {
        console.log(`${q.question_number}: ${q.question_text}`);
      });
    };
    
    loadQuestions();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Database Questions Debug</h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">SALIMA Questions ({questions.length})</h3>
        {questions.map(q => (
          <div key={q.order} className="mb-2 p-2 border rounded">
            <strong>Order {q.order} (ID: {q.id}):</strong> {q.text}
          </div>
        ))}
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Archetype Questions ({archetypeQuestions.length})</h3>
        {archetypeQuestions.map(q => (
          <div key={q.question_number} className="mb-2 p-2 border rounded">
            <strong>Question {q.question_number}:</strong> {q.question_text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionFetcher;
