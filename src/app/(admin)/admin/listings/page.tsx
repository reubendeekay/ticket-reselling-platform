"use client";

import { listings } from "@/data/mockData";
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
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal, Search, Filter, Download } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

export default function ListingsPage() {
	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
			<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
				<div>
					<h2 className="text-3xl font-bold tracking-tight">Listings</h2>
					<p className="text-muted-foreground mt-1 text-lg">
						Manage ticket listings across all events.
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" className="glass">
						<Download className="mr-2 h-4 w-4" /> Export CSV
					</Button>
				</div>
			</div>

			{/* Quick StatsRow for Listings */}
			<div className="grid gap-4 md:grid-cols-4">
				<Card className="glass card-hover">
					<CardHeader className="p-4 pb-2 text-muted-foreground text-xs uppercase font-extrabold tracking-widest">
						Total Listings
					</CardHeader>
					<CardContent className="p-4 pt-0 text-3xl font-black">
						{listings.length}
					</CardContent>
				</Card>
				<Card className="glass card-hover">
					<CardHeader className="p-4 pb-2 text-muted-foreground text-xs uppercase font-extrabold tracking-widest">
						Active Listings
					</CardHeader>
					<CardContent className="p-4 pt-0 text-3xl font-black text-green-600">
						{listings.filter((l) => l.status === "active").length}
					</CardContent>
				</Card>
				<Card className="glass card-hover">
					<CardHeader className="p-4 pb-2 text-muted-foreground text-xs uppercase font-extrabold tracking-widest">
						Total Value
					</CardHeader>
					<CardContent className="p-4 pt-0 text-3xl font-black text-blue-600">
						KES{" "}
						{(
							listings.reduce(
								(acc, curr) => acc + curr.price * curr.quantity,
								0
							) / 1000000
						).toFixed(1)}
						M
					</CardContent>
				</Card>
				<Card className="glass card-hover">
					<CardHeader className="p-4 pb-2 text-muted-foreground text-xs uppercase font-extrabold tracking-widest">
						Avg Price
					</CardHeader>
					<CardContent className="p-4 pt-0 text-3xl font-black text-purple-600">
						KES{" "}
						{Math.round(
							listings.reduce((acc, curr) => acc + curr.price, 0) /
								listings.length
						).toLocaleString()}
					</CardContent>
				</Card>
			</div>

			<div className="flex items-center justify-between gap-4 bg-muted/30 p-4 rounded-lg border">
				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search listings..."
						className="pl-8 bg-background"
					/>
				</div>
				<Button variant="outline" className="bg-background">
					<Filter className="mr-2 h-4 w-4" /> Filters
				</Button>
			</div>

			<div className="rounded-xl border bg-card shadow-sm overflow-hidden">
				<Table>
					<TableHeader className="bg-muted/50">
						<TableRow>
							<TableHead className="font-semibold">Event</TableHead>
							<TableHead className="font-semibold">Seller</TableHead>
							<TableHead className="font-semibold">Ticket Type</TableHead>
							<TableHead className="font-semibold">Price</TableHead>
							<TableHead className="font-semibold">Stats</TableHead>
							<TableHead className="font-semibold">Status</TableHead>
							<TableHead className="font-semibold">Created</TableHead>
							<TableHead className="text-right font-semibold">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{listings.map((listing) => (
							<TableRow
								key={listing.id}
								className="hover:bg-muted/30 transition-colors"
							>
								<TableCell
									className="font-medium max-w-[200px] truncate"
									title={listing.event?.name}
								>
									<div className="flex flex-col">
										<span className="font-semibold text-primary">
											{listing.event?.name}
										</span>
										<span className="text-xs text-muted-foreground capitalize">
											{listing.event?.category}
										</span>
									</div>
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<Avatar className="h-8 w-8 border-2 border-background shadow-sm">
											<AvatarFallback className="bg-primary/10 text-primary font-bold">
												{listing.seller?.name.charAt(0)}
											</AvatarFallback>
										</Avatar>
										<span className="text-sm font-medium">
											{listing.seller?.name}
										</span>
									</div>
								</TableCell>
								<TableCell>
									<Badge variant="outline" className="font-mono">
										{listing.ticketType}{" "}
										<span className="text-muted-foreground ml-1">
											x{listing.quantity}
										</span>
									</Badge>
								</TableCell>
								<TableCell>
									<div className="flex flex-col">
										<span className="font-bold">
											KES {listing.price.toLocaleString()}
										</span>
										<span className="text-xs text-green-600 font-medium">
											+{listing.markup}% markup
										</span>
									</div>
								</TableCell>
								<TableCell className="text-xs text-muted-foreground">
									<div className="flex items-center gap-3">
										<div title="Views" className="flex items-center gap-1">
											<span className="font-bold text-foreground">
												{listing.views}
											</span>{" "}
											views
										</div>
										<div title="Saves" className="flex items-center gap-1">
											<span className="font-bold text-foreground">
												{listing.favorites}
											</span>{" "}
											saves
										</div>
									</div>
								</TableCell>
								<TableCell>
									<Badge
										className={
											listing.status === "active"
												? "bg-green-500/15 text-green-700 hover:bg-green-500/25 border-green-200"
												: "bg-gray-100 text-gray-700 border-gray-200"
										}
										variant="outline"
									>
										{listing.status === "active" ? "● Active" : listing.status}
									</Badge>
								</TableCell>
								<TableCell className="text-muted-foreground text-sm">
									{format(new Date(listing.createdAt), "MMM d, yyyy")}
								</TableCell>
								<TableCell className="text-right">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant="ghost"
												className="h-8 w-8 p-0 hover:bg-muted"
											>
												<MoreHorizontal className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end" className="w-[160px]">
											<DropdownMenuLabel>Actions</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuItem>View Details</DropdownMenuItem>
											<DropdownMenuItem>Edit Listing</DropdownMenuItem>
											<DropdownMenuItem className="text-destructive focus:text-destructive">
												Remove Listing
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
