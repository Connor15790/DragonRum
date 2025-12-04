import DanglingImage from "@/components/dangling_images/page";
import RumSection from "@/components/home_page/rum_section/page";
import SugarcaneLayout from "@/components/home_page/drink_layout/page";
import DrinkStack from "@/components/drink_stack/page";

async function getProducts() {
	const res = await fetch("http://localhost:3000/api/product/get-products", {
		cache: "no-store",
	});

	if (!res.ok) throw new Error("Failed to fetch products");

	const data = await res.json();
	return data.products;
}

export default async function Home() {
	const products = await getProducts();

	const getBatch = (startIndex, products) => {
		const batchSize = 6;
		const result = [];

		for (let i = 0; i < batchSize; i++) {
			// The % operator makes it loop back to 0 when it hits 10
			const index = (startIndex + i) % products.length;
			result.push(products[index]);
		}
		return result;
	};

	const rumStackData = [
		{
			id: 1,
			pageNumber: "01",
			bg: "/sugarcane.jpg",
			products: getBatch(0, products.filter((p) => p.category === "rum")),
			positions: [
				{ top: "66%", left: "4%" },
				{ top: "17%", left: "9.5%" },
				{ top: "11%", left: "29%" },
				{ top: "3%", left: "46%" },
				{ top: "34%", left: "60.5%" },
				{ top: "17%", left: "75.5%" },
			]
		},
		{
			id: 2,
			pageNumber: "02",
			bg: "/sugarcane.jpg",
			products: getBatch(6, products.filter((p) => p.category === "rum")),
			positions: [
				{ top: "66%", left: "4%" },
				{ top: "17%", left: "9.5%" },
				{ top: "11%", left: "29%" },
				{ top: "3%", left: "46%" },
				{ top: "34%", left: "60.5%" },
				{ top: "17%", left: "75.5%" },
			]
		},
		{
			id: 3,
			pageNumber: "03",
			bg: "/sugarcane.jpg",
			products: getBatch(2, products.filter((p) => p.category === "rum")),
			positions: [
				{ top: "66%", left: "4%" },
				{ top: "17%", left: "9.5%" },
				{ top: "11%", left: "29%" },
				{ top: "3%", left: "46%" },
				{ top: "34%", left: "60.5%" },
				{ top: "17%", left: "75.5%" },
			]
		}
	];

	const whiskeyStackData = [
		{
			id: 1,
			pageNumber: "01",
			bg: "/wheat.jpg",
			products: getBatch(0, products.filter((p) => p.category === "whiskey")),
			positions: [
				{ top: "44%", left: "1%" },
				{ top: "55%", left: "17%" },
				{ top: "26%", left: "33%" },
				{ top: "36%", left: "55%" },
				{ top: "42%", left: "70%" },
				{ top: "46%", left: "86%" },
			]
		},
		{
			id: 2,
			pageNumber: "02",
			bg: "/wheat.jpg",
			products: getBatch(6, products.filter((p) => p.category === "whiskey")),
			positions: [
				{ top: "44%", left: "1%" },
				{ top: "55%", left: "17%" },
				{ top: "26%", left: "33%" },
				{ top: "36%", left: "55%" },
				{ top: "42%", left: "70%" },
				{ top: "46%", left: "86%" },
			]
		},
		{
			id: 3,
			pageNumber: "03",
			bg: "/wheat.jpg",
			products: getBatch(2, products.filter((p) => p.category === "whiskey")),
			positions: [
				{ top: "44%", left: "1%" },
				{ top: "55%", left: "17%" },
				{ top: "26%", left: "33%" },
				{ top: "36%", left: "55%" },
				{ top: "42%", left: "70%" },
				{ top: "46%", left: "86%" },
			]
		}
	];

	return (
		<div className="w-full flex justify-center px-5 sm:px-16 py-5 sm:py-10">
			<div className="bg-white/10 rounded-lg w-full justify-center items-center px-6 md:px-16 lg:px-20 py-5 flex flex-col">
				<div className="flex flex-col md:flex-row items-center gap-5 md:gap-20 px-0 md:px-10">
					<div className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-96 lg:h-96 shrink-0">
						<img src="/rum_bottle.png" alt="" className="object-contain w-full h-full" />
					</div>

					<div className="flex flex-col max-w-xl gap-3 sm:gap-5">
						<p className="font-serif font-semibold text-2xl md:text-3xl lg:text-4xl">DragonRum</p>
						<p className="text-sm md:text-base lg:text-lg font-serif text-justify leading-relaxed">
							Experience the rich and warm taste of Carribean rum from the depths of China’s dragon cellars,
							brewed from the dragonfruits of Beijing and personally inspected by the great, mighty and
							immortal president – Xi Jinping.
						</p>

						<div>
							<button className="text-sm md:text-base lg:text-lg bg-red-600 hover:bg-red-500 cursor-pointer inline-flex px-4 py-2 rounded-lg mt-4">
								Shop Now
							</button>
						</div>
					</div>
				</div>

				<div className="mt-5 mb-0 flex justify-center">
					<p className="text-2xl md:text-3xl lg:text-4xl font-serif">Rums</p>
				</div>

				<div className="flex w-[320] p-10 h-[250px] md:w-[600px] md:h-[400px] lg:w-[800px] lg:h-[500px] relative justify-center items-center py-3 overflow-hidden">
					<DrinkStack
						cardsData={rumStackData}
					/>
				</div>

				<div className="mt-10 mb-0 flex justify-center">
					<p className="text-2xl md:text-3xl lg:text-4xl font-serif">Whiskeys</p>
				</div>

				<div className="flex w-[320] p-10 h-[250px] md:w-[600px] md:h-[400px] lg:w-[800px] lg:h-[500px] relative justify-center items-center py-3 overflow-hidden">
					<DrinkStack
						cardsData={whiskeyStackData}
					/>
				</div>
			</div>
		</div>
	);
}
