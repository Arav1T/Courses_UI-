// "use client";
// import { cn } from "@/lib/utlis";
// import { motion } from "motion/react";
// import React from "react";

// export const Meteors = ({
//   number,
//   className,
// }: {
//   number?: number;
//   className?: string;
// }) => {
//   const meteors = new Array(number || 20).fill(true);
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       {meteors.map((el, idx) => {
//         console.log(idx)
//         const meteorCount = number || 20;
//         // Calculate position to evenly distribute meteors across container width
//         const position = idx * (800 / meteorCount); // Spread across 800px range, centered

//         return (
//           <span
//             key={"meteor" + idx}
//             className={cn(
//               "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
//               "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
//               className,
//             )}
//             style={{
//               top: "-40px", // Start above the container
//               left: position + "px",
//               animationDelay: Math.random() * 5 + "s", // Random delay between 0-5s
//               animationDuration: Math.floor(Math.random() * (10 - 5) + 5) + "s", // Keep some randomness in duration
//             }}
//           ></span>
//         );
//       })}
//     </motion.div>
//   );
// };
"use client";

import { cn } from "@/lib/utlis";
import { motion } from "framer-motion"; // small typo, corrected import
import React, { useEffect, useMemo, useState } from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteorCount = number || 20;
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    // Set screen width on mount
    setScreenWidth(window.innerWidth);
    console.log(screenWidth)
    // Optional: Update on window resize
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Precompute all random values ONCE using useMemo (only runs on mount)
  const meteors = useMemo(() => {
    return new Array(meteorCount).fill(true).map((_, idx) => {
      const position = (idx * (800 / meteorCount)-400)*3.5; // Spread across 800px
      const animationDelay = String(Math.random() * 5); // Random between 0-5s
      const animationDuration = String(Math.floor(Math.random() * (10 - 5) + 5)); // 5-10s
      return { position, animationDelay, animationDuration };
    });
  }, [meteorCount]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {meteors.map((meteor, idx) => (
        <div
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
            "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
            className,
          )}
          style={{
            top: "-40px",
            // right:"20px",
            left: `${meteor.position}px`,
            animationDelay: `${meteor.animationDelay}s`,
            animationDuration: `${meteor.animationDuration}s`,
          }}
        ></div>
      ))}
    </motion.div>
  );
};
