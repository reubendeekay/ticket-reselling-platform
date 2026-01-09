"use client";

import { use } from "react";
import { users, listings, transactions } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Mail,
	Phone,
	Calendar,
	ShieldCheck,
	Ban,
	Star,
	CreditCard,
	Activity,
} from "lucide-react";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

interface PageProps {
	params: Promise<{ id: string }>;
}

export default function UserDetailPage({ params }: PageProps) {
	const { id } = use(params);
	const user = users.find((u) => u.id === id) || users[0];
	const userListings = listings.filter((l) => l.sellerId === user.id);
	const userTransactions = transactions.filter(
		(t) => t.buyerId === user.id || t.sellerId === user.id
	);

	return (
		<div className="space-y-6">
			<div className="grid gap-6 md:grid-cols-[300px_1fr]">
				{/* Profile Sidebar */}
				<div className="space-y-6">
					<Card>
						<CardContent className="pt-6 flex flex-col items-center text-center">
							<Avatar className="h-24 w-24 mb-4">
								<AvatarImage src={user.avatarUrl} />
								<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
							</Avatar>
							<h2 className="text-xl font-bold">{user.name}</h2>
							<p className="text-sm text-muted-foreground capitalize">
								{user.role}
							</p>

							<div className="flex items-center gap-2 mt-4 mb-6">
								<Badge
									variant={user.status === "active" ? "default" : "destructive"}
								>
									{user.status}
								</Badge>
								{user.verificationStatus === "verified" && (
									<Badge
										variant="outline"
										className="text-green-600 border-green-600"
									>
										Verified
									</Badge>
								)}
							</div>

							<div className="w-full space-y-2">
								<Button className="w-full" variant="outline">
									<Mail className="mr-2 h-4 w-4" /> Message
								</Button>
								<Button
									className="w-full text-destructive hover:bg-destructive/10"
									variant="ghost"
								>
									<Ban className="mr-2 h-4 w-4" /> Ban User
								</Button>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-sm">Contact Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4 text-sm">
							<div className="flex items-center gap-3">
								<Mail className="h-4 w-4 text-muted-foreground" />
								<span className="truncate">{user.email}</span>
							</div>
							<div className="flex items-center gap-3">
								<Phone className="h-4 w-4 text-muted-foreground" />
								<span>{user.phone}</span>
							</div>
							<div className="flex items-center gap-3">
								<Calendar className="h-4 w-4 text-muted-foreground" />
								<span>
									Joined {format(new Date(user.joinDate), "MMM yyyy")}
								</span>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Main Content */}
				<div className="space-y-6">
					{/* Stats */}
					<div className="grid gap-4 md:grid-cols-4">
						<Card>
							<CardHeader className="p-4 pb-2 text-muted-foreground text-xs uppercase font-semibold">
								Total Revenue
							</CardHeader>
							<CardContent className="p-4 pt-0 text-2xl font-bold">
								KES {user.revenue.toLocaleString()}
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="p-4 pb-2 text-muted-foreground text-xs uppercase font-semibold">
								Listings
							</CardHeader>
							<CardContent className="p-4 pt-0 text-2xl font-bold">
								{user.totalListings}
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="p-4 pb-2 text-muted-foreground text-xs uppercase font-semibold">
								Sales
							</CardHeader>
							<CardContent className="p-4 pt-0 text-2xl font-bold">
								{user.totalSales}
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="p-4 pb-2 text-muted-foreground text-xs uppercase font-semibold">
								Rating
							</CardHeader>
							<CardContent className="p-4 pt-0 text-2xl font-bold flex items-center">
								{user.rating}{" "}
								<Star className="ml-1 h-4 w-4 text-yellow-500 fill-yellow-500" />
							</CardContent>
						</Card>
					</div>

					<Tabs defaultValue="overview" className="space-y-4">
						<TabsList>
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="listings">Listings</TabsTrigger>
							<TabsTrigger value="transactions">Transactions</TabsTrigger>
							<TabsTrigger value="security">Security</TabsTrigger>
						</TabsList>

						<TabsContent value="overview" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Recent Activity</CardTitle>
									<CardDescription>
										Latest actions performed by this user.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{userTransactions.slice(0, 5).map((t) => (
											<div
												key={t.id}
												className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
											>
												<div className="flex items-center gap-4">
													<div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
														<Activity className="h-4 w-4" />
													</div>
													<div className="space-y-1">
														<p className="text-sm font-medium leading-none">
															{t.sellerId === user.id
																? "Sold ticket(s)"
																: "Purchased ticket(s)"}
														</p>
														<p className="text-xs text-muted-foreground">
															{format(new Date(t.transactionDate), "PPP p")}
														</p>
													</div>
												</div>
												<div className="font-medium">
													{t.sellerId === user.id ? "+" : "-"}KES{" "}
													{t.amount.toLocaleString()}
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						{/* Other tabs would be implemented similarly */}
						<TabsContent value="listings">
							<div className="flex items-center justify-center py-8 text-muted-foreground">
								Listings content would be here
							</div>
						</TabsContent>
						<TabsContent value="transactions">
							<div className="flex items-center justify-center py-8 text-muted-foreground">
								Transactions content would be here
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
