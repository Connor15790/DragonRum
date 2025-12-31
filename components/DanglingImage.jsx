'use client';

import Tooltip from '@mui/material/Tooltip';

import Image from "next/image";
import Link from 'next/link';

export default function DanglingImage({ product, src, size = 120, className = "", style = {} }) {
  return (
    <>
      <Link href={`/product_page/${product.slug}`}>
        <span onClick={() => console.log(product)} className={`swing-wrapper ${className}`} style={style}>
          <Tooltip
            title={product?.title || "Product"}
            arrow
            slotProps={{
              tooltip: {
                sx: {
                  backgroundColor: '#8B0000',
                  color: '#ffffff',
                  fontSize: '0.800rem',
                  padding: '8px 12px',
                  '& .MuiTooltip-arrow': {
                    color: '#8B0000',
                  },
                },
              },
            }}
          >
            <Image
              src={src}
              alt=""
              width={size}
              height={size}
              loading="lazy"
            />
          </Tooltip>
        </span>
      </Link>

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
