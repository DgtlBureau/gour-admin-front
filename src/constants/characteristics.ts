import { TranslatableString } from '../@types/entities/TranslatableString';

type Characteristic = {
  label: TranslatableString;
  categoryKey: string;
  values: {
    key: string;
    label: TranslatableString;
  }[];
};

export const COMMON_CHARACTERISTICS: Record<string, Characteristic> = {
  country: {
    label: {
      ru: 'Страна происхождения',
      en: 'Country',
    },
    categoryKey: 'all',
    values: [
      {
        key: 'Spain',
        label: { ru: 'Испания', en: 'Spain' },
      },
      {
        key: 'Italy',
        label: { ru: 'Италия', en: 'Italy' },
      },
      {
        key: 'France',
        label: { ru: 'Франция', en: 'France' },
      },
      {
        key: 'Holland',
        label: { ru: 'Голландия', en: 'Holland' },
      },
      {
        key: 'GreatBritain',
        label: { ru: 'Великобритания', en: 'Great Britain' },
      },
      {
        key: 'Russia',
        label: { ru: 'Россия', en: 'Russia' },
      },
    ],
  },
  // timeOfOrigin: {
  //   label: {
  //     ru: 'Выдержка',
  //     en: 'Time of origin',
  //   },
  //   categoryKey: 'all',
  //   values: [
  //     {
  //       key: 'oneMonth',
  //       label: {
  //         ru: 'От 1 месяца',
  //         en: 'От 1 месяца',
  //       },
  //     },
  //     {
  //       key: 'threeMonth',
  //       label: {
  //         ru: 'От 3 месяцев',
  //         en: 'От 3 месяцев',
  //       },
  //     },
  //     {
  //       key: 'sixMonth',
  //       label: {
  //         ru: 'От 6 месяцев',
  //         en: 'От 6 месяцев',
  //       },
  //     },
  //     {
  //       key: 'oneYear',
  //       label: {
  //         ru: 'От 1 года',
  //         en: 'От 1 года',
  //       },
  //     },
  //   ],
  // },
};

export const CHEESE_CHARACTERISTICS: Record<string, Characteristic> = {
  milk: {
    label: {
      ru: 'Молоко',
      en: 'Milk',
    },
    categoryKey: 'cheese',
    values: [
      {
        key: 'goatMilk',
        label: {
          ru: 'Козье',
          en: 'Goat milk',
        },
      },
      {
        key: 'cowMilk',
        label: {
          en: 'Cow milk',
          ru: 'Коровье',
        },
      },
      {
        key: 'sheepMilk',
        label: {
          ru: 'Овечье',
          en: 'Sheep milk',
        },
      },
      {
        key: 'mixed',
        label: {
          ru: 'Смешанное',
          en: 'Mixed',
        },
      },
    ],
  },
  cheeseHardness: {
    label: {
      ru: 'Твердость',
      en: 'Hardness',
    },
    categoryKey: 'cheese',
    values: [
      {
        key: 'verySolid',
        label: {
          ru: 'очень твёрдый',
          en: 'very solid',
        },
      },
      {
        key: 'solid',
        label: {
          ru: 'твёрдый',
          en: 'solid',
        },
      },
      {
        key: 'semiSolid',
        label: {
          ru: 'полутвёрдый',
          en: 'semi-solid',
        },
      },
      {
        key: 'semiSoft',
        label: {
          ru: 'полумягкий',
          en: 'semi-soft',
        },
      },
      {
        key: 'soft',
        label: {
          ru: 'мягкий',
          en: 'soft',
        },
      },
    ],
  },
  // cheeseCategory: {
  //   label: {
  //     ru: 'Категория сыра',
  //     en: 'cheeseCategory',
  //   },
  //   categoryKey: 'cheese',
  //   values: [
  //     {
  //       key: 'freshCheeses',
  //       label: {
  //         ru: 'Свежий',
  //         en: 'Fresh',
  //       },
  //     },
  //     {
  //       key: 'softCheeses',
  //       label: {
  //         ru: 'Мягкий',
  //         en: 'Soft',
  //       },
  //     },
  //     {
  //       key: 'halfHard',
  //       label: {
  //         ru: 'Полутвёрдый',
  //         en: 'Half-hard',
  //       },
  //     },
  //     {
  //       key: 'hardCheeses',
  //       label: {
  //         ru: 'Твердые',
  //         en: 'Hard',
  //       },
  //     },
  //     {
  //       key: 'blueWithMold',
  //       label: {
  //         ru: 'Голубой с плесенью',
  //         en: 'Blue with mold',
  //       },
  //     },
  //   ],
  // },
  // crustType: {
  //   label: {
  //     ru: 'Тип корочки',
  //     en: 'crustType',
  //   },
  //   categoryKey: 'cheese',
  //   values: [
  //     {
  //       key: 'withWhiteMold',
  //       label: {
  //         ru: 'С белой плесенью',
  //         en: 'With white mold',
  //       },
  //     },
  //     {
  //       key: 'Washed',
  //       label: {
  //         ru: 'Мытая',
  //         en: 'Washed',
  //       },
  //     },
  //     {
  //       key: 'notNoted',
  //       label: {
  //         ru: 'Не указано',
  //         en: 'Not noted',
  //       },
  //     },
  //   ],
  // },
  // rennet: {
  //   label: {
  //     ru: 'Наличие сычужного фермента',
  //     en: 'The presence of rennet',
  //   },
  //   categoryKey: 'cheese',
  //   values: [
  //     {
  //       key: 'yes',
  //       label: {
  //         ru: 'Да',
  //         en: 'Yes',
  //       },
  //     },
  //     {
  //       key: 'no',
  //       label: {
  //         ru: 'Нет',
  //         en: 'No',
  //       },
  //     },
  //   ],
  // },
};

