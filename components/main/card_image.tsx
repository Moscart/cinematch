import React, { useState } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ICardImage {
  posterPath: string;
  alt: string;
  defaultImage?: string;
  className?: string;
}

export const CardImage: React.FC<ICardImage> = ({
  posterPath,
  alt,
  defaultImage = "/default_poster.png",
  className,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageSrc = () => {
    if (imageError) return defaultImage;
    if (imageLoaded) return `https://image.tmdb.org/t/p/w500${posterPath}`;
    return defaultImage;
  };

  return (
    <Card className={cn("border-none overflow-hidden", className)}>
      <Image
        className="aspect-[6/9] object-cover"
        alt={alt}
        src={imageSrc()}
        width={500}
        height={500}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        onDragStart={(e) => e.preventDefault()}
        priority
      />
    </Card>
  );
};
