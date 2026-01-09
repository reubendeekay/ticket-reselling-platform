"use client";

import { transactions } from "@/data/mockData";
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MoreHorizontal, Download } from "lucide-react";
import { format } from "date-fns";

const getStatusStyles = (status: string) => {
	switch (status) {
		case "completed":
			return "bg-green-500/15 text-green-700 border-green-200";
		case "pending":
			return "bg-amber-500/15 text-amber-700 border-amber-200";
		case "disputed":
			return "bg-red-500/15 text-red-700 border-red-200";
		default:
			return "bg-gray-100 text-gray-700 border-gray-200";
	}
};

const getStatusDotColor = (status: string) => {
	switch (status) {
		case "completed":
			return "bg-green-500";
		case "pending":
			return "bg-amber-500";
		case "disputed":
			return "bg-red-500";
		default:
			return "bg-gray-500";
	}
};

export default function TransactionsPage() {
	const totalVolume = transactions.reduce((acc, t) => acc + t.amount, 0);
	const totalCommission = transactions.reduce(
		(acc, t) => acc + (t.platformFee || 0),
		0
	);

	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
			<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
				<div>
					<h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
					<p className="text-muted-foreground mt-1 text-lg">
						Monitor financial activity and payment status.
					</p>
				</div>
				<Button variant="outline" className="glass">
					<Download className="mr-2 h-4 w-4" /> Export CSV
				</Button>
			</div>

			<div className="grid gap-4 md:grid-cols-4">
				<Card className="glass card-hover">
					<CardHeader className="p-4 pb-2 text-muted-foreground text-xs uppercase font-extrabold tracking-widest">
						Total Volume
					</CardHeader>
					<CardContent className="p-4 pt-0 text-3xl font-black text-black">
						KES {(totalVolume / 1000000).toFixed(2)}M
					</CardContent>
				</Card>
				<Card className="glass card-hover">
					<CardHeader className="p-4 pb-2 text-muted-foreground text-xs uppercase font-extrabold tracking-widest">
						Commission
					</CardHeader>
					<CardContent className="p-4 pt-0 text-3xl font-black text-black">
						KES {(totalCommission / 1000).toFixed(1)}k
					</CardContent>
				</Card>
				<Card className="glass card-hover">
					<CardHeader className="p-4 pb-2 text-muted-foreground text-xs uppercase font-extrabold tracking-widest">
						Pending Payouts
					</CardHeader>
					<CardContent className="p-4 pt-0 text-3xl font-black text-black">
						12
					</CardContent>
				</Card>
				<Card className="glass card-hover">
					<CardHeader className="p-4 pb-2 text-muted-foreground text-xs uppercase font-extrabold tracking-widest">
						Disputes
					</CardHeader>
					<CardContent className="p-4 pt-0 text-3xl font-black text-red-600">
						3
					</CardContent>
				</Card>
			</div>

			<div className="rounded-xl border bg-card shadow-sm overflow-hidden">
				<Table>
					<TableHeader className="bg-muted/50">
						<TableRow>
							<TableHead className="font-semibold">Transaction ID</TableHead>
							<TableHead className="font-semibold">Event</TableHead>
							<TableHead className="font-semibold">Buyer</TableHead>
							<TableHead className="font-semibold">Seller</TableHead>
							<TableHead className="font-semibold">Amount</TableHead>
							<TableHead className="font-semibold">Fee</TableHead>
							<TableHead className="font-semibold">Status</TableHead>
							<TableHead className="font-semibold">Date</TableHead>
							<TableHead className="text-right font-semibold">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{transactions.map((t) => (
							<TableRow
								key={t.id}
								className="hover:bg-muted/30 transition-colors"
							>
								<TableCell className="font-mono text-xs font-medium text-muted-foreground">
									#{t.id}
								</TableCell>
								<TableCell className="max-w-[150px] truncate font-medium text-primary">
									{t.event?.name}
								</TableCell>
								<TableCell>
									<span className="text-sm">{t.buyer?.name}</span>
								</TableCell>
								<TableCell>
									<span className="text-sm">{t.seller?.name}</span>
								</TableCell>
								<TableCell className="font-bold">
									KES {t.amount.toLocaleString()}
								</TableCell>
								<TableCell className="text-muted-foreground text-xs">
									KES {t.platformFee.toLocaleString()}
								</TableCell>
								<TableCell>
									<Badge
										variant="outline"
										className={getStatusStyles(t.status)}
									>
										<span
											className={`mr-1.5 h-2 w-2 rounded-full inline-block ${getStatusDotColor(
												t.status
											)}`}
										></span>
										{t.status.charAt(0).toUpperCase() + t.status.slice(1)}
									</Badge>
								</TableCell>
								<TableCell className="text-muted-foreground text-sm">
									{format(new Date(t.transactionDate), "MMM d, yyyy")}
								</TableCell>
								<TableCell className="text-right">
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 hover:bg-muted"
									>
										<MoreHorizontal className="h-4 w-4" />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