export const MEAT_CHARACTERISTICS: Record<string, Characteristic> = {
  meatType: {
    label: {
      ru: 'Виды мяса',
      en: 'Meat types',
    },
    categoryKey: 'meat',
    values: [
      {
        key: 'beef',
        label: {
          ru: 'Говядина',
          en: 'Beef',
        },
      },
      {
        key: 'pork',
        label: {
          ru: 'Свинина',
          en: 'Pork',
        },
      },
      {
        key: 'sheepMeat',
        label: {
          ru: 'Овечье',
          en: 'Sheep meat',
        },
      },
      {
        key: 'goatMeat',
        label: {
          ru: 'Козье',
          en: 'Goat meat',
        },
      },
      {
        key: 'mixed',
        label: {
          ru: 'смешанный',
          en: 'mixed',
        },
      },
    ],
  },
  meatHardness: {
    label: { ru: 'Способ приготовления', en: 'Cooking method' },
    categoryKey: 'meat',
    values: [
      { key: 'salted', label: { ru: 'солёное', en: 'salted' } },
      {
        key: 'rawCured',
        label: { ru: 'сыро-вяленое', en: 'raw cured' },
      },
      {
        key: 'boiled',
        label: { ru: 'варёное', en: 'boiled' },
      },
      {
        key: 'raw',
        label: { ru: 'сырое', en: 'Raw' },
      },
      {
        key: 'dried',
        label: { ru: 'сушёное', en: 'dried' },
      },
      {
        key: 'heatTreatment',
        label: { ru: 'прошедшее термическую обработку', en: 'past heat treatment' },
      },
      {
        key: 'hotSmoked',
        label: { ru: 'горячего копчения', en: 'Hot-smoked' },
      },
      {
        key: 'coldSmoked',
        label: { ru: 'холодного копчения', en: 'Cold-smoked' },
      },
    ],
  },
};

export const ALL_CHARACTERISTICS = {
  ...COMMON_CHARACTERISTICS,
  ...CHEESE_CHARACTERISTICS,
  ...MEAT_CHARACTERISTICS,
};
