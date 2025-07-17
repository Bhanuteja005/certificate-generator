import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

interface CertificateDesign {
  id: number;
  title: string;
  description: string;
  canvasCode: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };
  style: 'modern' | 'elegant' | 'creative' | 'professional' | 'minimalist';
}

const generateCertificateDesigns = async (category: string): Promise<CertificateDesign[]> => {
  try {
    const prompt = `
      Generate 5 different certificate design concepts for the category: "${category}".
      
      For each design, provide:
      1. A creative title
      2. A brief description
      3. Color scheme (primary, secondary, accent, text colors as hex codes)
      4. Style type (modern, elegant, creative, professional, or minimalist)
      
      Make each design unique and appropriate for the category. Consider the target audience and context.
      
      Return the response in this exact JSON format:
      {
        "designs": [
          {
            "id": 1,
            "title": "Design Title",
            "description": "Brief description of the design concept",
            "colors": {
              "primary": "#hexcode",
              "secondary": "#hexcode", 
              "accent": "#hexcode",
              "text": "#hexcode"
            },
            "style": "modern"
          }
        ]
      }
    `;

    let result;
    try {
      // Try gemini-1.5-flash first
      result = await model.generateContent(prompt);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (errorMessage.includes('not found') || errorMessage.includes('404')) {
        // Try gemini-1.5-pro as fallback
        const altModel = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
        result = await altModel.generateContent(prompt);
      } else {
        throw error;
      }
    }

    const response = await result.response;
    const content = response.text();
    
    if (!content) throw new Error('No response from Gemini AI');

    // Extract JSON from the response (Gemini sometimes includes extra text)
    let jsonContent = content;
    const jsonStart = content.indexOf('{');
    const jsonEnd = content.lastIndexOf('}') + 1;
    
    if (jsonStart !== -1 && jsonEnd !== -1) {
      jsonContent = content.substring(jsonStart, jsonEnd);
    }

    const parsedResponse = JSON.parse(jsonContent);
    const designs = parsedResponse.designs.map((design: {
      title: string;
      description: string;
      colors: { primary: string; secondary: string; accent: string; text: string };
      style: 'modern' | 'elegant' | 'creative' | 'professional' | 'minimalist';
    }, index: number) => ({
      ...design,
      id: index + 1,
      canvasCode: generateCanvasCode(design, category)
    }));

    return designs;
  } catch (error) {
    console.error('Error generating designs:', error);
    // Return fallback designs if API fails
    return getFallbackDesigns(category);
  }
};

const generateCanvasCode = (design: {
  title: string;
  colors: { primary: string; secondary: string; accent: string; text: string };
  style: string;
}, category: string): string => {
  const styleFunction = getStyleFunctionName(design.style);
  
  return `// ${design.title} - Canvas.js Implementation
const canvas = document.getElementById('certificateCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Clear canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Color scheme
const colors = {
  primary: '${design.colors.primary}',
  secondary: '${design.colors.secondary}',
  accent: '${design.colors.accent}',
  text: '${design.colors.text}'
};

// ${design.style.charAt(0).toUpperCase() + design.style.slice(1)} Certificate Style
${styleFunction}(ctx, colors, '${category}');

function ${styleFunction}(ctx, colors, category) {
  ${getStyleSpecificCode(design.style)}
}

// Download function
function downloadCertificate() {
  const link = document.createElement('a');
  link.download = 'certificate.png';
  link.href = canvas.toDataURL();
  link.click();
}`;
};

const getStyleFunctionName = (style: string): string => {
  return `draw${style.charAt(0).toUpperCase() + style.slice(1)}Certificate`;
};

