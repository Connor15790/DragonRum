import DanglingImage from "@/components/dangling_images/page";
import RumSection from "@/components/home_page/rum_section/page";

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

	return (
		<div className="w-full flex justify-center px-4 py-10">
			<div className="bg-white/10 rounded-lg w-full max-w-7xl px-6 md:px-16 lg:px-20 py-10 flex flex-col gap-20">
				<div className="flex flex-col md:flex-row items-center gap-5 md:gap-20 px-0 md:px-10">
					<div className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-96 lg:h-96 flex-shrink-0">
						<img src="/rum_bottle.png" alt="" className="object-contain w-full h-full" />
					</div>

					<div className="flex flex-col gap-5 max-w-xl">
						<p className="font-serif font-semibold text-2xl md:text-3xl lg:text-4xl">DragonRum -</p>
						<p className="text-sm md:text-base lg:text-lg font-serif text-justify leading-relaxed">
							Experience the rich and warm taste of Carribean rum from the depths of China’s dragon cellars,
							brewed from the dragonfruits of Beijing and personally inspected by the great, mighty and
							immortal president – Xi Jinping.
						</p>

						<div>
							<button className="text-lg bg-red-600 hover:bg-red-500 cursor-pointer inline-flex px-6 py-3 rounded-lg mt-4">
								Shop Now
							</button>
						</div>
					</div>
				</div>

				<div className="relative mx-auto w-full max-w-3xl">
					<img
						src="/sugarcane.jpg"
						className="rounded-md w-full h-auto"
						alt=""
					/>

					<DanglingImage
						src="/Rum_1.png"
						className="absolute"
						style={{
							width: "15%",
							top: "66%",
							left: "4%",
							transform: "translate(-50%, -50%)",
						}}
					/>

				</div>


			</div>
		</div>
	);
}
