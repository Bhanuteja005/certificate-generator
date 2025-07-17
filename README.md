# Certificate Generator

A modern web application that generates beautiful certificates using Canvas.js and Gemini AI API.

## Features

- 🎨 Generate 5 unique certificate designs for any category
- 🤖 AI-powered design suggestions using Google's Gemini AI
- 🎯 Multiple design styles: Modern, Elegant, Creative, Professional, Minimalist
- 🖼️ Real-time canvas rendering
- 💾 Download certificates as PNG images
- 🔧 View and copy Canvas.js code for each design
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Google Gemini AI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd certificate-generator
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Gemini AI API key to `.env.local`:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a category name (e.g., "Summer Code Camp Certificate", "AI for Farmers")
2. Click "Generate" to create 5 unique certificate designs
3. View the generated certificates in the preview area
4. Download certificates as PNG images
5. View and copy the Canvas.js code for each design

## Project Structure

```
├── app/
│   ├── components/
│   │   └── CertificateGenerator.tsx    # Main certificate generator component
│   ├── lib/
│   │   └── certificateService.ts       # OpenAI integration and design generation
│   ├── api/
│   │   └── generate-certificates/
│   │       └── route.ts                # API route for certificate generation
│   ├── page.tsx                        # Main page component
│   └── layout.tsx                      # Root layout
├── public/                             # Static assets
└── package.json
```

## API Integration

The application uses Google's Gemini AI model to generate creative certificate design concepts. Each design includes:

- Unique title and description
- Color scheme (primary, secondary, accent, text)
- Design style classification
- Generated Canvas.js code

## Certificate Styles

1. **Modern**: Contemporary designs with gradients and clean typography
2. **Elegant**: Classic and sophisticated with ornate details
3. **Creative**: Bold and colorful with artistic elements
4. **Professional**: Clean and authoritative for formal recognition
5. **Minimalist**: Simple and elegant focusing on content

## Canvas.js Implementation

Each certificate is rendered using HTML5 Canvas with:
- Custom drawing functions for each style
- Responsive canvas sizing
- High-quality image export
- Reusable code snippets

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Canvas API** - Certificate rendering
- **Google Gemini AI** - AI-powered design generation
- **Lucide React** - Icons

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
