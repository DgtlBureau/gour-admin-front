import { Characteristic } from './ProductSelectForm';

export const characteristics: Characteristic[] = [
  {
    key: 'country',
    label: 'Страна происхождения',
    category: 'all',
    values: [
      {
        key: 'Russia',
        label: 'Россия',
      },
    ],
  },
  {
    key: 'timeOfOrigin',
    label: 'Выдержка',
    category: 'all',
    values: [
      { key: 'Washed', label: 'От 1 месяца' },
      {
        key: 'Washed',
        label: 'От 3 месяцев',
      },
      {
        key: 'Washed',
        label: 'От 6 месяцев',
      },
      {
        key: 'Washed',
        label: 'От 1 года',
      },
    ],
  },
  {
    key: 'milk',
    label: 'Молоко',
    category: '304',
    values: [
      {
        key: 'goatsMilk',
        label: 'Козье',
      },
      {
        key: 'cowsMilk',
        label: 'Коровье',
      },
      {
        key: 'sheepMilk',
        label: 'Овечье',
      },
      {
        key: 'mixed',
        label: 'Смешанное',
      },
    ],
  },
  {
    key: 'cheeseCategory',
    label: 'Категория сыра',
    category: '304',
    values: [
      {
        key: 'freshCheeses',
        label: 'Свежие',
      },
      {
        key: 'softCheeses',
        label: 'Мягкий',
      },
      {
        key: 'halfHArd',
        label: 'Полутвёрдый',
      },
      {
        key: 'hardCheeses',
        label: 'Твердые',
      },
      {
        key: 'blueWithMold',
        label: 'Голубой с плесенью',
      },
    ],
  },
  {
    key: 'crustType',
    label: 'Тип корочки',
    category: '304',
    values: [
      {
        key: 'withWhiteMold',
        label: 'С белой плесенью',
      },
      {
        key: 'Washed',
        label: 'Мытая',
      },
    ],
  },
  {
    key: 'meatType',
    label: 'Тип мяса',
    category: '233',
    values: [
      { key: 'Washed', label: 'Колбаса' },
      {
        key: 'Washed',
        label: 'Окорок',
      },
      {
        key: 'Washed',
        label: 'Нарезка',
      },
      {
        key: 'Washed',
        label: 'Другое',
      },
    ],
  },
  {
    key: 'processingType',
    label: 'Тип приготовления',
    category: '233',
    values: [
      { key: 'Boiled', label: 'Варёное' },
      {
        key: 'hotSmoked',
        label: 'Горячего копчения',
      },
      {
        key: 'coldSmoked',
        label: 'Холодного копчения',
      },
      {
        key: 'dried',
        label: 'Вяленое',
      },
      {
        key: 'Dry-cured',
        label: 'Сыровяленое',
      },
    ],
  },
];
