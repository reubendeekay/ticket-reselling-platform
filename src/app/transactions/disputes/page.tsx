"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { transactions } from "@/data/mockData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, AlertCircle } from "lucide-react";

export default function DisputesPage() {
	// Mock disputes from transactions
	const disputedTransactions = transactions
		.filter((_, i) => i < 3)
		.map((t) => ({ ...t, status: "disputed" }));

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-3xl font-bold tracking-tight">Disputes</h2>
				<p className="text-muted-foreground">
					Manage transaction conflicts and issues.
				</p>
			</div>

			<div className="grid gap-6">
				{disputedTransactions.map((t) => (
					<Card key={t.id} className="border-l-4 border-l-red-500">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<div className="space-y-1">
								<CardTitle className="text-base flex items-center gap-2">
									<AlertCircle className="h-4 w-4 text-red-500" />
									Dispute for {t.event?.name}
								</CardTitle>
								<CardDescription>Transaction ID: {t.id}</CardDescription>
							</div>
							<Badge variant="destructive">Open</Badge>
						</CardHeader>
						<CardContent className="grid md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<h4 className="text-sm font-medium text-muted-foreground">
									Parties Involved
								</h4>
								<div className="flex items-center justify-between text-sm border p-2 rounded">
									<span>Buyer: {t.buyer?.name}</span>
									<span className="text-muted-foreground">Claimant</span>
								</div>
								<div className="flex items-center justify-between text-sm border p-2 rounded">
									<span>Seller: {t.seller?.name}</span>
									<span className="text-muted-foreground">Respondent</span>
								</div>
							</div>
							<div className="space-y-2">
								<h4 className="text-sm font-medium text-muted-foreground">
									Details
								</h4>
								<div className="text-sm">
									<span className="font-semibold">Reason:</span> Tickets not
									received
								</div>
								<div className="text-sm">
									<span className="font-semibold">Amount:</span> KES{" "}
									{t.amount.toLocaleString()}
								</div>
							</div>
						</CardContent>
						<CardFooter className="bg-muted/50 flex justify-end gap-2 p-4">
							<Button variant="outline" size="sm">
								<MessageSquare className="mr-2 h-4 w-4" /> View Messages
							</Button>
							<Button size="sm">Resolve</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
