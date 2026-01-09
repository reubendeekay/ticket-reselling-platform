"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import {
	users,
	events,
	listings,
	transactions,
	getRevenueData,
	getCategoryData,
} from "@/data/mockData";
import {
	Activity,
	CreditCard,
	DollarSign,
	Users,
	TrendingUp,
	TrendingDown,
	Calendar,
} from "lucide-react";
import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	PieChart,
	Pie,
	Cell,
	Legend,
} from "recharts";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Stats Cards
export function DashboardStats() {
	const totalUsers = users.length;
	const activeListings = listings.filter((l) => l.status === "active").length;
	// Mock 'Today's Revenue' by taking a small fraction of total transaction volume
	const totalVolume = transactions.reduce((acc, t) => acc + t.amount, 0);
	const todaysRevenue = totalVolume * 0.05; // Just a mock
	const pendingTransactions = transactions.filter(
		(t) => t.status === "pending"
	).length;

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
					<DollarSign className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						KES {todaysRevenue.toLocaleString()}
					</div>
					<p className="text-xs text-muted-foreground flex items-center mt-1">
						<TrendingUp className="h-3 w-3 text-green-500 mr-1" />
						+20.1% from last month
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Active Users</CardTitle>
					<Users className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">+{totalUsers}</div>
					<p className="text-xs text-muted-foreground flex items-center mt-1">
						<TrendingUp className="h-3 w-3 text-green-500 mr-1" />
						+180.1% from last month
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Active Listings</CardTitle>
					<Activity className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">+{activeListings}</div>
					<p className="text-xs text-muted-foreground flex items-center mt-1">
						<TrendingDown className="h-3 w-3 text-red-500 mr-1" />
						-4% from last hour
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Pending Transactions
					</CardTitle>
					<CreditCard className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">+{pendingTransactions}</div>
					<p className="text-xs text-muted-foreground mt-1">
						Requires attention
					</p>
				</CardContent>
			</Card>
		</div>
	);
}

// Charts
export function DashboardCharts() {
	const revenueData = getRevenueData();
	const categoryData = getCategoryData();
	const COLORS = [
		"#0088FE",
		"#00C49F",
		"#FFBB28",
		"#FF8042",
		"#8884d8",
		"#82ca9d",
		"#ffc658",
	];

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
			<Card className="col-span-4">
				<CardHeader>
					<CardTitle>Revenue Overview</CardTitle>
				</CardHeader>
				<CardContent className="pl-2">
					<ResponsiveContainer width="100%" height={350}>
						<LineChart data={revenueData}>
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
								tickFormatter={(value) => `K${value / 1000}k`}
							/>
							<CartesianGrid
								vertical={false}
								strokeDasharray="3 3"
								className="stroke-muted"
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: "hsl(var(--card))",
									borderColor: "hsl(var(--border))",
								}}
								itemStyle={{ color: "hsl(var(--foreground))" }}
								formatter={(value: number) => `KES ${value.toLocaleString()}`}
							/>
							<Line
								type="monotone"
								dataKey="revenue"
								stroke="hsl(var(--primary))"
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
			<Card className="col-span-3">
				<CardHeader>
					<CardTitle>Event Categories</CardTitle>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={350}>
						<PieChart>
							<Pie
								data={categoryData}
								cx="50%"
								cy="50%"
								innerRadius={60}
								outerRadius={100}
								fill="#8884d8"
								paddingAngle={5}
								dataKey="value"
							>
								{categoryData.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip
								contentStyle={{
									backgroundColor: "hsl(var(--card))",
									borderColor: "hsl(var(--border))",
								}}
								itemStyle={{ color: "hsl(var(--foreground))" }}
							/>
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		</div>
	);
}

// Recent Transactions
export function RecentTransactions() {
	const recentTransactions = transactions.slice(0, 5);

	return (
		<Card className="col-span-4">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Recent Transactions</CardTitle>
				<Button asChild size="sm" variant="outline">
					<Link href="/transactions">View All</Link>
				</Button>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Buyer</TableHead>
							<TableHead>Event</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{recentTransactions.map((t) => (
							<TableRow key={t.id}>
								<TableCell className="font-medium flex items-center gap-2">
									<Avatar className="h-8 w-8">
										<AvatarFallback>{t.buyer?.name.charAt(0)}</AvatarFallback>
									</Avatar>
									<div className="flex flex-col">
										<span>{t.buyer?.name}</span>
										<span className="text-xs text-muted-foreground">
											{t.buyer?.email}
										</span>
									</div>
								</TableCell>
								<TableCell>{t.event?.name}</TableCell>
								<TableCell>KES {t.amount.toLocaleString()}</TableCell>
								<TableCell>
									<Badge
										variant={
											t.status === "completed"
												? "default"
												: t.status === "pending"
												? "secondary"
												: "destructive"
										}
									>
										{t.status}
									</Badge>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}

// Top Events
export function TopEvents() {
	const topEvents = [...events]
		.sort((a, b) => b.soldCount - a.soldCount)
		.slice(0, 5);

	return (
		<Card className="col-span-3">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Top Selling Events</CardTitle>
				<Button asChild size="sm" variant="outline">
					<Link href="/events">View All</Link>
				</Button>
			</CardHeader>
			<CardContent>
				<div className="space-y-8">
					{topEvents.map((e) => (
						<div key={e.id} className="flex items-center">
							<Avatar className="h-9 w-9 rounded sm:flex">
								{/* Placeholder for event image, using unqiue query to avoid caching same image */}
								<AvatarImage
									src={`https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=64&h=64&auto=format&fit=crop&q=60`}
									alt={e.name}
								/>
								<AvatarFallback>{e.name.substring(0, 2)}</AvatarFallback>
							</Avatar>
							<div className="ml-4 space-y-1">
								<p className="text-sm font-medium leading-none">{e.name}</p>
								<p className="text-xs text-muted-foreground">{e.venue}</p>
							</div>
							<div className="ml-auto font-medium">+{e.soldCount} sold</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
