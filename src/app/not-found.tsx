import { Button, Center } from "@/components";
import { HomeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
	return (
		<Center>
			<div className="text-center">
				<Image width={120} height={120} className="m-auto" src="/simon.png" alt="" />

				<p>No result found</p>

				<Link href={"/"} className="block mt-5">
					<Button>
						<HomeIcon className="w-6" />
						<span>Home</span>
					</Button>
				</Link>
			</div>
		</Center>
	);
}
