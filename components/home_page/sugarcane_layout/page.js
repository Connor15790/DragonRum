import DanglingImage from "@/components/dangling_images/page";

export default function SugarcaneLayout({ bg, products }) {
    const positions = [
        { top: "66%", left: "4%" },
        { top: "17%", left: "9.5%" },
        { top: "11%", left: "29%" },
        { top: "3%", left: "46%" },
        { top: "34%", left: "60.5%" },
        { top: "17%", left: "75.5%" },
    ];

    return (
        <div className="relative mx-auto w-full max-w-3xl">
            <img
                src="/sugarcane.jpg"
                className="rounded-md w-full h-auto"
                alt=""
            />

            {positions.map((pos, index) => (
                <DanglingImage
                    key={index}
                    src={products[index]?.image || "/Rum_1.png"}
                    className="absolute cursor-pointer hover:scale-110 transition-transform duration-300 ease-out"
                    style={{
                        width: "15%",
                        top: pos.top,
                        left: pos.left,
                        transform: "translate(-50%, -50%)",
                    }}
                />
            ))}

            {/* <DanglingImage
                src="/Rum_1.png"
                className="absolute cursor-pointer hover:scale-110 transition-transform duration-300 ease-out"
                style={{
                    width: "15%",
                    top: "66%",
                    left: "4%",
                    transform: "translate(-50%, -50%)",
                }}
            />

            <DanglingImage
                src="/Rum_2.png"
                className="absolute cursor-pointer hover:scale-110 transition-transform duration-300 ease-out"
                style={{
                    width: "15%",
                    top: "17%",
                    left: "9.5%",
                    transform: "translate(-50%, -50%)",
                }}
            />

            <DanglingImage
                src="/Rum_3.png"
                className="absolute cursor-pointer hover:scale-110 transition-transform duration-300 ease-out"
                style={{
                    width: "15%",
                    top: "11%",
                    left: "29%",
                    transform: "translate(-50%, -50%)",
                }}
            />

            <DanglingImage
                src="/Rum_4.png"
                className="absolute cursor-pointer hover:scale-110 transition-transform duration-300 ease-out"
                style={{
                    width: "15%",
                    top: "3%",
                    left: "46%",
                    transform: "translate(-50%, -50%)",
                }}
            />

            <DanglingImage
                src="/Rum_1.png"
                className="absolute cursor-pointer hover:scale-110 transition-transform duration-300 ease-out"
                style={{
                    width: "15%",
                    top: "34%",
                    left: "60.5%",
                    transform: "translate(-50%, -50%)",
                }}
            />

            <DanglingImage
                src="/Rum_2.png"
                className="absolute cursor-pointer hover:scale-110 transition-transform duration-300 ease-out"
                style={{
                    width: "15%",
                    top: "17%",
                    left: "75.5%",
                    transform: "translate(-50%, -50%)",
                }}
            /> */}
        </div>
    );
}
