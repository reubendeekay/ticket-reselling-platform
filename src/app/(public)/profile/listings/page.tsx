"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MyListingsPage() {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-3xl font-bold tracking-tight">My Listings</h2>
				<p className="text-muted-foreground">Manage tickets you are selling</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Active Listings</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground">
						You have no active listings at the moment.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
