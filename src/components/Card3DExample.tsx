import React from 'react';
import Card3D from './Card3D';
import ProjectCard3D from './ProjectCard3D';

const Card3DExample: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-8 bg-[#030303] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-900 via-black to-black flex flex-col items-center gap-16">
      <div className="flex flex-col items-center gap-4 text-center max-w-2xl">
        <h2 className="text-5xl md:text-7xl font-black bg-linear-to-b from-white to-white/40 bg-clip-text text-transparent tracking-tighter">
          Dimensional UI
        </h2>
        <p className="text-zinc-500 text-lg">
          Smooth 3D interactions with real depth and perspective. Hover to explore the layers.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-[1200px] w-full">
        {/* New ProjectCard3D Examples */}
        <ProjectCard3D 
          title="Cyberstream"
          description="A high-performance video streaming platform built for the next generation of creators."
          date="Dec 2025"
          category="Web App"
          tags={["React", "WebRTC", "Node.js"]}
          icon="📺"
          glowColor="rgba(56, 189, 248, 0.3)"
          className="animate-fade-in-up delay-100"
        />

        <ProjectCard3D 
          title="Nova Wallet"
          description="Secure, decentralized cryptocurrency wallet with real-time analytics and cross-chain support."
          date="Oct 2025"
          category="Fintech"
          tags={["Solidity", "TypeScript", "Ethers"]}
          icon="💎"
          glowColor="rgba(192, 38, 211, 0.3)"
          className="animate-fade-in-up delay-200"
        />

        <ProjectCard3D 
          title="Echo AI"
          description="Context-aware personal assistant that integrates with your entire workspace for seamless productivity."
          date="Aug 2025"
          category="AI / ML"
          tags={["Python", "OpenAI", "Next.js"]}
          icon="🤖"
          glowColor="rgba(34, 197, 94, 0.3)"
          className="animate-fade-in-up delay-300"
        />

        {/* Original Base Card Examples */}
        <Card3D intensity={15} glowColor="rgba(147, 51, 234, 0.4)" className="animate-fade-in-up delay-400">
          <div className="bg-white/5 backdrop-blur-[20px] border border-purple-500/30 rounded-[24px] p-8 md:p-10 min-h-[360px] flex flex-col gap-6 transition-all duration-300 relative overflow-hidden group hover:bg-purple-500/10 hover:border-purple-500/50 hover:shadow-[0_20px_60px_rgba(147,51,234,0.3)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)]">
            <div className="text-5xl md:text-[3.5rem] leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">✨</div>
            <h3 className="text-2xl md:text-[1.75rem] font-bold text-white m-0 tracking-tight">Base Card</h3>
            <p className="text-base leading-relaxed text-white/70 m-0 grow">
              The fundamental 3D interaction wrapper used to build more complex components.
            </p>
            <div className="flex gap-8 pt-6 border-t border-white/10">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-white">15°</span>
                <span className="text-[0.75rem] text-white/50 uppercase tracking-widest font-semibold">Tilt</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-white">3D</span>
                <span className="text-[0.75rem] text-white/50 uppercase tracking-widest font-semibold">Transform</span>
              </div>
            </div>
          </div>
        </Card3D>
      </div>
      
    </div>
  );
};

export default Card3DExample;

