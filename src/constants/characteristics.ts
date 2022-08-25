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
        key: 'Russia',
        label: { ru: 'Россия', en: 'Russia' },
      },
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
    ],
  },
  timeOfOrigin: {
    label: {
      ru: 'Выдержка',
      en: 'Time of origin',
    },
    categoryKey: 'all',
    values: [
      {
        key: 'without',
        label: {
          ru: 'Без выдержки',
          en: 'Without exposure',
        },
      },
      {
        key: 'oneMonth',
        label: {
          ru: 'От 1 месяца',
          en: 'From 1 month',
        },
      },
      {
        key: 'threeMonth',
        label: {
          ru: 'От 3 месяцев',
          en: 'From 3 month',
        },
      },
      {
        key: 'sixMonth',
        label: {
          ru: 'От 6 месяцев',
          en: 'From 6 month',
        },
      },
      {
        key: 'oneYear',
        label: {
          ru: 'От 1 года',
          en: 'From 1 year',
        },
      },
    ],
  },
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
          ru: 'Козье молоко',
          en: 'Goat milk',
        },
      },
      {
        key: 'cowMilk',
        label: {
          en: 'Cow milk',
          ru: 'Коровье молоко',
        },
      },
      {
        key: 'sheepMilk',
        label: {
          ru: 'Овечье молоко',
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
  cheeseCategory: {
    label: {
      ru: 'Категория сыра',
      en: 'cheeseCategory',
    },
    categoryKey: 'cheese',
    values: [
      {
        key: 'freshCheeses',
        label: {
          ru: 'Свежий',
          en: 'Fresh',
        },
      },
      {
        key: 'softCheeses',
        label: {
          ru: 'Мягкий',
          en: 'Soft',
        },
      },
      {
        key: 'halfHard',
        label: {
          ru: 'Полутвёрдый',
          en: 'Half-hard',
        },
      },
      {
        key: 'hardCheeses',
        label: {
          ru: 'Твердые',
          en: 'Hard',
        },
      },
      {
        key: 'blueWithMold',
        label: {
          ru: 'Голубой с плесенью',
          en: 'Blue with mold',
        },
      },
    ],
  },
  crustType: {
    label: {
      ru: 'Тип корочки',
      en: 'crustType',
    },
    categoryKey: 'cheese',
    values: [
      {
        key: 'withWhiteMold',
        label: {
          ru: 'С белой плесенью',
          en: 'With white mold',
        },
      },
      {
        key: 'washed',
        label: {
          ru: 'Мытая',
          en: 'Washed',
        },
      },
      {
        key: 'notNoted',
        label: {
          ru: 'Не указано',
          en: 'Not noted',
        },
      },
    ],
  },
  rennet: {
    label: {
      ru: 'Наличие сычужного фермента',
      en: 'The presence of rennet',
    },
    categoryKey: 'cheese',
    values: [
      {
        key: 'yes',
        label: {
          ru: 'Да',
          en: 'Yes',
        },
      },
      {
        key: 'no',
        label: {
          ru: 'Нет',
          en: 'No',
        },
      },
    ],
  },
};

export const MEAT_CHARACTERISTICS: Record<string, Characteristic> = {
  meatType: {
    label: {
      ru: 'Тип мяса',
      en: 'Meat type',
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
        key: 'sheep',
        label: {
          ru: 'Овечье',
          en: 'Sheep',
        },
      },
      {
        key: 'goat',
        label: {
          ru: 'Козье',
          en: 'Goat',
        },
      },
      {
        key: 'mixed',
        label: {
          ru: 'Смешанный',
          en: 'Mixed',
        },
      },
    ],
  },
  productType: {
    label: {
      ru: 'Тип продукта',
      en: 'Product type',
    },
    categoryKey: 'meat',
    values: [
      {
        key: 'sausage',
        label: {
          ru: 'Колбаса',
          en: 'Sausage',
        },
      },
      {
        key: 'gammon',
        label: {
          ru: 'Окорок',
          en: 'Gammon',
        },
      },
      {
        key: 'lunchmeat',
        label: {
          ru: 'Нарезка',
          en: 'Lunchmeat',
        },
      },
      {
        key: 'else',
        label: {
          ru: 'Другое',
          en: 'Else',
        },
      },
    ],
  },
  processingType: {
    label: { ru: 'Тип обработки', en: 'Processing type' },
    categoryKey: 'meat',
    values: [
      { key: 'boiled', label: { ru: 'Варёное', en: 'Boiled' } },
      {
        key: 'hotSmoked',
        label: { ru: 'Горячего копчения', en: 'Hot smoked' },
      },
      {
        key: 'coldSmoked',
        label: { ru: 'Холодного копчения', en: 'Cold-smoked' },
      },
      {
        key: 'dried',
        label: { ru: 'Вяленое', en: 'Dried' },
      },
      {
        key: 'dryCured',
        label: { ru: 'Сыровяленое', en: 'Dry-cured' },
      },
    ],
  },
};

export const ALL_CHARACTERISTICS = {
  ...COMMON_CHARACTERISTICS,
  ...CHEESE_CHARACTERISTICS,
  ...MEAT_CHARACTERISTICS,
};
