import RumSection from "@/components/home_page/rum_section/page";

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

	return (
		<div className="w-full justify-center flex h-full p-10">
			<div className="bg-white/10 rounded-lg w-full px-20 py-20">
				<div className="flex justify-start items-center px-48 gap-10">
					<img src="/rum_bottle.png" alt="" />
					<div className="flex flex-col -mt-3 text-4xl gap-5 w-96">
						<p className="font-serif font-semibold">DragonRum -</p>
						<p className="text-lg font-serif text-justify">
							Experience the rich and warm taste of Carribean rum from the depths of China's dragon cellars, brewed from the dragonfruits of Beijing and personally inspected by the great, mighty and immortal president - Xi Jinping
						</p>
						<div className="flex justify-start">
							<button className="text-lg mt-8 bg-red-600 hover:bg-red-500 cursor-pointer inline-flex px-4 py-2 rounded-lg">
								Shop Now
							</button>
						</div>
					</div>
				</div>

				<RumSection products={products} />
			</div>
		</div>
	);
}
