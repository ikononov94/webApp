const employeeData = [
  {
    label: 'Имя (обязательное поле)',
    type: 'text',
    required: true,
    id: '0',
    state: 'name',
  },
  {
    label: 'Фамилия (обязательное поле)',
    type: 'text',
    required: true,
    id: '1',
    state: 'lastName',
  },
  {
    label: 'Отчетство',
    type: 'text',
    required: false,
    id: '2',
    state: 'patronymic',
  },
  {
    label: 'Пол',
    type: 'text',
    required: false,
    id: '3',
    state: 'sex',
  },
  {
    label: 'З/п',
    type: 'number',
    required: false,
    id: '4',
    state: 'salary',
  },
  {
    label: 'Отделения (обязательное поле)',
    componentClass: 'select',
    multiple: true,
    required: true,
    id: '5',
    state: 'departments',
  },
];

export default employeeData;
