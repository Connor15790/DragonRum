import DanglingImage from "@/components/dangling_images/page";

export default function DrinkLayout({ bg, products, positions }) {
    // const positions = [
    //     { top: "44%", left: "1%" },
    //     { top: "55%", left: "17%" },
    //     { top: "26%", left: "33%" },
    //     { top: "36%", left: "55%" },
    //     { top: "42%", left: "70%" },
    //     { top: "46%", left: "86%" },
    // ];

    return (
        <div className="relative mx-auto w-full max-w-3xl">
            <img
                src={bg}
                className="rounded-md w-full h-auto"
                alt=""
            />

            {positions.map((pos, index) => (
                <DanglingImage
                    key={index}
                    product={products[index]}
                    src={products[index]?.img || "/Rum_1.png"}
                    className="absolute cursor-pointer hover:scale-110 transition-transform duration-300 ease-out"
                    style={{
                        width: "15%",
                        top: pos.top,
                        left: pos.left,
                        transform: "translate(-50%, -50%)",
                    }}
                />
            ))}
        </div>
    );
}
