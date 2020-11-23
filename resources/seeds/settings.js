exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('setting')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('setting').insert([
        {
          name: 'PD_QUESTION_COUNT',
          value: '20',
          title: 'Кол-во вопросов для (ПД)',
          type: 'NUMBER',
        },
        {
          name: 'PD_QUIZ_TIME_MINUTES',
          value: '30',
          title: 'Время для (ПД) в минутах',
          type: 'NUMBER',
        },
        {
          name: 'DTC_QUESTION_COUNT',
          value: '20',
          title: 'Кол-во вопросов для (ДТС)',
          type: 'NUMBER',
        },
        {
          name: 'DTC_QUIZ_TIME_MINUTES',
          value: '30',
          title: 'Время для (ДТС) в минутах',
          type: 'NUMBER',
        },
      ]);
    });
};
