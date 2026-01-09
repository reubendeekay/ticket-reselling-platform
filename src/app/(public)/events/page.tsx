"use client";

import { events } from "@/data/mockData";
import { EventCard } from "@/components/events/EventCard";
import { EventFilters } from "@/components/events/EventFilters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export default function EventsPage() {
	// Mock Pagination
	const displayedEvents = events;

	return (
		<div className="min-h-screen bg-background pb-10">
			{/* Header */}
			<div className="bg-muted/30 border-b">
				<div className="container py-8 space-y-4">
					<h1 className="text-3xl font-bold tracking-tight">Browse Events</h1>
					<p className="text-muted-foreground max-w-2xl">
						Discover the best concerts, sports, conferences, and festivals
						happening across Kenya. Buy verified resale tickets securely.
					</p>
				</div>
			</div>

			<div className="container py-8">
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Filters - Desktop */}
					<aside className="hidden lg:block w-64 flex-shrink-0">
						<div className="sticky top-24">
							<EventFilters />
						</div>
					</aside>

					{/* Content */}
					<div className="flex-1 space-y-6">
						{/* Search & Mobile Filter Bar */}
						<div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
							<div className="relative w-full sm:w-96">
								<Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input placeholder="Search events..." className="pl-9" />
							</div>

							<div className="flex items-center gap-2 w-full sm:w-auto">
								{/* Mobile Filter Sheet */}
								<Sheet>
									<SheetTrigger asChild>
										<Button variant="outline" className="lg:hidden flex-1">
											<SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
										</Button>
									</SheetTrigger>
									<SheetContent
										side="left"
										className="w-[300px] overflow-y-auto"
									>
										<SheetHeader>
											<SheetTitle>Filter Events</SheetTitle>
											<SheetDescription>
												Refine your event search
											</SheetDescription>
										</SheetHeader>
										<div className="py-6">
											<EventFilters />
										</div>
									</SheetContent>
								</Sheet>

								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" className="flex-1 sm:w-auto">
											<ArrowUpDown className="mr-2 h-4 w-4" /> Sort
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem>Newest First</DropdownMenuItem>
										<DropdownMenuItem>Price: Low to High</DropdownMenuItem>
										<DropdownMenuItem>Price: High to Low</DropdownMenuItem>
										<DropdownMenuItem>Date: Soonest</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>

						{/* Events Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
							{displayedEvents.map((event) => (
								<EventCard key={event.id} event={event} />
							))}
						</div>

						{/* Load More / Pagination */}
						<div className="flex justify-center mt-8">
							<Button variant="outline" size="lg" className="w-full sm:w-auto">
								Load More Events
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
