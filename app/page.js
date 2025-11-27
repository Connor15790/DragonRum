import DanglingImage from "@/components/dangling_images/page";
import RumSection from "@/components/home_page/rum_section/page";
import SugarcaneLayout from "@/components/home_page/sugarcane_layout/page";
import SugarcaneStack from "@/components/sugarcane_stack/page";

async function getProducts() {
	const res = await fetch("http://localhost:3000/api/product/get-products?category=rum", {
		cache: "no-store",
	});

	if (!res.ok) throw new Error("Failed to fetch products");

	const data = await res.json();
	return data.products;
}

export default async function Home() {
	const products = await getProducts();

	const stackData = [
		{
			id: 1,
			bg: "/sugarcane.jpg",
			products: products.slice(0, 6) // First 6 rums
		},
		{
			id: 2,
			bg: "/sugarcane.jpg", // Example of a different background
			products: products.slice(0, 6).reverse() // Just reversing for variety
		},
		{
			id: 3,
			bg: "/sugarcane.jpg", // Example of a different background
			products: products.slice(0, 6) // Just reversing for variety
		},
	];

	return (
		<div className="w-full flex justify-center px-5 sm:px-16 py-5 sm:py-10">
			<div className="bg-white/10 rounded-lg w-full px-6 md:px-16 lg:px-20 py-5 flex flex-col">
				<div className="flex flex-col md:flex-row items-center gap-5 md:gap-20 px-0 md:px-10">
					<div className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-96 lg:h-96 flex-shrink-0">
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

				<div className="mt-5 mb-3 flex justify-center">
					<p className="text-2xl md:text-3xl lg:text-4xl font-serif">Rums</p>
				</div>

				<div className="flex justify-center items-center py-10 overflow-hidden">
					<SugarcaneStack
						cardsData={stackData}
						// Adjust dimensions to fit your design
						cardDimensions={{ width: 800, height: 500 }}
					/>
				</div>
			</div>
		</div>
	);
}
