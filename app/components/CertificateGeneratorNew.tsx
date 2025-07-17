'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Download, Sparkles, Code, RefreshCw, Wand2, Palette, Star, Zap, Award } from 'lucide-react';
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
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

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
    canvas.width = 800 * dpr;
    canvas.height = 600 * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = '800px';
    canvas.style.height = '600px';

    ctx.clearRect(0, 0, 800, 600);

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
    // Enhanced modern gradient background
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, design.colors.primary);
    gradient.addColorStop(0.5, design.colors.secondary);
    gradient.addColorStop(1, design.colors.primary);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    // Geometric pattern overlay
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = design.colors.accent;
      ctx.beginPath();
      ctx.arc(100 + i * 100, 100, 25, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Modern border with shadow
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 15;
    ctx.strokeStyle = design.colors.accent;
    ctx.lineWidth = 8;
    ctx.strokeRect(30, 30, 740, 540);
    ctx.shadowBlur = 0;

    // Inner border
    ctx.strokeStyle = design.colors.accent;
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 50, 700, 500);

    // Enhanced typography
    ctx.fillStyle = design.colors.text;
    ctx.font = 'bold 56px "Arial", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE', 400, 140);

    ctx.font = '28px "Arial", sans-serif';
    ctx.fillText('OF EXCELLENCE', 400, 180);

    // Category highlight
    ctx.fillStyle = design.colors.accent;
    ctx.font = 'bold 36px "Arial", sans-serif';
    ctx.fillText(category.toUpperCase(), 400, 260);

    // Recipient section
    ctx.fillStyle = design.colors.text;
    ctx.font = '24px "Arial", sans-serif';
    ctx.fillText('This is awarded to', 400, 320);
    
    ctx.font = 'bold 32px "Arial", sans-serif';
    ctx.fillText('[RECIPIENT NAME]', 400, 370);

    ctx.font = '20px "Arial", sans-serif';
    ctx.fillText('For outstanding achievement and dedication', 400, 420);

    // Modern footer
    ctx.font = '16px "Arial", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Date: ___________', 100, 520);
    ctx.textAlign = 'right';
    ctx.fillText('Authorized Signature: ___________', 700, 520);

    // Decorative line
    ctx.strokeStyle = design.colors.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(320, 200);
    ctx.lineTo(480, 200);
    ctx.stroke();
  };

  const drawElegantCertificate = (ctx: CanvasRenderingContext2D, design: CertificateDesign, category: string) => {
    // Elegant background
    ctx.fillStyle = design.colors.primary;
    ctx.fillRect(0, 0, 800, 600);

    // Vintage texture effect
    ctx.globalAlpha = 0.05;
    for (let i = 0; i < 150; i++) {
      ctx.fillStyle = design.colors.secondary;
      ctx.fillRect(Math.random() * 800, Math.random() * 600, 1, 1);
    }
    ctx.globalAlpha = 1;

    // Ornate borders
    ctx.strokeStyle = design.colors.accent;
    ctx.lineWidth = 6;
    ctx.strokeRect(40, 40, 720, 520);

    ctx.strokeStyle = design.colors.secondary;
    ctx.lineWidth = 3;
    ctx.strokeRect(60, 60, 680, 480);

    // Elegant corner flourishes
    drawElegantCorners(ctx, design.colors.accent);

    // Classic typography
    ctx.fillStyle = design.colors.text;
    ctx.font = 'italic 48px "Times New Roman", serif';
    ctx.textAlign = 'center';
    ctx.fillText('Certificate of Excellence', 400, 140);

    // Decorative underline
    ctx.strokeStyle = design.colors.accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(250, 160);
    ctx.lineTo(550, 160);
    ctx.stroke();

    ctx.fillStyle = design.colors.accent;
    ctx.font = 'bold 32px "Times New Roman", serif';
    ctx.fillText(category, 400, 220);

    ctx.fillStyle = design.colors.text;
    ctx.font = '24px "Times New Roman", serif';
    ctx.fillText('is hereby presented to', 400, 290);
    
    ctx.font = 'italic bold 28px "Times New Roman", serif';
    ctx.fillText('[Recipient Name]', 400, 340);

    ctx.font = '20px "Times New Roman", serif';
    ctx.fillText('in recognition of outstanding achievement', 400, 390);

    ctx.font = '16px "Times New Roman", serif';
    ctx.fillText('This _____ day of _________, 2025', 400, 480);
  };

  const drawCreativeCertificate = (ctx: CanvasRenderingContext2D, design: CertificateDesign, category: string) => {
    // Creative radial background
    const gradient = ctx.createRadialGradient(400, 300, 0, 400, 300, 400);
    gradient.addColorStop(0, design.colors.primary);
    gradient.addColorStop(1, design.colors.secondary);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    // Creative shapes
    drawCreativeShapes(ctx, design.colors);

    // Dynamic border
    ctx.strokeStyle = design.colors.accent;
    ctx.lineWidth = 8;
    ctx.setLineDash([20, 10]);
    ctx.strokeRect(30, 30, 740, 540);
    ctx.setLineDash([]);

    // Creative title with perspective
    ctx.fillStyle = design.colors.text;
    ctx.font = 'bold 48px "Arial", sans-serif';
    ctx.textAlign = 'center';
    ctx.save();
    ctx.transform(1, 0, -0.1, 1, 40, 0);
    ctx.fillText('CREATIVE CERTIFICATE', 400, 120);
    ctx.restore();

    // Dynamic category
    ctx.fillStyle = design.colors.accent;
    ctx.font = 'bold 34px "Arial", sans-serif';
    ctx.save();
    ctx.rotate(-0.03);
    ctx.fillText(category.toUpperCase(), 420, 200);
    ctx.restore();

    ctx.fillStyle = design.colors.text;
    ctx.font = '26px "Arial", sans-serif';
    ctx.fillText('Creatively awarded to', 400, 290);
    
    ctx.font = 'bold 30px "Arial", sans-serif';
    ctx.fillText('[CREATIVE GENIUS]', 400, 340);

    ctx.font = '22px "Arial", sans-serif';
    ctx.fillText('For exceptional creativity and innovation', 400, 390);

    ctx.font = '18px "Arial", sans-serif';
    ctx.fillText('Signed: ____________', 400, 480);
  };

  const drawProfessionalCertificate = (ctx: CanvasRenderingContext2D, design: CertificateDesign, category: string) => {
    // Professional gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, design.colors.primary);
    gradient.addColorStop(1, design.colors.secondary);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    // Professional header
    ctx.fillStyle = design.colors.accent;
    ctx.fillRect(0, 0, 800, 100);

    ctx.fillStyle = design.colors.primary;
    ctx.fillRect(50, 20, 700, 60);

    // Professional title
    ctx.fillStyle = design.colors.text;
    ctx.font = 'bold 38px "Arial", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('PROFESSIONAL CERTIFICATION', 400, 60);

    // Border
    ctx.strokeStyle = design.colors.accent;
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 720, 520);

    ctx.fillStyle = design.colors.text;
    ctx.font = 'bold 30px "Arial", sans-serif';
    ctx.fillText(category, 400, 180);

    ctx.font = '24px "Arial", sans-serif';
    ctx.fillText('This is to certify that', 400, 240);
    
    ctx.font = 'bold 28px "Arial", sans-serif';
    ctx.fillText('[PROFESSIONAL NAME]', 400, 290);

    ctx.font = '20px "Arial", sans-serif';
    ctx.fillText('has successfully completed all requirements', 400, 340);
    ctx.fillText('and is hereby certified as qualified', 400, 370);

    // Professional footer
    ctx.font = '16px "Arial", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Certification Date: ___________', 80, 480);
    ctx.textAlign = 'right';
    ctx.fillText('Authorized Officer: ___________', 720, 480);

    // Official seal
    ctx.strokeStyle = design.colors.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(650, 420, 35, 0, Math.PI * 2);
    ctx.stroke();
    ctx.font = '10px "Arial", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('OFFICIAL', 650, 420);
    ctx.fillText('SEAL', 650, 435);
  };

  const drawMinimalistCertificate = (ctx: CanvasRenderingContext2D, design: CertificateDesign, category: string) => {
    // Clean background
    ctx.fillStyle = design.colors.primary;
    ctx.fillRect(0, 0, 800, 600);

    // Minimal accent lines
    ctx.fillStyle = design.colors.accent;
    ctx.fillRect(0, 0, 800, 6);
    ctx.fillRect(0, 594, 800, 6);

    // Simple border
    ctx.strokeStyle = design.colors.accent;
    ctx.lineWidth = 2;
    ctx.strokeRect(80, 80, 640, 440);

    // Clean typography
    ctx.fillStyle = design.colors.text;
    ctx.font = '300 36px "Arial", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE', 400, 160);

    ctx.font = 'bold 28px "Arial", sans-serif';
    ctx.fillText(category, 400, 220);

    ctx.font = '20px "Arial", sans-serif';
    ctx.fillText('Awarded to', 400, 300);
    
    ctx.font = 'bold 24px "Arial", sans-serif';
    ctx.fillText('[Recipient Name]', 400, 340);

    ctx.font = '16px "Arial", sans-serif';
    ctx.fillText('For successful completion', 400, 400);

    // Minimal signature line
    ctx.strokeStyle = design.colors.accent;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(300, 460);
    ctx.lineTo(500, 460);
    ctx.stroke();
    
    ctx.font = '12px "Arial", sans-serif';
    ctx.fillText('Authorized Signature', 400, 480);
  };

  // Helper functions
  const drawElegantCorners = (ctx: CanvasRenderingContext2D, color: string) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    
    const corners = [
      { x: 80, y: 80 },
      { x: 720, y: 80 },
      { x: 80, y: 520 },
      { x: 720, y: 520 }
    ];

    corners.forEach((corner, index) => {
      ctx.beginPath();
      if (index === 0) {
        ctx.moveTo(corner.x, corner.y + 25);
        ctx.lineTo(corner.x, corner.y);
        ctx.lineTo(corner.x + 25, corner.y);
      }
      ctx.stroke();
    });
  };

  const drawCreativeShapes = (ctx: CanvasRenderingContext2D, colors: { primary: string; secondary: string; accent: string }) => {
    const shapes = [
      { type: 'circle', x: 120, y: 120, size: 35 },
      { type: 'circle', x: 680, y: 480, size: 30 },
      { type: 'triangle', x: 700, y: 120, size: 25 },
      { type: 'square', x: 100, y: 480, size: 20 }
    ];

    shapes.forEach((shape, index) => {
      ctx.fillStyle = index % 2 === 0 ? colors.secondary : colors.accent;
      ctx.globalAlpha = 0.6;
      
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
        ctx.fillRect(shape.x - shape.size/2, shape.y - shape.size/2, shape.size, shape.size);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
        style={{ opacity }}
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
              <Award className="w-16 h-16 text-yellow-400 opacity-20" />
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              CertifyAI
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Create stunning professional certificates with the power of AI. 
              Generate beautiful designs using Gemini AI and Canvas.js technology.
            </motion.p>

            <motion.div 
              className="flex justify-center space-x-6 text-gray-400"
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Certificate Category
                    </label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g., 'Summer Code Camp Certificate', 'AI for Farmers'"
                      className="w-full px-6 py-4 bg-gray-900/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-lg backdrop-blur-sm"
                      onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                  </div>
                  <motion.button
                    onClick={handleGenerate}
                    disabled={isGenerating || !category.trim()}
                    className={clsx(
                      "px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-3 transition-all duration-300",
                      isGenerating || !category.trim()
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
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
                  <div className="w-full h-full border-4 border-purple-500 border-t-transparent rounded-full"></div>
                </motion.div>
                <p className="text-2xl text-gray-300 mb-4">Creating your certificates...</p>
                <p className="text-gray-400">Our AI is designing 5 unique styles for you</p>
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
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative bg-gray-800/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                      
                      {/* Header */}
                      <div className="p-6 border-b border-gray-700/50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">{design.title}</h3>
                            <p className="text-gray-400">{design.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="w-5 h-5 text-yellow-400" />
                            <span className="text-sm text-gray-400 capitalize">{design.style}</span>
                          </div>
                        </div>
                        
                        {/* Color palette */}
                        <div className="flex space-x-2 mt-4">
                          {Object.values(design.colors).map((color, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full border-2 border-gray-600"
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
                            className="w-full h-auto"
                            style={{ maxHeight: '400px' }}
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
                            className="flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors duration-200"
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
                              <div className="bg-gray-900 rounded-lg overflow-hidden">
                                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                                  <span className="text-green-400 font-mono">Canvas.js Code</span>
                                  <button
                                    onClick={() => navigator.clipboard.writeText(design.canvasCode)}
                                    className="text-gray-400 hover:text-white transition-colors"
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
          className="text-center mt-20 pt-12 border-t border-gray-700/50"
        >
          <p className="text-gray-400 text-lg">
            Powered by <span className="text-purple-400 font-semibold">Gemini AI</span> and{' '}
            <span className="text-blue-400 font-semibold">Canvas.js</span>
          </p>
          <p className="text-gray-500 mt-2">
            Create, customize, and download professional certificates in seconds
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
