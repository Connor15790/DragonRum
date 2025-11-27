'use client';

import Image from "next/image";

export default function DanglingImage({ src, size = 120, className = "", style = {} }) {
  return (
    <>
      <span className={`swing-wrapper ${className}`} style={style}>
        <Image
          src={src}
          alt=""
          width={size}
          height={size}
          loading="lazy"
        />
      </span>

      <style jsx>{`
        .swing-wrapper {
          display: inline-block;     
          transform-origin: 48% 0%;  
          animation: sway 2.5s cubic-bezier(.36, .07, .19, .97) infinite;
        }

        @keyframes sway {
          0%   { transform: rotate(-8deg); }
          50%  { transform: rotate(8deg); }
          100% { transform: rotate(-8deg); }
        }
      `}</style>
    </>
  );
}
