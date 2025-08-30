# Card Catalog - Bank Card Collection

A modern, responsive web application for browsing and exploring bank card designs. Built with Next.js 14, TypeScript, and TailwindCSS.

## 🌟 Features

- **Responsive Design**: Mobile-first design that works beautifully on all devices
- **Advanced Search**: Search cards by name, features, description, and tags
- **Smart Filtering**: Filter by card type (Debit/Credit) and network (Visa/MasterCard)
- **URL State Management**: All filters and search state persist in the URL for easy sharing
- **Accessible**: Built with accessibility in mind, following WCAG guidelines
- **SEO Optimized**: Proper meta tags and Open Graph support
- **Fast Performance**: Optimized images with Next.js Image component
- **Type Safe**: Full TypeScript coverage for better developer experience

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd bank-cards
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
bank-cards/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with SEO
│   └── page.tsx          # Main catalog page
├── components/            # Reusable UI components
│   ├── CardTile.tsx      # Individual card display
│   ├── FilterPills.tsx   # Filter toggle buttons
│   └── SearchBar.tsx     # Search input component
├── data/                 # Static data files
│   └── cards.json       # Card catalog data
├── lib/                 # Utilities and business logic
│   ├── filtering.ts     # Filter and search logic
│   ├── types.ts         # TypeScript type definitions
│   └── useQueryState.ts # URL state management hook
├── public/              # Static assets
│   └── cards/          # Card design images (SVG)
├── scripts/            # Build and utility scripts
│   └── generate-cards.js # Card image generator
└── test/               # Test files
    └── filtering.test.ts # Unit tests for filtering logic
```

## 🎨 Card Data Format

Each card in the catalog follows this structure:

```typescript
{
  "id": "unique-card-id",
  "name": "Card Display Name",
  "issuerNetwork": "Visa" | "MasterCard",
  "cardType": "Debit" | "Credit",
  "image": "/cards/card-image.svg",
  "printConfig": {
    "name": "Print specification name",
    "dpi": 300,
    "colorProfile": "CMYK" | "RGB",
    "bleedMm": 3,
    "finish": "Matte" | "Glossy" | "Satin",
    "special": ["Embossing", "Foil Silver"]
  },
  "tags": ["searchable", "keywords"],
  "description": "Marketing description",
  "features": ["Key feature 1", "Key feature 2"],
  "fees": {
    "annual": "Fee information",
    "transaction": "Transaction fees",
    "foreign": "Foreign transaction fees"
  }
}
```

## 🧪 Testing

Run the test suite:

```bash
# Run tests once
npm run test:run

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui
```

The project includes comprehensive unit tests for the filtering logic, covering:
- Search functionality
- Filter combinations
- URL state management
- Edge cases and error handling

## 🎯 Key Technical Features

### Search & Filtering
- **Real-time search**: Instant filtering as you type
- **Multi-field search**: Searches across name, tags, description, and print config
- **Combinable filters**: AND logic across filter groups
- **URL persistence**: All state synced with browser URL for sharing and bookmarking

### Performance
- **Next.js Image optimization**: Automatic image optimization and lazy loading
- **SVG graphics**: Scalable vector graphics for crisp display at any size
- **Client-side filtering**: Fast, responsive filtering without server requests

### Accessibility
- **Keyboard navigation**: Full keyboard support for all interactions
- **Screen reader friendly**: Proper ARIA labels and semantic HTML
- **Focus management**: Clear focus indicators and logical tab order
- **High contrast**: Color combinations that meet WCAG guidelines

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:ui      # Run tests with UI dashboard
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically build and deploy your app

### Manual Deployment

```bash
npm run build
npm run start
```

## 🎨 Customization

### Adding New Cards

1. Add card data to `data/cards.json`
2. Add corresponding card image to `public/cards/`
3. Or run the image generator: `node scripts/generate-cards.js`

### Styling

The project uses TailwindCSS for styling. Key customization points:

- `app/globals.css`: Global styles and utilities
- `tailwind.config.js`: Theme configuration (if needed)
- Component files: Individual component styling

### Adding New Filters

1. Update the `FilterState` type in `lib/types.ts`
2. Add filter logic in `lib/filtering.ts`
3. Add UI components for new filters
4. Update URL state management in `useQueryState.ts`

## 📋 Future Enhancements

- [ ] Card detail pages with full specifications
- [ ] Card comparison tool
- [ ] User favorites and wishlist
- [ ] Advanced filtering (price ranges, benefits)
- [ ] Print specification export (PDF/JSON)
- [ ] Admin panel for card management
- [ ] User reviews and ratings
- [ ] Integration with banking APIs
- [ ] Personalized recommendations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔍 SEO Features

- Comprehensive meta tags for social sharing
- Open Graph and Twitter Card support
- Semantic HTML structure
- Fast loading times for better search rankings
- Mobile-responsive design

---

Built with ❤️ using Next.js, TypeScript, and TailwindCSS