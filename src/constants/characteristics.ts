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
        key: 'oneMonth',
        label: {
          ru: 'От 1 месяца',
          en: 'От 1 месяца',
        },
      },
      {
        key: 'threeMonth',
        label: {
          ru: 'От 3 месяцев',
          en: 'От 3 месяцев',
        },
      },
      {
        key: 'sixMonth',
        label: {
          ru: 'От 6 месяцев',
          en: 'От 6 месяцев',
        },
      },
      {
        key: 'oneYear',
        label: {
          ru: 'От 1 года',
          en: 'От 1 года',
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
        key: 'Washed',
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
        key: 'sausages',
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
    label: { ru: 'Тип приготовления', en: 'Processing type' },
    categoryKey: 'meat',
    values: [
      { key: 'Boiled', label: { ru: 'Вареная', en: 'Boiled' } },
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
        key: 'Dry-cured',
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
