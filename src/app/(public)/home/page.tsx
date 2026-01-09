"use client";

import { useState } from "react";
import { events, users } from "@/data/mockData";
import { EventCard } from "@/components/events/EventCard";
import { CategoryList } from "@/components/home/CategoryList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Flame, Ticket, ArrowRight, Bell } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HomePage() {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	// Mock user
	const user = users[5]; // Just pick a buyer
	const userName = user?.name.split(" ")[0] || "User";

	// Filter events
	const filteredEvents = events.filter((event) => {
		const matchesCategory =
			selectedCategory === "all" ||
			event.category.toLowerCase() === selectedCategory.toLowerCase();
		const matchesSearch =
			event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			event.venue.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	const trendingEvents = events.slice(0, 4); // Just take first 4 as trending
	const recommendedEvents = events.slice(5, 9);

	return (
		<div className="min-h-screen bg-background">
			{/* Header/Greeting Section */}
			<div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b">
				<div className="container py-4 flex flex-col space-y-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<Avatar className="h-10 w-10 border-2 border-primary">
								<AvatarImage src={`https://i.pravatar.cc/150?u=${user?.id}`} />
								<AvatarFallback>{userName[0]}</AvatarFallback>
							</Avatar>
							<div>
								<p className="text-sm text-muted-foreground">
									Good {new Date().getHours() < 12 ? "Morning" : "Evening"},
								</p>
								<h1 className="text-xl font-bold leading-none">
									Jambo, {userName}!
								</h1>
							</div>
						</div>
						<Button variant="ghost" size="icon" className="relative">
							<Bell className="h-5 w-5" />
							<span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
						</Button>
					</div>

					{/* Search Bar */}
					<div className="relative">
						<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search events, artists, or venues..."
							className="pl-9 bg-secondary/20 border-transparent focus-visible:bg-background focus-visible:border-primary"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					{/* Categories */}
					<CategoryList
						selected={selectedCategory}
						onSelect={setSelectedCategory}
					/>
				</div>
			</div>

			<div className="container py-6 space-y-8">
				{/* Quick Actions */}
				<div className="grid grid-cols-2 gap-4">
					<Link
						href="/sell"
						className="group relative overflow-hidden rounded-xl bg-orange-100 p-4 transition-all hover:bg-orange-200 dark:bg-orange-900/20 dark:hover:bg-orange-900/30"
					>
						<div className="relative z-10 flex flex-col justify-between h-full space-y-2">
							<div className="bg-orange-500/10 w-fit p-2 rounded-lg text-orange-600 dark:text-orange-400">
								<Ticket className="h-6 w-6" />
							</div>
							<div>
								<h3 className="font-bold text-orange-900 dark:text-orange-100">
									Sell Tickets
								</h3>
								<p className="text-xs text-orange-700 dark:text-orange-300">
									Monetize your extras
								</p>
							</div>
						</div>
						<div className="absolute right-[-20px] top-[-20px] h-24 w-24 rounded-full bg-orange-500/10 blur-2xl transition-all group-hover:bg-orange-500/20" />
					</Link>
					<Link
						href="/profile/tickets"
						className="group relative overflow-hidden rounded-xl bg-blue-100 p-4 transition-all hover:bg-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/30"
					>
						<div className="relative z-10 flex flex-col justify-between h-full space-y-2">
							<div className="bg-blue-500/10 w-fit p-2 rounded-lg text-blue-600 dark:text-blue-400">
								<Ticket className="h-6 w-6" />
							</div>
							<div>
								<h3 className="font-bold text-blue-900 dark:text-blue-100">
									My Tickets
								</h3>
								<p className="text-xs text-blue-700 dark:text-blue-300">
									View your purchases
								</p>
							</div>
						</div>
						<div className="absolute right-[-20px] top-[-20px] h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition-all group-hover:bg-blue-500/20" />
					</Link>
				</div>

				{/* Trending Section */}
				{searchQuery === "" && (
					<section>
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-xl font-bold flex items-center">
								<Flame className="mr-2 h-5 w-5 text-orange-500" />
								Trending Now
							</h2>
							<Link
								href="/events"
								className="text-sm font-medium text-primary hover:underline"
							>
								View All
							</Link>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{trendingEvents.map((event) => (
								<EventCard key={event.id} event={event as any} />
								/* casting as any because mock event type might slightly differ from component expectation, 
                       but keys should match generally. */
							))}
						</div>
					</section>
				)}

				{/* Recommended / Browse Section */}
				<section>
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-bold">
							{searchQuery ? "Search Results" : "Recommended for You"}
						</h2>
					</div>
					{filteredEvents.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{(searchQuery ? filteredEvents : recommendedEvents).map(
								(event) => (
									<EventCard key={event.id} event={event as any} />
								)
							)}
						</div>
					) : (
						<div className="text-center py-10">
							<p className="text-muted-foreground">
								No events found matching your criteria.
							</p>
						</div>
					)}
				</section>
			</div>
		</div>
	);
}
