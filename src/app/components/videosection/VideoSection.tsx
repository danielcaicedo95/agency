// components/VideoSection/VideoSection.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface VideoSectionProps {
  videoSrc: string;
  title: string;
  description: string;
  posterSrc?: string;
}

const VideoSection = ({ videoSrc, title, description, posterSrc }: VideoSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [isInView]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, #1e3a8a 25%, transparent 25%) -50px 0,
          linear-gradient(225deg, #1e3a8a 25%, transparent 25%) -50px 0,
          linear-gradient(315deg, #1e3a8a 25%, transparent 25%),
          linear-gradient(45deg, #1e3a8a 25%, transparent 25%)
        `,
        backgroundSize: '100px 100px',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Video Container */}
      <motion.div
        className="relative mx-auto h-[80vh] w-[90vw] max-w-[400px] md:h-[70vh] md:w-[60vw] md:max-w-[800px] overflow-hidden rounded-3xl shadow-2xl"
        initial={{ scale: 0, opacity: 0, y: 50 }}
        animate={{ 
          scale: 1,
          opacity: 1,
          y: 0,
          transition: {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2
          }
        }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="metadata"
          poster={posterSrc}
          controls={isPlaying}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Text Content */}
      <motion.div
        className="mx-auto mt-8 max-w-2xl px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1,
            duration: 0.8,
            ease: 'circOut'
          }
        }}
      >
        <motion.h2
          className="text-4xl font-bold text-black md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 1.2,
              duration: 0.6
            }
          }}
        >
          {title}
        </motion.h2>

        <motion.p
          className="mt-4 text-lg text-gray-800 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 1.4,
              duration: 0.6
            }
          }}
        >
          {description}
        </motion.p>
      </motion.div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"
          initial={{ scale: 0 }}
          animate={{ 
            scale: 1,
            transition: {
              delay: 0.8,
              duration: 1.5
            }
          }}
        />
        <motion.div
          className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl"
          initial={{ scale: 0 }}
          animate={{ 
            scale: 1,
            transition: {
              delay: 1,
              duration: 1.5
            }
          }}
        />
      </div>

      {/* Entrada espectacular */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ scaleY: 1 }}
        animate={{ 
          scaleY: 0,
          transition: {
            delay: 0.5,
            duration: 1.2,
            ease: [0.87, 0, 0.13, 1]
          }
        }}
      />
    </section>
  );
};

export default VideoSection;