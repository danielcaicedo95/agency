'use client';

import VideoSection from '@/app/components/videosection/VideoSection';
import '@/app/styles/fonts.css';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-pale-pink">
      <VideoSection
        videoSrc="../comercial1.mp4"
        title="Nuestro Impacto"
        description="Descubre cómo estamos transformando el mundo con nuestras soluciones innovadoras."
        posterSrc="/comercial1-poster.jpg" // Opcional
      />
      
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-6xl md:text-9xl text-vintage-blue font-logo">
          Hola Mundo
        </h1>
      </div>
    </div>
  );
}