const getStyleSpecificCode = (style: string): string => {
  switch (style) {
    case 'modern':
      return `  // Modern gradient background
  const gradient = ctx.createLinearGradient(0, 0, 800, 600);
  gradient.addColorStop(0, colors.primary);
  gradient.addColorStop(1, colors.secondary);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 800, 600);
  
  // Modern border
  ctx.strokeStyle = colors.accent;
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, 760, 560);
  
  // Certificate text
  ctx.fillStyle = colors.text;
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('CERTIFICATE', 400, 120);
  
  ctx.font = '36px Arial';
  ctx.fillText(category, 400, 250);
  
  ctx.font = '28px Arial';
  ctx.fillText('This is to certify that', 400, 320);
  ctx.fillText('[Recipient Name]', 400, 370);`;

    case 'elegant':
      return `  // Elegant background
  ctx.fillStyle = colors.primary;
  ctx.fillRect(0, 0, 800, 600);
  
  // Ornate border
  ctx.strokeStyle = colors.accent;
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, 740, 540);
  
  // Elegant typography
  ctx.fillStyle = colors.text;
  ctx.font = 'italic 42px serif';
  ctx.textAlign = 'center';
  ctx.fillText('Certificate of Excellence', 400, 120);
  
  ctx.font = 'bold 32px serif';
  ctx.fillText(category, 400, 220);
  
  ctx.font = '24px serif';
  ctx.fillText('Presented to', 400, 300);
  ctx.fillText('[Recipient Name]', 400, 350);`;

    case 'creative':
      return `  // Creative background
  ctx.fillStyle = colors.primary;
  ctx.fillRect(0, 0, 800, 600);
  
  // Creative shapes
  ctx.fillStyle = colors.secondary;
  ctx.beginPath();
  ctx.arc(150, 150, 30, 0, Math.PI * 2);
  ctx.fill();
  
  // Dynamic border
  ctx.strokeStyle = colors.accent;
  ctx.lineWidth = 6;
  ctx.strokeRect(25, 25, 750, 550);
  
  // Creative text
  ctx.fillStyle = colors.text;
  ctx.font = 'bold 44px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('CREATIVE ACHIEVEMENT', 400, 100);
  
  ctx.font = 'bold 36px Arial';
  ctx.fillText(category, 400, 200);`;

    case 'professional':
      return `  // Professional background
  ctx.fillStyle = colors.primary;
  ctx.fillRect(0, 0, 800, 600);
  
  // Professional header
  ctx.fillStyle = colors.secondary;
  ctx.fillRect(40, 40, 720, 80);
  
  // Professional text
  ctx.fillStyle = colors.text;
  ctx.font = 'bold 40px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('', 400, 90);
  
  ctx.font = 'bold 32px Arial';
  ctx.fillText(category, 400, 200);
  
  ctx.font = '24px Arial';
  ctx.fillText('This certifies that', 400, 270);
  ctx.fillText('[Recipient Name]', 400, 320);`;

    case 'minimalist':
      return `  // Clean background
  ctx.fillStyle = colors.primary;
  ctx.fillRect(0, 0, 800, 600);
  
  // Simple border
  ctx.strokeStyle = colors.accent;
  ctx.lineWidth = 2;
  ctx.strokeRect(60, 60, 680, 480);
  
  // Minimalist text
  ctx.fillStyle = colors.text;
  ctx.font = 'light 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('CERTIFICATE', 400, 150);
  
  ctx.font = 'bold 28px Arial';
  ctx.fillText(category, 400, 220);
  
  ctx.font = '20px Arial';
  ctx.fillText('Awarded to', 400, 300);
  ctx.fillText('[Recipient Name]', 400, 340);`;

    default:
      return `  // Default certificate style
  ctx.fillStyle = colors.primary;
  ctx.fillRect(0, 0, 800, 600);
  
  ctx.fillStyle = colors.text;
  ctx.font = '48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('CERTIFICATE', 400, 200);
  
  ctx.font = '32px Arial';
  ctx.fillText(category, 400, 300);`;
  }
};

const getFallbackDesigns = (category: string): CertificateDesign[] => {
  return [
    {
      id: 1,
      title: "Modern Navy & Gold Certificate",
      description: "A contemporary design with navy background and elegant gold accents",
      colors: {
        primary: "#1e3a8a",
        secondary: "#1e40af",
        accent: "#f59e0b",
        text: "#ffffff"
      },
      style: "modern",
      canvasCode: generateCanvasCode({
        title: "Modern Navy & Gold Certificate",
        colors: { primary: "#1e3a8a", secondary: "#1e40af", accent: "#f59e0b", text: "#ffffff" },
        style: "modern"
      }, category)
    },
    {
      id: 2,
      title: "Elegant Burgundy Certificate",
      description: "Classic and sophisticated design with burgundy and cream colors",
      colors: {
        primary: "#fefcf3",
        secondary: "#dc2626",
        accent: "#7c2d12",
        text: "#78716c"
      },
      style: "elegant",
      canvasCode: generateCanvasCode({
        title: "Elegant Burgundy Certificate",
        colors: { primary: "#fefcf3", secondary: "#dc2626", accent: "#7c2d12", text: "#78716c" },
        style: "elegant"
      }, category)
    },
    {
      id: 3,
      title: "Creative Teal & Purple Certificate",
      description: "Bold and vibrant design with teal background and purple accents",
      colors: {
        primary: "#0f766e",
        secondary: "#14b8a6",
        accent: "#a855f7",
        text: "#ffffff"
      },
      style: "creative",
      canvasCode: generateCanvasCode({
        title: "Creative Teal & Purple Certificate",
        colors: { primary: "#0f766e", secondary: "#14b8a6", accent: "#a855f7", text: "#ffffff" },
        style: "creative"
      }, category)
    },
    {
      id: 4,
      title: "Professional Charcoal Certificate",
      description: "Clean and authoritative design with charcoal and silver colors",
      colors: {
        primary: "#374151",
        secondary: "#64748b",
        accent: "#94a3b8",
        text: "#ffffff"
      },
      style: "professional",
      canvasCode: generateCanvasCode({
        title: "Professional Charcoal Certificate",
        colors: { primary: "#374151", secondary: "#64748b", accent: "#94a3b8", text: "#ffffff" },
        style: "professional"
      }, category)
    },
    {
      id: 5,
      title: "Minimalist Green Certificate",
      description: "Simple and elegant design with forest green accents on white",
      colors: {
        primary: "#ffffff",
        secondary: "#22c55e",
        accent: "#166534",
        text: "#374151"
      },
      style: "minimalist",
      canvasCode: generateCanvasCode({
        title: "Minimalist Green Certificate",
        colors: { primary: "#ffffff", secondary: "#22c55e", accent: "#166534", text: "#374151" },
        style: "minimalist"
      }, category)
    }
  ];
};

export { generateCertificateDesigns };
export type { CertificateDesign };
