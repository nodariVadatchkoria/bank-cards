export type Language = 'en' | 'ka';

export interface Translations {
  // Header
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  
  // Filters
  type: string;
  network: string;
  debit: string;
  credit: string;
  
  // Results
  showingAll: string;
  showingFiltered: string;
  cards: string;
  clearAllFilters: string;
  
  // Empty state
  noCardsMatch: string;
  tryAdjusting: string;
  
  // Modal sections
  configurationDetails: string;
  cardFeatures: string;
  specialEffects: string;
  feeInformation: string;
  tags: string;
  
  // Modal fields
  configuration: string;
  dpi: string;
  colorProfile: string;
  bleed: string;
  finish: string;
  safeMargin: string;
  cardType: string;
  keyFeatures: string;
  annualFee: string;
  transactionFee: string;
  foreignTransactionFee: string;
  
  // Mobile
  filtersActive: string;
  filter: string;
  filters: string;
  
  // Scroll to top
  scrollToTop: string;
  
  // Close
  close: string;
  
  // Language
  language: string;
  english: string;
  georgian: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    title: "Card Catalog",
    subtitle: "Explore our comprehensive collection of bank cards. Browse designs, compare features, and find the perfect card for your needs.",
    searchPlaceholder: "Search cards...",
    
    // Filters
    type: "Type",
    network: "Network",
    debit: "Debit",
    credit: "Credit",
    
    // Results
    showingAll: "Showing all",
    showingFiltered: "of",
    cards: "cards",
    clearAllFilters: "Clear all filters",
    
    // Empty state
    noCardsMatch: "No cards match your filters",
    tryAdjusting: "Try adjusting your search criteria or clearing some filters to see more results.",
    
    // Modal sections
    configurationDetails: "Configuration Details",
    cardFeatures: "Card Features",
    specialEffects: "Special Effects",
    feeInformation: "Fee Information",
    tags: "Tags",
    
    // Modal fields
    configuration: "Configuration:",
    dpi: "DPI:",
    colorProfile: "Color Profile:",
    bleed: "Bleed:",
    finish: "Finish:",
    safeMargin: "Safe Margin:",
    cardType: "Card Type:",
    keyFeatures: "Key Features:",
    annualFee: "Annual Fee:",
    transactionFee: "Transaction Fee:",
    foreignTransactionFee: "Foreign Transaction Fee:",
    
    // Mobile
    filtersActive: "active",
    filter: "filter",
    filters: "filters",
    
    // Scroll to top
    scrollToTop: "Scroll to top",
    
    // Close
    close: "Close modal",
    
    // Language
    language: "Language",
    english: "English",
    georgian: "Georgian"
  },
  ka: {
    // Header
    title: "ბარათების კატალოგი",
    subtitle: "გამოიკვლიეთ ჩვენი საბანკო ბარათების ყრთამი კოლექცია. დაათვალიერეთ დიზაინები, შეადარეთ ფუნქციები და იპოვეთ თქვენი საჭიროებისთვის სრულყოფილი ბარათი.",
    searchPlaceholder: "ბარათების ძიება...",
    
    // Filters
    type: "ტიპი",
    network: "ქსელი",
    debit: "სადებეტო",
    credit: "საკრედიტო",
    
    // Results
    showingAll: "ნაჩვენებია ყველა",
    showingFiltered: "-დან",
    cards: "ბარათი",
    clearAllFilters: "ყველა ფილტრის გასუფთავება",
    
    // Empty state
    noCardsMatch: "არც ერთი ბარათი არ შეესაბამება თქვენს ფილტრებს",
    tryAdjusting: "სცადეთ თქვენი ძიების კრიტერიუმების შეცვლა ან ზოგიერთი ფილტრის გასუფთავება მეტი შედეგის სანახავად.",
    
    // Modal sections
    configurationDetails: "კონფიგურაციის დეტალები",
    cardFeatures: "ბარათის ფუნქციები",
    specialEffects: "სპეციალური ეფექტები",
    feeInformation: "საკომისიო ინფორმაცია",
    tags: "ტეგები",
    
    // Modal fields
    configuration: "კონფიგურაცია:",
    dpi: "DPI:",
    colorProfile: "ფერთა პროფილი:",
    bleed: "ზღვარი:",
    finish: "დასრულება:",
    safeMargin: "უსაფრთხო ზღვარი:",
    cardType: "ბარათის ტიპი:",
    keyFeatures: "ძირითადი ფუნქციები:",
    annualFee: "წლიური საკომისიო:",
    transactionFee: "ტრანზაქციის საკომისიო:",
    foreignTransactionFee: "საზღვარგარეთული ტრანზაქციის საკომისიო:",
    
    // Mobile
    filtersActive: "აქტიური",
    filter: "ფილტრი",
    filters: "ფილტრები",
    
    // Scroll to top
    scrollToTop: "ზემოთ ასვლა",
    
    // Close
    close: "მოდალის დახურვა",
    
    // Language
    language: "ენა",
    english: "ინგლისური",
    georgian: "ქართული"
  }
};
