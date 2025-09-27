"use client";

import { Center, NotFound } from "@/components";

export default function ErrorPage() {
	return (
		<Center>
			<NotFound variant="with-home-button" desc="Opps... some ing went wrong"/>
		</Center>
	);
}
