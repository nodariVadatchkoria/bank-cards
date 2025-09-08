# Bank Cards Catalog

A modern, responsive web application for managing a catalog of bank card designs. Built with Next.js, TypeScript, and featuring full CRUD operations with persistent data storage.

## ✨ Features

### 🎨 Card Management
- **View Cards**: Browse through a beautiful grid of bank card designs
- **Add Cards**: Create new card entries with detailed information
- **Edit Cards**: Modify existing card details with a comprehensive form
- **Delete Cards**: Remove cards with confirmation dialog
- **Search & Filter**: Find cards by name, type, or network

### 📱 User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface with smooth animations
- **Image Upload**: Upload and preview card images
- **Real-time Updates**: Changes reflect immediately in the interface
- **Persistent Storage**: All data is saved to JSON file and survives browser restarts

### 🔧 Technical Features
- **Full CRUD API**: RESTful endpoints for all card operations
- **TypeScript**: Fully typed codebase for better development experience
- **Next.js 15**: Latest Next.js with App Router and Turbopack
- **File-based Storage**: JSON file persistence for easy data management
- **Error Handling**: Graceful fallbacks and user-friendly error messages

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bank-cards.git
   cd bank-cards
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
bank-cards/
├── app/
│   ├── api/cards/          # API routes for CRUD operations
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Main page component
├── components/
│   ├── CardModal.tsx       # Card detail view modal
│   ├── CardTile.tsx        # Individual card display component
│   ├── DeleteConfirmationModal.tsx  # Delete confirmation dialog
│   ├── EditCardModal.tsx   # Add/Edit card form modal
│   ├── FilterPills.tsx     # Filter component
│   ├── LanguageProvider.tsx # Internationalization provider
│   ├── LanguageSwitcher.tsx # Language toggle component
│   ├── ScrollToTop.tsx     # Scroll to top button
│   └── SearchBar.tsx       # Search input component
├── data/
│   └── cards.json          # Card data storage (auto-generated)
├── lib/
│   ├── filtering.ts        # Filter logic and utilities
│   ├── translations.ts     # Internationalization strings
│   ├── types.ts           # TypeScript type definitions
│   ├── useLanguage.ts     # Language hook
│   └── useQueryState.ts   # URL state management hook
├── public/
│   └── cards/             # Card image assets
└── scripts/
    └── generate-cards.js  # Card data generation script
```

## 🎯 Usage

### Adding a New Card
1. Click the **"+Add New Card"** button
2. Fill in the card details:
   - Basic information (name, network, type)
   - Card image upload
   - Print configuration
   - Features and fees
   - Tags for searchability
3. Click **"Add Card"** to save

### Editing a Card
1. Click on any card to view details
2. Click the blue **edit icon** in the top-right
3. Modify any fields in the form
4. Click **"Save Changes"** to update

### Deleting a Card
1. Click on any card to view details
2. Click the red **delete icon** in the top-right
3. Confirm deletion in the warning dialog

### Searching and Filtering
- Use the search bar to find cards by name
- Use filter pills to filter by card type (Debit/Credit) or network (Visa/MasterCard)
- Clear all filters with the "Clear All" button

## 🔌 API Endpoints

The application includes a RESTful API for card management:

- `GET /api/cards` - Fetch all cards
- `POST /api/cards` - Create a new card
- `PUT /api/cards` - Update an existing card
- `DELETE /api/cards?id={cardId}` - Delete a card

## 💾 Data Storage

Card data is stored in `/data/cards.json` and includes:
- Card identification and basic info
- Print configuration details
- Features and fee information
- Tags for searchability
- Image references

## 🌐 Internationalization

The application supports multiple languages with:
- English (default)
- Easy extension for additional languages
- Language switcher in the header

## 🎨 Customization

### Adding New Card Types
1. Update the `CardItem` type in `lib/types.ts`
2. Modify the form in `EditCardModal.tsx`
3. Update filtering logic in `lib/filtering.ts`

### Styling
- Global styles in `app/globals.css`
- Component-specific styles using inline styles
- Responsive design with CSS Grid and Flexbox

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔀 Merge Procedure (Merge work into main)

Use either the IDE (recommended) or CLI steps below.

- Prerequisites:
  - Ensure your working tree is clean (commit or stash changes).
  - Ensure you have permission to push to main or open a PR/MR if main is protected.

- JetBrains IDE (UI):
  1. Checkout main: Git → Branches → select main → Checkout.
  2. Update main: Git → Pull.
  3. Merge work into main: Git → Branches → select work → Merge into Current.
  4. If conflicts appear, resolve them in the merge tool, then Apply.
  5. Push: Git → Push (to update origin/main).

- Command line (CLI):
  ```bash
  git checkout main
  git pull origin main
  git merge work          # resolve conflicts if prompted
  # If conflicts occurred:
  #   (edit files to resolve) 
  #   git add -A
  #   git commit
  git push origin main
  ```

- Notes:
  - To force a merge commit: use the IDE “no-ff” option or run `git merge --no-ff work`.
  - To squash on merge (single commit): use IDE “squash” option or `git merge --squash work && git commit`.
  - If main is protected, create a PR/MR from work → main instead of pushing directly.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Icons by [Lucide](https://lucide.dev/)
- Design inspired by modern banking applications

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Review the code comments

---

# Bank Cards Catalog - Updated Tue Sep  9 02:23:10 +04 2025
