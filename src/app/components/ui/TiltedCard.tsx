import type { SpringOptions } from "framer-motion";
import { useRef, useState, HTMLAttributes } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./TiltedCard.css";
import Image from "next/image";

interface TiltedCardProps {
  imageSrc: React.ComponentProps<"img">["src"];
  altText?: string;
  captionText?: string;
  containerHeight?: React.CSSProperties['height'];
  containerWidth?: React.CSSProperties['width'];
  imageHeight?: React.CSSProperties['height'];
  imageWidth?: React.CSSProperties['width'];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
}

interface TiltedImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  scaleOnHover?: number;
  rotateAmplitude?: number;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState<number>(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between">
      <motion.figure
      ref={ref}
        className="tilted-card-figure bg-[#f9fafb]/60 backdrop-blur-md border border-white/30 rounded-2xl flex flex-col items-center justify-between transition-shadow duration-200 shadow-2xl relative z-10"
      style={{
        height: containerHeight,
          width: '100%',
          maxWidth: 370,
          padding: '1.5rem 1rem',
          boxSizing: 'border-box',
          perspective: 800,
          rotateX,
          rotateY,
          scale,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

        <div className="flex flex-col items-center justify-start w-full flex-1">
          <Image
            src={imageSrc || ''}
            alt={altText || ''}
            width={220}
            height={220}
            className="tilted-card-img mb-4 block mx-auto rounded-[2rem]"
            style={{
              width: '220px',
              height: '220px',
              objectFit: 'contain',
              margin: '0 auto',
              position: 'static',
              top: undefined,
              left: undefined,
            }}
          />
          <figcaption
            className="w-full text-center text-gray-800 text-base font-medium mt-4 px-2"
            style={{ minHeight: 48 }}
        >
          {captionText}
          </figcaption>
        </div>
      </motion.figure>
    </div>
  );
}

export function TiltedImage({
  src,
  alt = "Tilted image",
  className = "",
  style = {},
  scaleOnHover = 1.08,
  rotateAmplitude = 14,
  ...rest
}: TiltedImageProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;
    rotateX.set(rotationX);
    rotateY.set(rotationY);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }
  function handleMouseEnter() {
    scale.set(scaleOnHover);
  }
  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }
  return (
    <motion.figure
      ref={ref}
      className={"w-full h-full flex items-center justify-center " + className}
      style={{
        ...style,
        perspective: 800,
        rotateX,
        rotateY,
        scale,
        margin: 0,
        padding: 0,
        borderRadius: "inherit",
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={src || ''}
        alt={alt || ''}
        width={300}
        height={300}
        className="w-full h-full object-cover rounded-[inherit]"
        style={{ display: "block" }}
        {...rest}
      />
    </motion.figure>
  );
} 