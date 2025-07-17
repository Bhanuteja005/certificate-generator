'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Download, Sparkles, Code, RefreshCw, Wand2, Palette, Star, Zap, Award, Settings } from 'lucide-react';
import { clsx } from 'clsx';

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

interface CertificateGeneratorProps {
  onGenerate: (category: string) => Promise<CertificateDesign[]>;
}

export default function CertificateGenerator({ onGenerate }: CertificateGeneratorProps) {
  const [category, setCategory] = useState('');
  const [designs, setDesigns] = useState<CertificateDesign[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCode, setShowCode] = useState<{ [key: number]: boolean }>({});
  const canvasRefs = useRef<{ [key: number]: HTMLCanvasElement | null }>({});
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const handleGenerate = async () => {
    if (!category.trim()) return;
    
    setIsGenerating(true);
    setDesigns([]);
    
    try {
      const generatedDesigns = await onGenerate(category);
      setDesigns(generatedDesigns);
      
      setTimeout(() => {
        generatedDesigns.forEach(design => {
          drawCertificate(design);
        });
      }, 100);
    } catch (error) {
      console.error('Error generating certificates:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const drawCertificate = (design: CertificateDesign) => {
    const canvas = canvasRefs.current[design.id];
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = 1200 * dpr;
    canvas.height = 850 * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
    canvas.style.maxWidth = '800px';

    ctx.clearRect(0, 0, 1200, 850);

    switch (design.style) {
      case 'modern':
        drawModernCertificate(ctx, design, category);
        break;
      case 'elegant':
        drawElegantCertificate(ctx, design, category);
        break;
      case 'creative':
        drawCreativeCertificate(ctx, design, category);
        break;
      case 'professional':
        drawProfessionalCertificate(ctx, design, category);
        break;
      case 'minimalist':
        drawMinimalistCertificate(ctx, design, category);
        break;
    }
  };

  const drawModernCertificate = (ctx: CanvasRenderingContext2D, design: CertificateDesign, category: string) => {
    // Beautiful deep navy background with gold accents
    const gradient = ctx.createLinearGradient(0, 0, 1200, 850);
    gradient.addColorStop(0, '#1e3a8a');
    gradient.addColorStop(0.5, '#1e40af');
    gradient.addColorStop(1, '#1e3a8a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 850);

    // Subtle texture overlay
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < 200; i++) {
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(Math.random() * 1200, Math.random() * 850, 2, 2);
    }
    ctx.globalAlpha = 1;

    // Elegant gold header with gradient
    const headerGradient = ctx.createLinearGradient(0, 0, 1200, 120);
    headerGradient.addColorStop(0, '#f59e0b');
    headerGradient.addColorStop(0.5, '#fbbf24');
    headerGradient.addColorStop(1, '#f59e0b');
    ctx.fillStyle = headerGradient;
    ctx.fillRect(0, 0, 1200, 120);

    // White section for header text
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(60, 30, 1080, 60);

    // Gold decorative corners
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(0, 0, 60, 60);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(60, 60, 30, Math.PI, 1.5 * Math.PI);
    ctx.fill();

    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(1140, 0, 60, 60);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(1140, 60, 30, 1.5 * Math.PI, 0);
    ctx.fill();

    // Modern border design
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 8;
    ctx.strokeRect(40, 40, 1120, 770);

    // Inner decorative border
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 60, 1080, 730);

    // Certificate title
    ctx.fillStyle = '#1e3a8a';
    ctx.font = 'bold 72px "Times New Roman", serif';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE', 600, 220);

    // Subtitle
    ctx.font = '32px "Times New Roman", serif';
    ctx.fillText('OF ACHIEVEMENT', 600, 270);

    // Decorative underline
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(350, 290);
    ctx.lineTo(850, 290);
    ctx.stroke();

    // Category in elegant style
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'italic 48px "Times New Roman", serif';
    ctx.fillText(category.toUpperCase(), 600, 380);

    // Award text
    ctx.fillStyle = '#ffffff';
    ctx.font = '28px "Times New Roman", serif';
    ctx.fillText('This certificate is proudly presented to', 600, 450);
    
    // Recipient name placeholder with elegant line
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(300, 520);
    ctx.lineTo(900, 520);
    ctx.stroke();

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'italic bold 36px "Times New Roman", serif';
    ctx.fillText('[RECIPIENT NAME]', 600, 510);

    // Achievement text
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px "Times New Roman", serif';
    ctx.fillText('For outstanding dedication and exceptional achievement', 600, 580);
    ctx.fillText('in the field of study and commitment to excellence', 600, 615);

    // Date and signature sections
    ctx.font = '20px "Times New Roman", serif';
    ctx.textAlign = 'left';
    ctx.fillText('Date: ___________________', 120, 720);
    
    ctx.textAlign = 'right';
    ctx.fillText('Authorized Signature: ___________________', 1080, 720);

    // Elegant seal design
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(1000, 650, 50, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(1000, 650, 35, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 14px "Arial", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('OFFICIAL', 1000, 645);
    ctx.fillText('SEAL', 1000, 665);

    // Decorative elements
    ctx.fillStyle = '#fbbf24';
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.arc(150, 350, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(1050, 350, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  };

  const drawElegantCertificate = (ctx: CanvasRenderingContext2D, design: CertificateDesign, category: string) => {
    // Elegant cream background
    ctx.fillStyle = '#fefcf3';
    ctx.fillRect(0, 0, 1200, 850);

    // Subtle burgundy pattern background
    ctx.globalAlpha = 0.03;
    for (let i = 0; i < 300; i++) {
      ctx.fillStyle = '#7c2d12';
      const x = Math.random() * 1200;
      const y = Math.random() * 850;
      ctx.fillRect(x, y, 1, 1);
    }
    ctx.globalAlpha = 1;

    // Elegant double border in burgundy
    ctx.strokeStyle = '#7c2d12';
    ctx.lineWidth = 6;
    ctx.strokeRect(50, 50, 1100, 750);

    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 3;
    ctx.strokeRect(80, 80, 1040, 690);

    // Ornate corner decorations
    drawElegantCorners(ctx, '#7c2d12');

    // Burgundy decorative header
    const headerGradient = ctx.createLinearGradient(100, 100, 1100, 150);
    headerGradient.addColorStop(0, '#7c2d12');
    headerGradient.addColorStop(0.5, '#dc2626');
    headerGradient.addColorStop(1, '#7c2d12');
    ctx.fillStyle = headerGradient;
    ctx.fillRect(100, 120, 1000, 8);

    // Classic typography
    ctx.fillStyle = '#7c2d12';
    ctx.font = 'italic bold 68px "Times New Roman", serif';
    ctx.textAlign = 'center';
    ctx.fillText('Certificate of Excellence', 600, 200);

    // Decorative underline with flourishes
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(250, 220);
    ctx.lineTo(950, 220);
    ctx.stroke();

    // Small decorative elements
    ctx.fillStyle = '#7c2d12';
    ctx.beginPath();
    ctx.arc(230, 220, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(970, 220, 8, 0, Math.PI * 2);
    ctx.fill();

    // Category with elegant styling
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 44px "Times New Roman", serif';
    ctx.fillText(category.toUpperCase(), 600, 320);

    // Award text
    ctx.fillStyle = '#78716c';
    ctx.font = '32px "Times New Roman", serif';
    ctx.fillText('is hereby presented to', 600, 400);
    
    // Recipient name with decorative line
    ctx.strokeStyle = '#7c2d12';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(250, 480);
    ctx.lineTo(950, 480);
    ctx.stroke();

    ctx.fillStyle = '#7c2d12';
    ctx.font = 'italic bold 40px "Times New Roman", serif';
    ctx.fillText('[RECIPIENT NAME]', 600, 470);

    // Achievement description
    ctx.fillStyle = '#78716c';
    ctx.font = '26px "Times New Roman", serif';
    ctx.fillText('in recognition of outstanding achievement', 600, 550);
    ctx.fillText('and exceptional dedication to excellence', 600, 585);

    // Date section
    ctx.font = '22px "Times New Roman", serif';
    ctx.fillText('This _______ day of _____________, 2025', 600, 680);

    // Signature lines
    ctx.strokeStyle = '#7c2d12';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(150, 750);
    ctx.lineTo(400, 750);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(800, 750);
    ctx.lineTo(1050, 750);
    ctx.stroke();

    ctx.fillStyle = '#78716c';
    ctx.font = '18px "Times New Roman", serif';
    ctx.textAlign = 'center';
    ctx.fillText('Director', 275, 770);
    ctx.fillText('Authorized Officer', 925, 770);

    // Elegant seal
    ctx.strokeStyle = '#7c2d12';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(950, 600, 45, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(950, 600, 30, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#7c2d12';
    ctx.font = 'bold 12px "Arial", sans-serif';
    ctx.fillText('EXCELLENCE', 950, 600);
    ctx.fillText('AWARD', 950, 615);
  };

  const drawCreativeCertificate = (ctx: CanvasRenderingContext2D, design: CertificateDesign, category: string) => {
    // Vibrant teal background with purple accents
    const gradient = ctx.createRadialGradient(600, 425, 0, 600, 425, 600);
    gradient.addColorStop(0, '#0f766e');
    gradient.addColorStop(0.7, '#14b8a6');
    gradient.addColorStop(1, '#0f766e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 850);

    // Creative geometric background pattern
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = '#a855f7';
    for (let i = 0; i < 20; i++) {
      const size = 30 + Math.random() * 40;
      const x = Math.random() * 1200;
      const y = Math.random() * 850;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.random() * Math.PI);
      ctx.fillRect(-size/2, -size/2, size, size);
      ctx.restore();
    }
    ctx.globalAlpha = 1;

    // Creative curved border
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(40, 40, 1120, 770, 30) : ctx.rect(40, 40, 1120, 770);
    ctx.stroke();

    // Inner creative border with dashed style
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 4;
    ctx.setLineDash([20, 10]);
    ctx.strokeRect(70, 70, 1060, 710);
    ctx.setLineDash([]);

    // Creative header with perspective effect
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px "Arial", sans-serif';
    ctx.textAlign = 'center';
    
    // Add shadow for depth
    ctx.shadowColor = 'rgba(168, 85, 247, 0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    
    ctx.save();
    ctx.transform(1, 0, -0.05, 1, 30, 0);
    ctx.fillText('CREATIVE CERTIFICATE', 600, 180);
    ctx.restore();
    
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Creative category with rotation
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 42px "Arial", sans-serif';
    ctx.save();
    ctx.translate(600, 280);
    ctx.rotate(-0.02);
    ctx.fillText(category.toUpperCase(), 0, 0);
    ctx.restore();

    // Creative decorative elements
    drawCreativeShapes(ctx, { primary: '#0f766e', secondary: '#c084fc', accent: '#a855f7' });

    // Award text with creative styling
    ctx.fillStyle = '#ffffff';
    ctx.font = '30px "Arial", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Creatively awarded to', 600, 380);
    
    // Recipient with artistic underline
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(300, 450);
    ctx.quadraticCurveTo(600, 465, 900, 450);
    ctx.stroke();

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 38px "Arial", sans-serif';
    ctx.fillText('[CREATIVE GENIUS]', 600, 440);

    // Achievement text
    ctx.fillStyle = '#ffffff';
    ctx.font = '26px "Arial", sans-serif';
    ctx.fillText('For exceptional creativity and innovation', 600, 520);
    ctx.fillText('in the pursuit of artistic excellence', 600, 555);

    // Creative signature section
    ctx.font = '22px "Arial", sans-serif';
    ctx.fillText('Creativity Director: _____________________', 600, 680);

    // Date with creative styling
    ctx.font = '20px "Arial", sans-serif';
    ctx.fillText('Date: ___________________', 600, 720);

    // Creative corner accents
    ctx.fillStyle = '#c084fc';
    ctx.globalAlpha = 0.8;
    
    // Top left
    ctx.beginPath();
    ctx.moveTo(80, 100);
    ctx.lineTo(120, 80);
    ctx.lineTo(140, 120);
    ctx.closePath();
    ctx.fill();
    
    // Top right
    ctx.beginPath();
    ctx.moveTo(1120, 100);
    ctx.lineTo(1080, 80);
    ctx.lineTo(1060, 120);
    ctx.closePath();
    ctx.fill();
    
    // Bottom corners
    ctx.beginPath();
    ctx.moveTo(80, 750);
    ctx.lineTo(120, 770);
    ctx.lineTo(140, 730);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(1120, 750);
    ctx.lineTo(1080, 770);
    ctx.lineTo(1060, 730);
    ctx.closePath();
    ctx.fill();
    
    ctx.globalAlpha = 1;
  };

  const drawProfessionalCertificate = (ctx: CanvasRenderingContext2D, design: CertificateDesign, category: string) => {
    // Professional charcoal background
    ctx.fillStyle = '#374151';
    ctx.fillRect(0, 0, 1200, 850);

    // Professional silver header
    const headerGradient = ctx.createLinearGradient(0, 0, 1200, 140);
    headerGradient.addColorStop(0, '#64748b');
    headerGradient.addColorStop(0.5, '#94a3b8');
    headerGradient.addColorStop(1, '#64748b');
    ctx.fillStyle = headerGradient;
    ctx.fillRect(0, 0, 1200, 140);

    // White content area in header
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(60, 30, 1080, 80);

    // Professional border
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 6;
    ctx.strokeRect(50, 50, 1100, 750);

    // Inner border for elegance
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.strokeRect(80, 80, 1040, 690);

    // Professional title
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 56px "Times New Roman", serif';
    ctx.textAlign = 'center';
    ctx.fillText('PROFESSIONAL CERTIFICATION', 600, 70);

    // Subtitle line
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(300, 95);
    ctx.lineTo(900, 95);
    ctx.stroke();

    // Institution/Organization area
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px "Times New Roman", serif';
    ctx.fillText('Awarded by [INSTITUTION NAME]', 600, 200);

    // Category title
    ctx.fillStyle = '#e5e7eb';
    ctx.font = 'bold 40px "Times New Roman", serif';
    ctx.fillText(category.toUpperCase(), 600, 280);

    // Certificate text
    ctx.fillStyle = '#ffffff';
    ctx.font = '28px "Times New Roman", serif';
    ctx.fillText('This is to certify that', 600, 360);
    
    // Recipient name with professional line
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(250, 430);
    ctx.lineTo(950, 430);
    ctx.stroke();

    ctx.fillStyle = '#e5e7eb';
    ctx.font = 'bold 42px "Times New Roman", serif';
    ctx.fillText('[PROFESSIONAL NAME]', 600, 420);

    // Achievement text
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px "Times New Roman", serif';
    ctx.fillText('has successfully completed all requirements', 600, 500);
    ctx.fillText('and is hereby certified as qualified professional', 600, 535);
    ctx.fillText('in the above mentioned field of expertise', 600, 570);

    // Professional footer with credentials
    ctx.font = '20px "Times New Roman", serif';
    ctx.textAlign = 'left';
    ctx.fillText('Certification Date: ____________________', 100, 680);
    ctx.fillText('Certificate ID: ________________________', 100, 710);
    
    ctx.textAlign = 'right';
    ctx.fillText('Valid Until: ____________________', 1100, 680);
    ctx.fillText('Authorized Officer: ______________', 1100, 710);

    // Professional seal with detailed design
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(950, 620, 55, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(950, 620, 40, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(950, 620, 25, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 12px "Arial", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('PROFESSIONAL', 950, 615);
    ctx.fillText('CERTIFICATION', 950, 630);

    // Quality assurance mark
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(150, 580, 100, 60);
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 10px "Arial", sans-serif';
    ctx.fillText('QUALITY', 200, 605);
    ctx.fillText('ASSURED', 200, 620);

    // Professional corner elements
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(80, 150, 40, 4);
    ctx.fillRect(1080, 150, 40, 4);
    ctx.fillRect(80, 750, 40, 4);
    ctx.fillRect(1080, 750, 40, 4);
  };

  const drawMinimalistCertificate = (ctx: CanvasRenderingContext2D, design: CertificateDesign, category: string) => {
    // Clean white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 1200, 850);

    // Minimal forest green accent lines - top and bottom
    ctx.fillStyle = '#166534';
    ctx.fillRect(0, 0, 1200, 8);
    ctx.fillRect(0, 842, 1200, 8);

    // Side accent lines
    ctx.fillRect(0, 0, 8, 850);
    ctx.fillRect(1192, 0, 8, 850);

    // Simple elegant border
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    ctx.strokeRect(100, 100, 1000, 650);

    // Minimal inner border
    ctx.strokeStyle = '#86efac';
    ctx.lineWidth = 1;
    ctx.strokeRect(120, 120, 960, 610);

    // Clean typography hierarchy
    ctx.fillStyle = '#166534';
    ctx.font = '300 52px "Arial", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE', 600, 220);

    // Minimal divider
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(450, 240);
    ctx.lineTo(750, 240);
    ctx.stroke();

    // Category in clean style
    ctx.fillStyle = '#16a34a';
    ctx.font = 'bold 32px "Arial", sans-serif';
    ctx.fillText(category.toUpperCase(), 600, 320);

    // Award text with proper spacing
    ctx.fillStyle = '#374151';
    ctx.font = '24px "Arial", sans-serif';
    ctx.fillText('Awarded to', 600, 420);
    
    // Clean recipient line
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(350, 490);
    ctx.lineTo(850, 490);
    ctx.stroke();

    ctx.fillStyle = '#166534';
    ctx.font = 'bold 28px "Arial", sans-serif';
    ctx.fillText('[RECIPIENT NAME]', 600, 480);

    // Achievement text
    ctx.fillStyle = '#374151';
    ctx.font = '20px "Arial", sans-serif';
    ctx.fillText('For successful completion and dedication', 600, 550);

    // Minimal footer elements
    ctx.font = '18px "Arial", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Date: ___________________', 150, 680);
    
    ctx.textAlign = 'right';
    ctx.fillText('Signature: ___________________', 1050, 680);

    // Simple signature line
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(400, 630);
    ctx.lineTo(800, 630);
    ctx.stroke();
    
    ctx.fillStyle = '#374151';
    ctx.font = '16px "Arial", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Authorized Representative', 600, 650);

    // Minimal corner accents in green
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(120, 120, 20, 3);
    ctx.fillRect(1060, 120, 20, 3);
    ctx.fillRect(120, 727, 20, 3);
    ctx.fillRect(1060, 727, 20, 3);

    ctx.fillRect(120, 120, 3, 20);
    ctx.fillRect(1077, 120, 3, 20);
    ctx.fillRect(120, 710, 3, 20);
    ctx.fillRect(1077, 710, 3, 20);
  };

  // Helper functions
  const drawElegantCorners = (ctx: CanvasRenderingContext2D, color: string) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    
    const corners = [
      { x: 100, y: 100 },
      { x: 1100, y: 100 },
      { x: 100, y: 750 },
      { x: 1100, y: 750 }
    ];

    corners.forEach((corner, index) => {
      ctx.beginPath();
      if (index === 0) { // Top left
        ctx.moveTo(corner.x, corner.y + 40);
        ctx.lineTo(corner.x, corner.y);
        ctx.lineTo(corner.x + 40, corner.y);
      } else if (index === 1) { // Top right
        ctx.moveTo(corner.x, corner.y + 40);
        ctx.lineTo(corner.x, corner.y);
        ctx.lineTo(corner.x - 40, corner.y);
      } else if (index === 2) { // Bottom left
        ctx.moveTo(corner.x, corner.y - 40);
        ctx.lineTo(corner.x, corner.y);
        ctx.lineTo(corner.x + 40, corner.y);
      } else if (index === 3) { // Bottom right
        ctx.moveTo(corner.x, corner.y - 40);
        ctx.lineTo(corner.x, corner.y);
        ctx.lineTo(corner.x - 40, corner.y);
      }
      ctx.stroke();
    });
  };

  const drawCreativeShapes = (ctx: CanvasRenderingContext2D, colors: any) => {
    const shapes = [
      { type: 'circle', x: 180, y: 180, size: 45 },
      { type: 'circle', x: 1020, y: 670, size: 40 },
      { type: 'triangle', x: 1050, y: 180, size: 35 },
      { type: 'square', x: 150, y: 670, size: 30 },
      { type: 'circle', x: 200, y: 400, size: 25 },
      { type: 'triangle', x: 1000, y: 400, size: 30 }
    ];

    shapes.forEach((shape, index) => {
      ctx.fillStyle = index % 2 === 0 ? colors.secondary : colors.accent;
      ctx.globalAlpha = 0.4;
      
      if (shape.type === 'circle') {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (shape.type === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(shape.x, shape.y - shape.size);
        ctx.lineTo(shape.x - shape.size, shape.y + shape.size);
        ctx.lineTo(shape.x + shape.size, shape.y + shape.size);
        ctx.closePath();
        ctx.fill();
      } else if (shape.type === 'square') {
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-shape.size/2, -shape.size/2, shape.size, shape.size);
        ctx.restore();
      }
    });
    ctx.globalAlpha = 1;
  };

  const downloadCertificate = (designId: number) => {
    const canvas = canvasRefs.current[designId];
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `certificate-${designId}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  const toggleCode = (designId: number) => {
    setShowCode(prev => ({
      ...prev,
      [designId]: !prev[designId]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-50%']) }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Main content */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 py-12"
      >
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8"
            >
              <Award className="w-16 h-16 text-blue-500 opacity-30" />
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 mb-6"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              CertifyAI
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Create stunning professional certificates with the power of AI. 
              Generate beautiful designs using Gemini AI and Canvas.js technology.
            </motion.p>

            <motion.div 
              className="flex justify-center space-x-6 text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center space-x-2">
                <Wand2 className="w-5 h-5" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Beautiful Designs</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Instant Generation</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Input Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-blue-200 shadow-xl">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Certificate Category
                    </label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g., 'Summer Code Camp Certificate', 'AI for Farmers'"
                      className="w-full px-6 py-4 bg-white/95 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500 text-lg shadow-sm"
                      onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                  </div>
                  <motion.button
                    onClick={handleGenerate}
                    disabled={isGenerating || !category.trim()}
                    className={clsx(
                      "px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-3 transition-all duration-300 shadow-lg",
                      isGenerating || !category.trim()
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:shadow-xl transform hover:scale-105"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isGenerating ? (
                      <RefreshCw className="w-6 h-6 animate-spin" />
                    ) : (
                      <Sparkles className="w-6 h-6" />
                    )}
                    <span>{isGenerating ? 'Generating Magic...' : 'Generate Certificates'}</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loading Animation */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center mb-16"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 mx-auto mb-6"
                >
                  <div className="w-full h-full border-4 border-blue-500 border-t-transparent rounded-full"></div>
                </motion.div>
                <p className="text-2xl text-gray-700 mb-4">Creating your certificates...</p>
                <p className="text-gray-600">Our AI is designing 5 unique styles for you</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Certificates Grid */}
        <AnimatePresence>
          {designs.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {designs.map((design, index) => (
                <motion.div
                  key={design.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-200 hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                      
                      {/* Header */}
                      <div className="p-6 border-b border-blue-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{design.title}</h3>
                            <p className="text-gray-600">{design.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="w-5 h-5 text-blue-500" />
                            <span className="text-sm text-gray-600 capitalize">{design.style}</span>
                          </div>
                        </div>
                        
                        {/* Color palette */}
                        <div className="flex space-x-2 mt-4">
                          {Object.values(design.colors).map((color, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Canvas */}
                      <div className="p-6">
                        <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl">
                          <canvas
                            ref={(el) => {
                              canvasRefs.current[design.id] = el;
                            }}
                            className="w-full h-auto block"
                            style={{ maxWidth: '100%', height: 'auto' }}
                          />
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-3 mt-6">
                          <motion.button
                            onClick={() => downloadCertificate(design.id)}
                            className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Download className="w-5 h-5" />
                            <span>Download PNG</span>
                          </motion.button>
                          
                          <motion.button
                            onClick={() => toggleCode(design.id)}
                            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Code className="w-5 h-5" />
                            <span>{showCode[design.id] ? 'Hide Code' : 'View Code'}</span>
                          </motion.button>
                        </div>

                        {/* Code section */}
                        <AnimatePresence>
                          {showCode[design.id] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-6"
                            >
                              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                                <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
                                  <span className="text-green-400 font-mono text-sm">Canvas.js Code</span>
                                  <button
                                    onClick={() => navigator.clipboard.writeText(design.canvasCode)}
                                    className="text-gray-400 hover:text-white transition-colors text-sm"
                                  >
                                    Copy Code
                                  </button>
                                </div>
                                <pre className="p-4 text-sm text-green-400 overflow-x-auto max-h-96">
                                  <code>{design.canvasCode}</code>
                                </pre>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-20 pt-12 border-t border-blue-200"
        >
          <p className="text-gray-600 text-lg">
            Powered by <span className="text-blue-600 font-semibold">Gemini AI</span> and{' '}
            <span className="text-blue-700 font-semibold">Canvas.js</span>
          </p>
          <p className="text-gray-500 mt-2">
            Create, customize, and download professional certificates in seconds
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
