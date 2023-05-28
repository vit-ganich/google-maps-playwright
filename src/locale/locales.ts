import Locale from './locale';

const pl: Locale = {
  emptySearch: {
    message: 'Nie udało się znaleźć zapytania',
    description:
      'Sprawdź, czy w zapytaniu nie ma literówek. Spróbuj dodać nazwę miasta, region lub kod pocztowy.',
  },
};

const gb: Locale = {
  emptySearch: {
    message: "Google Maps can't find",
    description:
      'Make sure your search is spelled correctly. Try adding a city, state, or zip code.',
  },
};

export default {
  'pl-PL': pl,
  'en-GB': gb,
};
