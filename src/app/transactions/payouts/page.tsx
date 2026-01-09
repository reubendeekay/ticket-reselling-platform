"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { users } from "@/data/mockData";

export default function PayoutsPage() {
	// Mock payouts data based on users
	const pendingPayouts = users
		.filter((u) => u.role === "seller" && u.revenue > 0)
		.slice(0, 5);

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-3xl font-bold tracking-tight">Payouts</h2>
				<p className="text-muted-foreground">
					Process pending payments to sellers.
				</p>
			</div>

			<div className="space-y-4">
				<div className="flex justify-between items-center">
					<h3 className="text-lg font-semibold">Pending Requests</h3>
					<Button>Process Selected</Button>
				</div>
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[50px]">
									<Checkbox />
								</TableHead>
								<TableHead>Seller</TableHead>
								<TableHead>Amount</TableHead>
								<TableHead>Method</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{pendingPayouts.map((user) => (
								<TableRow key={user.id}>
									<TableCell>
										<Checkbox />
									</TableCell>
									<TableCell>{user.name}</TableCell>
									<TableCell>
										KES {(user.revenue * 0.9).toLocaleString()}
									</TableCell>
									<TableCell>M-Pesa</TableCell>
									<TableCell>
										<Badge
											variant="outline"
											className="text-yellow-600 border-yellow-600"
										>
											Pending
										</Badge>
									</TableCell>
									<TableCell className="text-right">
										<Button size="sm" variant="outline">
											Pay Now
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}
