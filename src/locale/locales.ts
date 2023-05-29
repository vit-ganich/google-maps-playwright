import Locale from './locale';

const pl: Locale = {
  search: {
    destination: 'Miejsce docelowe',
  },
  emptySearch: {
    message: 'Nie udało się znaleźć zapytania',
    description:
      'Sprawdź, czy w zapytaniu nie ma literówek. Spróbuj dodać nazwę miasta, region lub kod pocztowy.',
  },
  cities: {
    paris: 'Paryż',
    london: 'Londyn',
  },
  countries: {
    france: 'Francja',
    uk: 'Wielka Brytania',
  },
};

const gb: Locale = {
  search: {
    destination: 'Destination',
  },
  emptySearch: {
    message: "Google Maps can't find",
    description:
      'Make sure your search is spelled correctly. Try adding a city, state, or zip code.',
  },
  cities: {
    paris: 'Paris',
    london: 'London',
  },
  countries: {
    france: 'France',
    uk: 'United Kingdom',
  },
};

export default {
  'pl-PL': pl,
  'en-GB': gb,
};
