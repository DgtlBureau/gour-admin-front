import { Characteristic } from './SelectForm';

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
    category: 'cheese',
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
    category: 'cheese',
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
    category: 'cheese',
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
    category: 'meat',
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
    category: 'meat',
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
