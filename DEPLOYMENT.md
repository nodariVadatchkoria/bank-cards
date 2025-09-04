# Deployment Guide

This guide covers various deployment options for the Bank Cards Catalog application.

## 🚀 Quick Deploy to Vercel (Recommended)

### Option 1: Deploy with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**
   ```bash
   vercel
   ```

4. **Follow the prompts**
   - Link to existing project or create new
   - Configure build settings (auto-detected)
   - Deploy!

### Option 2: Deploy via GitHub Integration

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure settings (auto-detected)
   - Deploy!

## 🌐 Other Deployment Options

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `.next` folder to Netlify
   - Or connect your GitHub repository
   - Configure build command: `npm run build`
   - Configure publish directory: `.next`

### Railway

1. **Connect GitHub repository**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub account
   - Select your repository

2. **Configure deployment**
   - Build command: `npm run build`
   - Start command: `npm run start`
   - Deploy!

### DigitalOcean App Platform

1. **Create new app**
   - Go to DigitalOcean App Platform
   - Connect your GitHub repository

2. **Configure build settings**
   - Build command: `npm run build`
   - Run command: `npm run start`
   - Environment: Node.js

### AWS Amplify

1. **Connect repository**
   - Go to AWS Amplify Console
   - Connect your GitHub repository

2. **Configure build settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

## 🔧 Environment Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
# Optional: Custom API base URL
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Optional: Custom data file path
DATA_FILE_PATH=./data/cards.json
```

### Production Environment Variables

For production deployments, set these in your hosting platform:

- `NODE_ENV=production`
- Any custom configuration variables

## 📁 Build Configuration

### Next.js Configuration

The project uses the default Next.js configuration. Key settings:

- **Output**: Static export ready
- **TypeScript**: Enabled
- **ESLint**: Configured
- **Turbopack**: Enabled for faster builds

### Build Process

```bash
# Install dependencies
npm install

# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build

# Start production server
npm run start
```

## 🗄️ Data Persistence

### File-based Storage

The application uses JSON file storage by default:

- **Local development**: `./data/cards.json`
- **Production**: Same file path (ensure write permissions)

### Database Migration (Optional)

To migrate to a database:

1. **Choose a database** (PostgreSQL, MongoDB, etc.)
2. **Update API routes** in `app/api/cards/route.ts`
3. **Add database client** to dependencies
4. **Update environment variables**

Example with PostgreSQL:

```typescript
// app/api/cards/route.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  const result = await pool.query('SELECT * FROM cards');
  return NextResponse.json(result.rows);
}
```

## 🔒 Security Considerations

### API Security

- **Input validation**: All inputs are validated
- **Error handling**: No sensitive data in error messages
- **File permissions**: Ensure proper file system permissions

### Environment Security

- **Environment variables**: Never commit sensitive data
- **API keys**: Store in environment variables
- **HTTPS**: Always use HTTPS in production

## 📊 Performance Optimization

### Build Optimization

- **Code splitting**: Automatic with Next.js
- **Image optimization**: Using Next.js Image component
- **Bundle analysis**: Use `npm run build` to analyze bundle size

### Runtime Optimization

- **Caching**: Implement API response caching
- **CDN**: Use a CDN for static assets
- **Database indexing**: If using a database

## 🐛 Troubleshooting

### Common Issues

1. **Build failures**
   ```bash
   # Clear cache and rebuild
   npm run clean
   npm install
   npm run build
   ```

2. **API errors**
   - Check file permissions for `data/cards.json`
   - Verify environment variables
   - Check server logs

3. **Deployment issues**
   - Verify build command
   - Check Node.js version compatibility
   - Review deployment logs

### Debug Mode

Enable debug mode for development:

```bash
DEBUG=* npm run dev
```

## 📈 Monitoring

### Health Checks

Add health check endpoint:

```typescript
// app/api/health/route.ts
export async function GET() {
  return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
}
```

### Logging

Implement proper logging:

```typescript
// lib/logger.ts
export const logger = {
  info: (message: string) => console.log(`[INFO] ${message}`),
  error: (message: string) => console.error(`[ERROR] ${message}`),
  warn: (message: string) => console.warn(`[WARN] ${message}`),
};
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run test:run
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 Support

If you encounter deployment issues:

1. Check the deployment logs
2. Verify environment configuration
3. Test locally with production build
4. Open an issue on GitHub

---

**Happy deploying! 🚀**
