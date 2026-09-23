import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

interface StarParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  rotation: number;
  color: string;
}

export const CursorParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<StarParticle[]>([]);
  const mouseRef = useRef({ x: -100, y: -100, prevX: -100, prevY: -100 });
  const { onomatopoeiaList, user } = useApp();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const colors = user.mode === 'villain' 
      ? ['#FF0033', '#8B5CF6', '#FF0055', '#FFFFFF'] 
      : ['#00F0FF', '#F59E0B', '#A855F7', '#FFFFFF'];

    const handleMouseMove = (e: MouseEvent) => {
      const prevX = mouseRef.current.x;
      const prevY = mouseRef.current.y;
      mouseRef.current = { x: e.clientX, y: e.clientY, prevX, prevY };

      const dist = Math.hypot(e.clientX - prevX, e.clientY - prevY);
      // Spawn subtle sparkling stars when moving
      if (dist > 3 && particlesRef.current.length < 40) {
        const count = Math.min(2, Math.floor(dist / 8) + 1);
        for (let i = 0; i < count; i++) {
          particlesRef.current.push({
            x: e.clientX + (Math.random() * 12 - 6),
            y: e.clientY + (Math.random() * 12 - 6),
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2 - 0.4,
            size: Math.random() * 2.5 + 1.2,
            alpha: 0.85,
            rotation: Math.random() * Math.PI,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Draw 4-point sparkling star
    const drawStar = (c: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      c.beginPath();
      c.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        c.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        c.lineTo(x, y);
        rot += step;
      }
      c.lineTo(cx, cy - outerRadius);
      c.closePath();
      c.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.022; // smooth fade
        p.rotation += 0.05;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        drawStar(ctx, p.x, p.y, 4, p.size * 2, p.size * 0.7);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [user.mode]);

  return (
    <>
      {/* Canvas for star particle sparkles */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Onomatopoeia Comic Popups */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {onomatopoeiaList.map(item => (
          <div
            key={item.id}
            className="absolute animate-comic-pop"
            style={{
              left: `${item.x}px`,
              top: `${item.y}px`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div
              className="px-3 py-1 font-display text-xl uppercase tracking-wider text-black drop-shadow-[2px_2px_0px_#FFFFFF]"
              style={{
                backgroundColor: item.color || '#00F0FF',
                clipPath: 'polygon(0% 15%, 15% 0%, 85% 0%, 100% 20%, 95% 85%, 80% 100%, 15% 95%, 0% 80%)',
                border: '2px solid black',
                boxShadow: '3px 3px 0px #000000'
              }}
            >
              {item.text}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
