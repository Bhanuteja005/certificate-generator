# 🎓 CertifyAI - AI-Powered Certificate Generator

> Generate stunning professional certificates with the power of AI using Next.js 15, Gemini AI, and Canvas.js

## ✨ Features

- 🤖 **AI-Powered Generation** - Uses Google Gemini AI to create unique designs
- 🎨 **5 Professional Styles** - Modern, Elegant, Creative, Professional, Minimalist
- � **Responsive Design** - Beautiful white/blue theme that works on all devices
- 🖼️ **High-Quality Output** - Canvas.js rendering with downloadable PNG files
- � **Code Export** - View and copy the Canvas.js code for each design
- ⚡ **Real-time Preview** - Instant certificate generation and preview
- 🔄 **Visual Feedback** - Copy confirmation and loading animations

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **AI**: Google Gemini AI (gemini-1.5-flash)
- **Animation**: Framer Motion
- **Graphics**: HTML5 Canvas API
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom gradients

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google AI API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bhanuteja005/certificate-generator.git
   cd certificate-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   echo "GOOGLE_AI_API_KEY=your_gemini_api_key_here" > .env.local
   ```

4. **Get your Google AI API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env.local` file

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   ```
   Navigate to http://localhost:3000
   ```

## 📖 How It Works

### 1. User Input
Users enter a certificate category (e.g., "Summer Code Camp Certificate")

### 2. AI Generation
- Request sent to `/api/generate-certificates`
- Gemini AI generates 5 unique certificate designs
- Each design includes colors, style, and Canvas.js code

### 3. Canvas Rendering
- Canvas.js renders high-quality certificates (1200x850px)
- 5 distinct styles with professional color schemes
- Responsive display with full preview

### 4. Export Options
- Download certificates as PNG files
- View and copy Canvas.js code
- Visual feedback for all interactions

## 🎨 Certificate Styles

| Style | Colors | Use Case |
|-------|--------|----------|
| **Modern** | Navy Blue + Gold | Corporate training, tech certificates |
| **Elegant** | Burgundy + Cream | Academic achievements, formal recognition |
| **Creative** | Teal + Purple | Design courses, creative workshops |
| **Professional** | Charcoal + Silver | Professional certifications, compliance |
| **Minimalist** | Forest Green + White | Clean, modern certificates |

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
- **Google Gemini AI** - AI-powered design generation
- **Lucide React** - Icons

