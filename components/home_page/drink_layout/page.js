import DanglingImage from "@/components/dangling_images/page";

export default function DrinkLayout({ bg, products, positions }) {
    // const positions = [
    //     { top: "36%", left: "17%" },
    //     { top: "37%", left: "27%" },
    //     { top: "36%", left: "36.5%" },
    //     { top: "36%", left: "48.5%" },
    //     { top: "36%", left: "58%" },
    //     { top: "37%", left: "67.5%" },
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
