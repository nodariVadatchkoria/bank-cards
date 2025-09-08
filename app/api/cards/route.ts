import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CardItem } from '@/lib/types';

const CARDS_FILE_PATH = path.join(process.cwd(), 'data', 'cards.json');

// In-memory storage for Vercel (read-only file system)
let memoryCards: CardItem[] | null = null;

// Helper function to read cards from file or memory
async function readCards(): Promise<CardItem[]> {
  // If we're on Vercel (read-only file system), use memory storage
  if (process.env.VERCEL) {
    if (memoryCards === null) {
      // Initialize with default cards for Vercel
      memoryCards = [
        {
          id: 'abstract-waves',
          name: 'Abstract Waves',
          issuerNetwork: 'Visa',
          cardType: 'Credit',
          image: '/cards/abstract-waves.svg',
          printConfig: {
            name: 'CMYK 300DPI w/ 3mm bleed',
            dpi: 300,
            colorProfile: 'CMYK',
            bleedMm: 3,
            safeMarginMm: 2,
            finish: 'Glossy'
          },
          description: 'Modern design with flowing wave patterns',
          tags: ['modern', 'waves', 'abstract'],
          features: ['Contactless payment', 'Mobile wallet compatible'],
          fees: {
            annual: '$0',
            transaction: 'No fees',
            foreign: '2%'
          },
          chipValidityPeriod: '12/2028'
        },
        {
          id: 'aurora-foil',
          name: 'Aurora Foil',
          issuerNetwork: 'MasterCard',
          cardType: 'Credit',
          image: '/cards/aurora-foil.svg',
          printConfig: {
            name: 'CMYK 300DPI w/ 3mm bleed',
            dpi: 300,
            colorProfile: 'CMYK',
            bleedMm: 3,
            safeMarginMm: 2,
            finish: 'Glossy',
            special: ['Foil Silver']
          },
          description: 'Premium foil finish with aurora colors',
          tags: ['premium', 'foil', 'aurora'],
          features: ['Premium rewards', 'Travel insurance', 'Concierge service'],
          fees: {
            annual: '$95',
            transaction: 'No fees',
            foreign: '0%'
          },
          chipValidityPeriod: '06/2029'
        },
        {
          id: 'blue-pattern',
          name: 'Blue Pattern',
          issuerNetwork: 'Visa',
          cardType: 'Debit',
          image: '/cards/blue-pattern.svg',
          printConfig: {
            name: 'CMYK 300DPI w/ 3mm bleed',
            dpi: 300,
            colorProfile: 'CMYK',
            bleedMm: 3,
            safeMarginMm: 2,
            finish: 'Matte'
          },
          description: 'Classic blue geometric pattern',
          tags: ['classic', 'blue', 'geometric'],
          features: ['No annual fee', 'ATM access', 'Online banking'],
          fees: {
            annual: '$0',
            transaction: 'No fees',
            foreign: '1%'
          },
          chipValidityPeriod: '03/2027'
        },
        {
          id: 'carbon-black',
          name: 'Carbon Black',
          issuerNetwork: 'Visa',
          cardType: 'Credit',
          image: '/cards/carbon-black.svg',
          printConfig: {
            name: 'CMYK 300DPI w/ 3mm bleed',
            dpi: 300,
            colorProfile: 'CMYK',
            bleedMm: 3,
            safeMarginMm: 2,
            finish: 'Satin',
            special: ['Embossing']
          },
          description: 'Luxury black carbon fiber design',
          tags: ['luxury', 'black', 'carbon'],
          features: ['Premium rewards', 'Airport lounge access', 'Personal concierge'],
          fees: {
            annual: '$550',
            transaction: 'No fees',
            foreign: '0%'
          },
          chipValidityPeriod: '11/2030'
        },
        {
          id: 'emerald-luxury',
          name: 'Emerald Luxury',
          issuerNetwork: 'Visa',
          cardType: 'Credit',
          image: '/cards/emerald-luxury.svg',
          printConfig: {
            name: 'CMYK 300DPI w/ 3mm bleed',
            dpi: 300,
            colorProfile: 'CMYK',
            bleedMm: 3,
            safeMarginMm: 2,
            finish: 'Glossy',
            special: ['Foil Gold']
          },
          description: 'Premium emerald green luxury card',
          tags: ['luxury', 'emerald', 'green'],
          features: ['High rewards rate', 'Travel benefits', 'Purchase protection'],
          fees: {
            annual: '$450',
            transaction: 'No fees',
            foreign: '0%'
          },
          chipValidityPeriod: '08/2029'
        },
        {
          id: 'gold-foil',
          name: 'Gold Foil',
          issuerNetwork: 'MasterCard',
          cardType: 'Credit',
          image: '/cards/gold-foil.svg',
          printConfig: {
            name: 'CMYK 300DPI w/ 3mm bleed',
            dpi: 300,
            colorProfile: 'CMYK',
            bleedMm: 3,
            safeMarginMm: 2,
            finish: 'Glossy',
            special: ['Foil Gold']
          },
          description: 'Elegant gold foil premium card',
          tags: ['elegant', 'gold', 'foil'],
          features: ['Premium rewards', 'Extended warranty', 'Price protection'],
          fees: {
            annual: '$195',
            transaction: 'No fees',
            foreign: '0%'
          },
          chipValidityPeriod: '04/2028'
        },
        {
          id: 'midnight-gradient',
          name: 'Midnight Gradient',
          issuerNetwork: 'Visa',
          cardType: 'Debit',
          image: '/cards/midnight-gradient.svg',
          printConfig: {
            name: 'CMYK 300DPI w/ 3mm bleed',
            dpi: 300,
            colorProfile: 'CMYK',
            bleedMm: 3,
            safeMarginMm: 2,
            finish: 'Matte'
          },
          description: 'Dark gradient design for night owls',
          tags: ['dark', 'gradient', 'midnight'],
          features: ['No annual fee', 'Mobile app', 'Budget tracking'],
          fees: {
            annual: '$0',
            transaction: 'No fees',
            foreign: '1%'
          },
          chipValidityPeriod: '01/2026'
        },
        {
          id: 'rose-gold-elite',
          name: 'Rose Gold Elite',
          issuerNetwork: 'MasterCard',
          cardType: 'Credit',
          image: '/cards/rose-gold-elite.svg',
          printConfig: {
            name: 'CMYK 300DPI w/ 3mm bleed',
            dpi: 300,
            colorProfile: 'CMYK',
            bleedMm: 3,
            safeMarginMm: 2,
            finish: 'Glossy',
            special: ['Foil Rose Gold', 'Embossing']
          },
          description: 'Exclusive rose gold elite membership',
          tags: ['exclusive', 'rose-gold', 'elite'],
          features: ['Ultimate rewards', 'Private jet access', 'Personal butler'],
          fees: {
            annual: '$695',
            transaction: 'No fees',
            foreign: '0%'
          },
          chipValidityPeriod: '12/2031'
        }
      ];
    }
    return memoryCards || [];
  }

  // Local development - read from file
  try {
    const fileContent = await fs.readFile(CARDS_FILE_PATH, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading cards file:', error);
    return [];
  }
}

// Helper function to write cards to file or memory
async function writeCards(cards: CardItem[]): Promise<void> {
  // If we're on Vercel (read-only file system), use memory storage
  if (process.env.VERCEL) {
    memoryCards = cards;
    return;
  }

  // Local development - write to file
  try {
    await fs.writeFile(CARDS_FILE_PATH, JSON.stringify(cards, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing cards file:', error);
    throw error;
  }
}

// GET - Fetch all cards
export async function GET() {
  try {
    const cards = await readCards();
    return NextResponse.json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cards' },
      { status: 500 }
    );
  }
}

// POST - Create a new card
export async function POST(request: NextRequest) {
  try {
    const newCard: CardItem = await request.json();
    
    // Validate required fields
    if (!newCard.name || !newCard.issuerNetwork || !newCard.cardType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate unique ID if not provided
    if (!newCard.id) {
      newCard.id = uuidv4();
    }

    const cards = await readCards();
    
    // Check if card with same ID already exists (very unlikely with UUID, but just in case)
    const existingCard = cards.find(card => card.id === newCard.id);
    if (existingCard) {
      // Generate a new UUID if somehow there's a collision
      newCard.id = uuidv4();
    }

    cards.push(newCard);
    await writeCards(cards);

    return NextResponse.json(newCard, { status: 201 });
  } catch (error) {
    console.error('Error creating card:', error);
    return NextResponse.json(
      { error: 'Failed to create card' },
      { status: 500 }
    );
  }
}

// PUT - Update an existing card
export async function PUT(request: NextRequest) {
  try {
    const updatedCard: CardItem = await request.json();
    
    if (!updatedCard.id) {
      return NextResponse.json(
        { error: 'Card ID is required' },
        { status: 400 }
      );
    }

    const cards = await readCards();
    const cardIndex = cards.findIndex(card => card.id === updatedCard.id);
    
    if (cardIndex === -1) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      );
    }

    cards[cardIndex] = updatedCard;
    await writeCards(cards);

    return NextResponse.json(updatedCard);
  } catch (error) {
    console.error('Error updating card:', error);
    return NextResponse.json(
      { error: 'Failed to update card' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a card
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cardId = searchParams.get('id');
    
    if (!cardId) {
      return NextResponse.json(
        { error: 'Card ID is required' },
        { status: 400 }
      );
    }

    const cards = await readCards();
    const cardIndex = cards.findIndex(card => card.id === cardId);
    
    if (cardIndex === -1) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      );
    }

    const deletedCard = cards[cardIndex];
    cards.splice(cardIndex, 1);
    await writeCards(cards);

    return NextResponse.json(deletedCard);
  } catch (error) {
    console.error('Error deleting card:', error);
    return NextResponse.json(
      { error: 'Failed to delete card' },
      { status: 500 }
    );
  }
}
