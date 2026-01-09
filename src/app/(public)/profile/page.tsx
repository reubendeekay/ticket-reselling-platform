"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { users, events, listings } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ticket, ShoppingBag, DollarSign } from "lucide-react";

export default function ProfilePage() {
	const user = users[5]; // Mock user (Buyer/Seller)

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-3xl font-bold tracking-tight">Profile Overview</h2>
				<p className="text-muted-foreground">Welcome back, {user.name}</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Tickets Bought
						</CardTitle>
						<Ticket className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{user.totalPurchases}</div>
						<p className="text-xs text-muted-foreground">+2 from last month</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Active Listings
						</CardTitle>
						<ShoppingBag className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{user.totalListings}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Sales</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							KES {user.revenue.toLocaleString()}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Profile Details */}
			<Card>
				<CardHeader>
					<CardTitle>Account Details</CardTitle>
				</CardHeader>
				<CardContent className="flex items-center gap-6">
					<Avatar className="h-24 w-24">
						<AvatarImage src={`https://i.pravatar.cc/150?u=${user.id}`} />
						<AvatarFallback>U</AvatarFallback>
					</Avatar>
					<div className="space-y-1">
						<p>
							<span className="font-semibold">Name:</span> {user.name}
						</p>
						<p>
							<span className="font-semibold">Email:</span> {user.email}
						</p>
						<p>
							<span className="font-semibold">Phone:</span> {user.phone}
						</p>
						<p>
							<span className="font-semibold">Role:</span>{" "}
							<span className="capitalize">{user.role}</span>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
