import React from 'react';
import Card3D from './Card3D';

interface ProjectCard3DProps {
  image?: string;
  icon?: string;
  title: string;
  description?: string;
  date?: string;
  category?: string;
  tags?: string[];
  className?: string;
  glowColor?: string;
}

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({
  image,
  icon,
  title,
  description,
  date,
  category,
  tags = [],
  className = '',
  glowColor = 'rgba(255, 255, 255, 0.2)',
}) => {
  return (
    <Card3D className={className} glowColor={glowColor} intensity={15}>
      <div className="relative w-full min-h-[500px] p-8 flex flex-col gap-6" style={{ transformStyle: 'preserve-3d', WebkitFontSmoothing: 'antialiased' }}>
        
        {/* Category Badge */}
        {category && (
          <div 
            className="absolute -top-2 -right-2 bg-primary/30 backdrop-blur-xl border border-primary/50 text-white text-[10px] uppercase tracking-widest font-black px-4 py-1.5 rounded-full opacity-0 group-hover/card:opacity-100 transition-all duration-500 ease-out"
            style={{ 
              transform: 'translateZ(calc(var(--hover, 0) * 80px))',
              boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
            }}
          >
            {category}
          </div>
        )}

        {/* Icon/Image Container */}
        <div 
          className="relative w-full aspect-square rounded-[30px] overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 ease-out"
          style={{ 
            transform: 'translateZ(calc(var(--hover, 0) * 50px)) scale(calc(1 + var(--hover, 0) * 0.05))', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}
        >
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : icon ? (
            <div className="text-7xl drop-shadow-2xl transition-all duration-500" style={{ transform: 'translateZ(20px)' }}>
              {icon}
            </div>
          ) : (
            <div className="text-7xl opacity-20">📁</div>
          )}
        </div>

        {/* Typography */}
        <div className="flex flex-col gap-3 mt-2" style={{ transformStyle: 'preserve-3d' }}>
          {date && (
            <span 
              className="text-[11px] text-white/50 uppercase tracking-[0.3em] font-bold transition-all duration-500"
              style={{ transform: 'translateZ(calc(var(--hover, 0) * 40px))' }}
            >
              {date}
            </span>
          )}

          <h3 
            className="text-3xl font-black text-white leading-tight group-hover/card:text-primary transition-all duration-500"
            style={{ 
              transform: 'translateZ(calc(var(--hover, 0) * 60px))',
              textShadow: 'calc(var(--x, 0) * -0.6rem) calc(var(--y, 0) * 0.6rem) 20px rgba(0,0,0,0.8)',
              backfaceVisibility: 'hidden'
            }}
          >
            {title}
          </h3>

            {description && (
              <p 
                className="text-base text-white/70 leading-relaxed font-medium transition-all duration-500"
                style={{ 
                  transform: 'translateZ(calc(var(--hover, 0) * 40px))',
                  textShadow: 'calc(var(--x, 0) * -0.3rem) calc(var(--y, 0) * 0.3rem) 10px rgba(0,0,0,0.6)'
                }}
              >
                {description}
              </p>
            )}
        </div>

        {/* Footer Actions */}
        <div 
          className="mt-auto flex items-center justify-between opacity-0 group-hover/card:opacity-100 transition-all duration-500"
          style={{ transform: 'translateZ(calc(var(--hover, 0) * 90px))' }}
        >
          <div className="flex gap-2">
            {tags.map((tag, idx) => (
              <span key={idx} className="text-[10px] bg-white/10 border-2 border-white/20 text-white/90 px-3 py-1 rounded-lg font-bold">
                #{tag}
              </span>
            ))}
          </div>
          <button className="text-primary font-black text-sm flex items-center gap-1 group/btn cursor-pointer">
            View <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </Card3D>
  );
};


export default ProjectCard3D;
