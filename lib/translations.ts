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
  
  // New buttons and features
  addNewCard: string;
  checkChipExpiration: string;
  adding: string;
  saving: string;
  saveChanges: string;
  cancel: string;
  
  // Edit/Add Card Modal
  editCard: string;
  addNewCardTitle: string;
  basicInformation: string;
  cardName: string;
  cardImage: string;
  uploadCardImage: string;
  clickToUpload: string;
  dragAndDrop: string;
  fileTypes: string;
  preview: string;
  printConfiguration: string;
  specialEffects: string;
  featuresAndFees: string;
  keyFeaturesComma: string;
  chipValidityPeriod: string;
  tagsComma: string;
  
  // Chip Expiration Modal
  chipExpirationCheck: string;
  foundExpiringCards: string;
  allChipsValid: string;
  actionRequired: string;
  actionRequiredDescription: string;
  allChipsValidTitle: string;
  allChipsValidDescription: string;
  expires: string;
  close: string;
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
    georgian: "Georgian",
    
    // New buttons and features
    addNewCard: "Add New Card",
    checkChipExpiration: "Check Chip Expiration",
    adding: "Adding...",
    saving: "Saving...",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    
    // Edit/Add Card Modal
    editCard: "Edit Card",
    addNewCardTitle: "Add New Card",
    basicInformation: "Basic Information",
    cardName: "Card Name",
    cardImage: "Card Image",
    uploadCardImage: "Upload Card Image",
    clickToUpload: "Click to upload or drag and drop",
    dragAndDrop: "Click to upload or drag and drop",
    fileTypes: "PNG, JPG, SVG up to 10MB",
    preview: "Preview",
    printConfiguration: "Print Configuration",
    specialEffects: "Special Effects (comma-separated)",
    featuresAndFees: "Features and Fees",
    keyFeaturesComma: "Key Features (comma-separated)",
    chipValidityPeriod: "Chip Validity Period",
    tagsComma: "Tags (comma-separated)",
    
    // Chip Expiration Modal
    chipExpirationCheck: "Chip Expiration Check",
    foundExpiringCards: "Found {count} card{plural} with chips expiring within 2 years",
    allChipsValid: "All card chips are valid for more than 2 years",
    actionRequired: "Action Required",
    actionRequiredDescription: "The following cards have chips that will expire within the next 2 years. Consider contacting the card manufacturer for replacement or renewal.",
    allChipsValidTitle: "All Chips Valid",
    allChipsValidDescription: "Great news! All card chips in your catalog are valid for more than 2 years. No immediate action is required.",
    expires: "Expires:",
    close: "Close"
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
    georgian: "ქართული",
    
    // New buttons and features
    addNewCard: "ახალი ბარათის დამატება",
    checkChipExpiration: "ჩიპის ვადის შემოწმება",
    adding: "დამატება...",
    saving: "შენახვა...",
    saveChanges: "ცვლილებების შენახვა",
    cancel: "გაუქმება",
    
    // Edit/Add Card Modal
    editCard: "ბარათის რედაქტირება",
    addNewCardTitle: "ახალი ბარათის დამატება",
    basicInformation: "ძირითადი ინფორმაცია",
    cardName: "ბარათის სახელი",
    cardImage: "ბარათის სურათი",
    uploadCardImage: "ბარათის სურათის ატვირთვა",
    clickToUpload: "ატვირთვისთვის დააწკაპუნეთ ან გადაიტანეთ",
    dragAndDrop: "ატვირთვისთვის დააწკაპუნეთ ან გადაიტანეთ",
    fileTypes: "PNG, JPG, SVG 10MB-მდე",
    preview: "წინასწარი ნახვა",
    printConfiguration: "ბეჭდვის კონფიგურაცია",
    specialEffects: "სპეციალური ეფექტები (მძიმით გამოყოფილი)",
    featuresAndFees: "ფუნქციები და საკომისიოები",
    keyFeaturesComma: "ძირითადი ფუნქციები (მძიმით გამოყოფილი)",
    chipValidityPeriod: "ჩიპის მოქმედების პერიოდი",
    tagsComma: "ტეგები (მძიმით გამოყოფილი)",
    
    // Chip Expiration Modal
    chipExpirationCheck: "ჩიპის ვადის შემოწმება",
    foundExpiringCards: "ნაპოვნია {count} ბარათი{plural} ჩიპებით, რომლებიც 2 წელში ვადას გაუვლის",
    allChipsValid: "ყველა ბარათის ჩიპი 2 წელზე მეტი ვადით მოქმედებს",
    actionRequired: "მოქმედება საჭიროა",
    actionRequiredDescription: "შემდეგ ბარათებს აქვთ ჩიპები, რომლებიც მომდევნო 2 წელში ვადას გაუვლის. განიხილეთ ბარათის მწარმოებელთან დაკავშირება ჩანაცვლების ან განახლებისთვის.",
    allChipsValidTitle: "ყველა ჩიპი მოქმედებს",
    allChipsValidDescription: "შესანიშნავი ამბავია! თქვენი კატალოგის ყველა ბარათის ჩიპი 2 წელზე მეტი ვადით მოქმედებს. დაუყოვნებელი მოქმედება არ არის საჭირო.",
    expires: "ვადა:",
    close: "დახურვა"
  }
};
