import React from 'react';
import QuizTable from '../components/QuizTable';
import { QuizFormModal } from '../components/QuizFormModal';

export default function QuizAdminPage() {
  return (
    <div>
      <QuizFormModal />
      <QuizTable />
    </div>
  );
}
