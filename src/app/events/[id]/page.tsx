"use client";

import { use, useState } from "react";
import { events, listings, transactions } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Calendar,
	MapPin,
	MoreHorizontal,
	Edit,
	Trash,
	Copy,
	Ban,
	Ticket,
	Users,
	TrendingUp,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
} from "recharts";

interface PageProps {
	params: Promise<{ id: string }>;
}

export default function EventDetailPage({ params }: PageProps) {
	const { id } = use(params);
	const event = events.find((e) => e.id === id) || events[0]; // Fallback to first event if not found
	const eventListings = listings.filter((l) => l.eventId === event.id);
	const eventTransactions = transactions.filter((t) => t.eventId === event.id);

	// Calculate mock stats
	const totalListings = eventListings.length;
	const totalSold = eventListings.filter((l) => l.status === "sold").length;
	const totalRevenue = eventTransactions.reduce((acc, t) => acc + t.amount, 0);
	const averagePrice =
		eventListings.reduce((acc, l) => acc + l.price, 0) / (totalListings || 1);

	// Mock chart data
	const ticketCategoryData = event.ticketCategories.map((cat) => ({
		name: cat.name,
		sold: Math.floor(Math.random() * 500),
		listed: Math.floor(Math.random() * 800),
	}));

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col md:flex-row gap-6 items-start">
				<div className="w-full md:w-64 aspect-video md:aspect-square relative rounded-lg overflow-hidden bg-muted">
					<img
						src={`https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80`}
						alt={event.name}
						className="object-cover w-full h-full"
					/>
				</div>

				<div className="flex-1 space-y-4">
					<div className="flex justify-between items-start">
						<div>
							<Badge variant="outline" className="mb-2">
								{event.category}
							</Badge>
							<h1 className="text-3xl font-bold tracking-tight mb-2">
								{event.name}
							</h1>
							<div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-muted-foreground text-sm">
								<div className="flex items-center gap-1">
									<Calendar className="h-4 w-4" />
									{format(new Date(event.date), "PPP p")}
								</div>
								<div className="flex items-center gap-1">
									<MapPin className="h-4 w-4" />
									{event.venue}, {event.city}
								</div>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Badge
								className={event.status === "published" ? "bg-green-500" : ""}
								variant={event.status === "published" ? "default" : "secondary"}
							>
								{event.status}
							</Badge>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" size="icon">
										<MoreHorizontal className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem>
										<Edit className="mr-2 h-4 w-4" /> Edit Event
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Copy className="mr-2 h-4 w-4" /> Duplicate
									</DropdownMenuItem>
									<DropdownMenuItem className="text-destructive">
										<Ban className="mr-2 h-4 w-4" /> Cancel Event
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
						<Card>
							<CardHeader className="p-4 pb-2 text-muted-foreground text-xs uppercase font-semibold">
								Total Listings
							</CardHeader>
							<CardContent className="p-4 pt-0 text-2xl font-bold">
								{totalListings}
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="p-4 pb-2 text-muted-foreground text-xs uppercase font-semibold">
								Tickets Sold
							</CardHeader>
							<CardContent className="p-4 pt-0 text-2xl font-bold">
								{totalSold}
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="p-4 pb-2 text-muted-foreground text-xs uppercase font-semibold">
								Total Revenue
							</CardHeader>
							<CardContent className="p-4 pt-0 text-2xl font-bold">
								KES {(totalRevenue / 1000).toFixed(1)}k
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="p-4 pb-2 text-muted-foreground text-xs uppercase font-semibold">
								Avg. Price
							</CardHeader>
							<CardContent className="p-4 pt-0 text-2xl font-bold">
								KES {averagePrice.toFixed(0)}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			<Tabs defaultValue="overview" className="space-y-4">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="listings">Listings ({totalListings})</TabsTrigger>
					<TabsTrigger value="analytics">Analytics</TabsTrigger>
					<TabsTrigger value="settings">Settings</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Ticket Categories Performance</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="h-[300px]">
								<ResponsiveContainer width="100%" height="100%">
									<BarChart data={ticketCategoryData}>
										<XAxis
											dataKey="name"
											stroke="#888888"
											fontSize={12}
											tickLine={false}
											axisLine={false}
										/>
										<YAxis
											stroke="#888888"
											fontSize={12}
											tickLine={false}
											axisLine={false}
										/>
										<Tooltip
											contentStyle={{
												backgroundColor: "hsl(var(--card))",
												borderColor: "hsl(var(--border))",
											}}
											itemStyle={{ color: "hsl(var(--foreground))" }}
											cursor={{ fill: "hsl(var(--muted))" }}
										/>
										<Legend />
										<Bar
											dataKey="listed"
											name="Listed"
											fill="hsl(var(--primary))"
											radius={[4, 4, 0, 0]}
										/>
										<Bar
											dataKey="sold"
											name="Sold"
											fill="hsl(var(--chart-2))"
											radius={[4, 4, 0, 0]}
										/>
									</BarChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Description</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="leading-7 text-muted-foreground">
								{event.description}
							</p>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="listings">
					<Card>
						<CardHeader>
							<CardTitle>Active Listings</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Seller</TableHead>
										<TableHead>Ticket Type</TableHead>
										<TableHead>Section</TableHead>
										<TableHead>Price</TableHead>
										<TableHead>Markup</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="text-right">Action</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{eventListings.map((listing) => (
										<TableRow key={listing.id}>
											<TableCell className="font-medium flex items-center gap-2">
												<Avatar className="h-6 w-6">
													<AvatarFallback>
														{listing.seller?.name.charAt(0)}
													</AvatarFallback>
												</Avatar>
												{listing.seller?.name}
											</TableCell>
											<TableCell>
												{listing.ticketType} x{listing.quantity}
											</TableCell>
											<TableCell>{listing.section}</TableCell>
											<TableCell>
												KES {listing.price.toLocaleString()}
											</TableCell>
											<TableCell>
												<Badge
													variant={
														listing.markup > 30 ? "destructive" : "secondary"
													}
												>
													+{listing.markup}%
												</Badge>
											</TableCell>
											<TableCell>
												<Badge variant="outline">{listing.status}</Badge>
											</TableCell>
											<TableCell className="text-right">
												<Button variant="ghost" size="sm">
													Remove
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
