import { useEffect } from "react";
import { useMotionValue, useSpring, frame } from "framer-motion";

const spring = { damping: 20, stiffness: 150 };

export function useFollowPointer(minus: number = 0) {
  const xPoint = useMotionValue(0);
  const yPoint = useMotionValue(0);
  const x = useSpring(xPoint, spring);
  const y = useSpring(yPoint, spring);

  useEffect(() => {
    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      frame.read(() => {
        xPoint.set(clientX - minus);
        yPoint.set(clientY - minus);
      });
    };

    window.addEventListener("mousemove", handlePointerMove);

    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, []);

  return { x, y, xPoint, yPoint };
}
