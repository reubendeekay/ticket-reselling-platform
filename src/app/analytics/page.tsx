"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
	PieChart,
	Pie,
	Cell,
} from "recharts";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { getRevenueData, getCategoryData } from "@/data/mockData";

export default function AnalyticsPage() {
	const revenueData = getRevenueData();
	const categoryData = getCategoryData();

	// Vibrant colors for charts
	const COLORS = ["#8b5cf6", "#ec4899", "#10b981", "#f59e0b", "#3b82f6"];

	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
			<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
				<div>
					<h2 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-primary to-purple-400">
						Analytics
					</h2>
					<p className="text-muted-foreground mt-1 text-lg">
						Deep dive into platform performance and metrics.
					</p>
				</div>
				<div className="flex items-center gap-2">
					<CalendarDateRangePicker />
					<Button variant="outline" className="glass">
						<Download className="mr-2 h-4 w-4" /> Export
					</Button>
				</div>
			</div>

			<Tabs defaultValue="overview" className="space-y-6">
				<TabsList className="grid w-full grid-cols-2 md:w-[400px] bg-muted/50 p-1">
					<TabsTrigger
						value="overview"
						className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
					>
						Overview
					</TabsTrigger>
					<TabsTrigger
						value="revenue"
						className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
					>
						Revenue
					</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="space-y-6">
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
						<Card className="glass card-hover border-l-4 border-l-primary">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Total Revenue
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-3xl font-bold text-primary">KES 4.2M</div>
								<p className="text-xs text-muted-foreground mt-1">
									+20.1% from last month
								</p>
							</CardContent>
						</Card>
						<Card className="glass card-hover border-l-4 border-l-pink-500">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Active Users
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-3xl font-bold text-pink-500">+12,234</div>
								<p className="text-xs text-muted-foreground mt-1">
									+180.1% from last month
								</p>
							</CardContent>
						</Card>
						<Card className="glass card-hover border-l-4 border-l-emerald-500">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Tickets Sold
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-3xl font-bold text-emerald-500">
									+45,231
								</div>
								<p className="text-xs text-muted-foreground mt-1">
									+19% from last month
								</p>
							</CardContent>
						</Card>
						<Card className="glass card-hover border-l-4 border-l-amber-500">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Active Listings
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-3xl font-bold text-amber-500">+573</div>
								<p className="text-xs text-muted-foreground mt-1">
									+201 since last hour
								</p>
							</CardContent>
						</Card>
					</div>

					<div className="grid gap-6 md:grid-cols-7">
						<Card className="col-span-4 glass">
							<CardHeader>
								<CardTitle>Overview</CardTitle>
								<CardDescription>
									Monthly revenue vs commission trends.
								</CardDescription>
							</CardHeader>
							<CardContent className="pl-2">
								<ResponsiveContainer width="100%" height={350}>
									<AreaChart data={revenueData}>
										<defs>
											<linearGradient
												id="colorRevenue"
												x1="0"
												y1="0"
												x2="0"
												y2="1"
											>
												<stop
													offset="5%"
													stopColor="hsl(var(--primary))"
													stopOpacity={0.3}
												/>
												<stop
													offset="95%"
													stopColor="hsl(var(--primary))"
													stopOpacity={0}
												/>
											</linearGradient>
											<linearGradient
												id="colorCommission"
												x1="0"
												y1="0"
												x2="0"
												y2="1"
											>
												<stop
													offset="5%"
													stopColor="#ec4899"
													stopOpacity={0.3}
												/>
												<stop
													offset="95%"
													stopColor="#ec4899"
													stopOpacity={0}
												/>
											</linearGradient>
										</defs>
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
											stroke="hsl(var(--border))"
										/>
										<Tooltip
											contentStyle={{
												backgroundColor: "hsl(var(--card))",
												borderRadius: "8px",
												border: "1px solid hsl(var(--border))",
												boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
											}}
										/>
										<Area
											type="monotone"
											dataKey="revenue"
											stroke="hsl(var(--primary))"
											strokeWidth={3}
											fillOpacity={1}
											fill="url(#colorRevenue)"
										/>
										<Area
											type="monotone"
											dataKey="commission"
											stroke="#ec4899"
											strokeWidth={3}
											fillOpacity={1}
											fill="url(#colorCommission)"
										/>
									</AreaChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>
						<Card className="col-span-3 glass">
							<CardHeader>
								<CardTitle>Sales by Category</CardTitle>
								<CardDescription>
									Distribution across event types.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ResponsiveContainer width="100%" height={350}>
									<PieChart>
										<Pie
											data={categoryData}
											cx="50%"
											cy="50%"
											innerRadius={80}
											outerRadius={110} // Thinner, more modern ring
											paddingAngle={5}
											dataKey="value"
											stroke="none"
										>
											{categoryData.map((entry, index) => (
												<Cell
													key={`cell-${entry.name}`}
													fill={COLORS[index % COLORS.length]}
												/>
											))}
										</Pie>
										<Tooltip
											contentStyle={{
												backgroundColor: "hsl(var(--card))",
												borderRadius: "8px",
												border: "1px solid hsl(var(--border))",
											}}
											itemStyle={{ color: "hsl(var(--foreground))" }}
										/>
										<Legend verticalAlign="bottom" height={36} />
									</PieChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
