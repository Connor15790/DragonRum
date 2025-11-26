'use client';

export default function DanglingImage({ src, size = 60, className = "", style = {} }) {
    return (
        <>
            <img
                src={src}
                alt=""
                style={style}
                className={`swinging ${className}`}
                width={size}
            />


            <style jsx>
                {`
        .swinging {
          transform-origin: 50% 0%;
          animation: sway 2.5s cubic-bezier(.36, .07, .19, .97) infinite;
        }
        @keyframes sway {
          0% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
          100% { transform: rotate(-8deg); }
        }
      `}
            </style>
        </>
    );
}
