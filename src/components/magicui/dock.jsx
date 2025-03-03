"use client";

import { cva } from "class-variance-authority";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

// Import icons (assuming you're using some icon library)
import { Home, Search, Image, Settings } from "lucide-react";
import { Link } from "react-router";

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border p-2 backdrop-blur-md",
);

const Dock = React.forwardRef(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      direction = "middle",
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX: mouseX,
            size: iconSize,
            magnification: iconMagnification,
            distance: iconDistance,
          });
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        })}
      >
        {renderChildren()}
      </motion.div>
    );
  },
);

Dock.displayName = "Dock";

const DockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  label,
  ...props
}) => {
  const ref = useRef(null);
  const padding = Math.max(6, size * 0.2);
  const defaultMouseX = useMotionValue(Infinity);

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size],
  );

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <div className="flex space-x-5 px-2   flex-col items-center">
      <motion.div
        ref={ref}
        style={{ width: scaleSize, height: scaleSize, padding }}
        className={cn(
          "flex aspect-square cursor-pointer items-center justify-center rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md",
          className,
        )}
        {...props}
      >
        {children}
      </motion.div>
      {label && (
        <span className="mt-1 text-xs font-medium opacity-80">{label}</span>
      )}
    </div>
  );
};

DockIcon.displayName = "DockIcon";

// Example usage component
const DockNavigation = () => {
  return (
    <div className="w-full flex justify-center mt-10 transform -translate-y-1/2">
      <Dock className="sm:h-20 w-full max-w-xs sm:max-w-md md:max-w-lg" >
      
      <DockIcon>
        <Link to='/'><Home className="text-red-500" size={24} /></Link>
      </DockIcon>
      <DockIcon>
        <Link to='/'><Home className="text-red-500" size={24} /></Link>
      </DockIcon>
      <DockIcon>
        <Link to='/'><Home className="text-red-500" size={24} /></Link>
      </DockIcon>
      <DockIcon>
        <Link to='/'><Home className="text-red-500" size={24} /></Link>
      </DockIcon>
      
      <DockIcon>
        <Link to='/generate'><Image className="text-orange-500" size={24} /></Link>
      </DockIcon>
      
    </Dock>
    </div>
  );
};

export { Dock, DockIcon, dockVariants, DockNavigation };