export type Language = 'en' | 'ka';

export interface Translations {
  // Header
  title: string;
  subtitle: string;
  language: string;
  english: string;
  georgian: string;

  // Search and filters
  searchPlaceholder: string;
  type: string;
  network: string;
  debit: string;
  credit: string;
  clearAllFilters: string;
  filter: string;
  filters: string;
  filtersActive: string;

  // Results
  showingAll: string;
  showingFiltered: string;
  cards: string;
  noCardsMatch: string;
  tryAdjusting: string;

  // Card details
  features: string;
  printConfig: string;
  fees: string;
  annualFee: string;
  transactionFee: string;
  foreignFee: string;
  tags: string;
  close: string;
  viewDetails: string;

  // Common
  loading: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    title: 'Card Catalog',
    subtitle: 'Browse our comprehensive catalog of bank cards. Explore designs, features, and find the perfect card for your needs.',
    language: 'Language',
    english: 'English',
    georgian: 'Georgian',

    // Search and filters
    searchPlaceholder: 'Search cards...',
    type: 'Card Type',
    network: 'Network',
    debit: 'Debit',
    credit: 'Credit',
    clearAllFilters: 'Clear All Filters',
    filter: 'filter',
    filters: 'filters',
    filtersActive: 'active',

    // Results
    showingAll: 'Showing all',
    showingFiltered: 'of',
    cards: 'cards',
    noCardsMatch: 'No cards match your search',
    tryAdjusting: 'Try adjusting your filters or search terms to find what you\'re looking for.',

    // Card details
    features: 'Key Features',
    printConfig: 'Print Configuration',
    fees: 'Fees',
    annualFee: 'Annual Fee',
    transactionFee: 'Transaction Fee',
    foreignFee: 'Foreign Transaction Fee',
    tags: 'Tags',
    close: 'Close',
    viewDetails: 'View Details',

    // Common
    loading: 'Loading...'
  },

  ka: {
    // Header
    title: 'ბარათების კატალოგი',
    subtitle: 'დაათვალიერეთ ჩვენი საბანკო ბარათების სრული კატალოგი. შეისწავლეთ დიზაინები, ფუნქციები და იპოვეთ თქვენთვის იდეალური ბარათი.',
    language: 'ენა',
    english: 'ინგლისური',
    georgian: 'ქართული',

    // Search and filters
    searchPlaceholder: 'ძიება...',
    type: 'ბარათის ტიპი',
    network: 'ქსელი',
    debit: 'სადებეტო',
    credit: 'საკრედიტო',
    clearAllFilters: 'ყველა ფილტრის გასუფთავება',
    filter: 'ფილტრი',
    filters: 'ფილტრები',
    filtersActive: 'აქტიური',

    // Results
    showingAll: 'ნაჩვენებია ყველა',
    showingFiltered: '-დან',
    cards: 'ბარათი',
    noCardsMatch: 'თქვენს მოთხოვნას არ შეესაბამება არცერთი ბარათი',
    tryAdjusting: 'სცადეთ შეცვალოთ ფილტრები ან ძიების პირობები სასურველი შედეგის მისაღებად.',

    // Card details
    features: 'მთავარი ფუნქციები',
    printConfig: 'ბეჭდვის კონფიგურაცია',
    fees: 'საკომისიოები',
    annualFee: 'წლიური საფასური',
    transactionFee: 'ტრანზაქციის საფასური',
    foreignFee: 'უცხოური ოპერაციის საფასური',
    tags: 'თეგები',
    close: 'დახურვა',
    viewDetails: 'დეტალების ნახვა',

    // Common
    loading: 'იტვირთება...'
  }
};
