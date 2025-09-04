import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { CardItem } from '@/lib/types';

const CARDS_FILE_PATH = path.join(process.cwd(), 'data', 'cards.json');

// Helper function to read cards from file
async function readCards(): Promise<CardItem[]> {
  try {
    const fileContent = await fs.readFile(CARDS_FILE_PATH, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading cards file:', error);
    return [];
  }
}

// Helper function to write cards to file
async function writeCards(cards: CardItem[]): Promise<void> {
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
      newCard.id = newCard.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    }

    const cards = await readCards();
    
    // Check if card with same ID already exists
    const existingCard = cards.find(card => card.id === newCard.id);
    if (existingCard) {
      // Make ID unique by adding timestamp
      newCard.id = `${newCard.id}-${Date.now()}`;
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
