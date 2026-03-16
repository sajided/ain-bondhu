# পারিবারিক আইন সহায়ক (Paribarik Ain Sahayak) — Frontend

AI-powered family law assistant for Bangladeshi women. Provides strategic, personalized legal guidance in simple Bengali through a WhatsApp-inspired chat interface.

Built for [BRAC](https://www.brac.net/) to democratize access to legal knowledge for underprivileged women who cannot afford legal representation.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- react-markdown

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment — create .env with your backend URL
echo "VITE_API_BASE_URL=http://localhost:8000" > .env

# Start dev server
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── components/
│   ├── chat/          # ChatMessage, ChatInput, TypingIndicator, BotAvatar
│   ├── landing/       # HomeLanding page
│   └── layout/        # Header, Layout, Sidebar
├── hooks/             # useChatSession
├── services/          # API client
├── constants/         # Law mappings
├── types/             # TypeScript types
└── assets/            # Nokshi Kantha pattern
```

## Design

WhatsApp-inspired UI familiar to Bengali-speaking users:
- Dark green header bar with bot avatar
- Chat bubbles with tails and Bengali timestamps
- Warm beige background with Nokshi Kantha pattern overlay
- Compact pill input with circular send button
- System notice pill for disclaimers
