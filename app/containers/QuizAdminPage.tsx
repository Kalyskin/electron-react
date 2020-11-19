import React from 'react';
import QuizTable from '../components/QuizTable';
import { QuizFormModal } from '../components/QuizFormModal';
import PageTemplate from './PageTemplate';

export default function QuizAdminPage() {
  return (
    <PageTemplate>
      <QuizFormModal />
      <QuizTable />
    </PageTemplate>
  );
}
