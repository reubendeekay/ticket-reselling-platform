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
					<h2 className="text-4xl font-black tracking-tighter uppercase">
						Analytics
					</h2>
					<p className="text-muted-foreground mt-1 text-lg font-medium">
						Deep dive into platform performance and metrics.
					</p>
				</div>
				<div className="flex items-center gap-2">
					<CalendarDateRangePicker />
					<Button
						variant="outline"
						className="glass font-bold uppercase tracking-wider"
					>
						<Download className="mr-2 h-4 w-4" /> Export
					</Button>
				</div>
			</div>

			<Tabs defaultValue="overview" className="space-y-6">
				<TabsList className="grid w-full grid-cols-2 md:w-[400px] bg-transparent p-0 gap-2">
					<TabsTrigger
						value="overview"
						className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground neo-border bg-white font-bold uppercase tracking-wider transition-all data-[state=active]:neo-shadow"
					>
						Overview
					</TabsTrigger>
					<TabsTrigger
						value="revenue"
						className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground neo-border bg-white font-bold uppercase tracking-wider transition-all data-[state=active]:neo-shadow"
					>
						Revenue
					</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="space-y-6">
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
						<Card className="glass card-hover">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-xs uppercase font-extrabold tracking-widest text-muted-foreground">
									Total Revenue
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-3xl font-black">KES 4.2M</div>
								<p className="text-xs font-bold text-muted-foreground mt-1">
									+20.1% from last month
								</p>
							</CardContent>
						</Card>
						<Card className="glass card-hover">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-xs uppercase font-extrabold tracking-widest text-muted-foreground">
									Active Users
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-3xl font-black text-pink-600">+12,234</div>
								<p className="text-xs font-bold text-muted-foreground mt-1">
									+180.1% from last month
								</p>
							</CardContent>
						</Card>
						<Card className="glass card-hover">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-xs uppercase font-extrabold tracking-widest text-muted-foreground">
									Tickets Sold
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-3xl font-black text-emerald-600">
									+45,231
								</div>
								<p className="text-xs font-bold text-muted-foreground mt-1">
									+19% from last month
								</p>
							</CardContent>
						</Card>
						<Card className="glass card-hover">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-xs uppercase font-extrabold tracking-widest text-muted-foreground">
									Active Listings
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-3xl font-black text-amber-600">+573</div>
								<p className="text-xs font-bold text-muted-foreground mt-1">
									+201 since last hour
								</p>
							</CardContent>
						</Card>
					</div>

					<div className="grid gap-6 md:grid-cols-7">
						<Card className="col-span-4 glass">
							<CardHeader>
								<CardTitle className="uppercase font-black tracking-tight">
									Overview
								</CardTitle>
								<CardDescription className="font-medium">
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
