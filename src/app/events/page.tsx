"use client";

import { useState } from "react";
import { events as initialEvents } from "@/data/mockData";
import { EventTable } from "@/components/events/EventTable";
import { EventGrid } from "@/components/events/EventGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Plus,
	Search,
	LayoutGrid,
	List as ListIcon,
	FileDown,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function EventsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [view, setView] = useState("grid");

	const filteredEvents = initialEvents.filter((event) => {
		const matchesSearch =
			event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			event.venue.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus =
			statusFilter === "all" || event.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
				<div>
					<h2 className="text-3xl font-bold tracking-tight">Events</h2>
					<p className="text-muted-foreground">
						Manage and monitor all events on the platform.
					</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline">
						<FileDown className="mr-2 h-4 w-4" /> Export
					</Button>
					<Button asChild>
						<Link href="/events/create">
							<Plus className="mr-2 h-4 w-4" /> Create Event
						</Link>
					</Button>
				</div>
			</div>

			<div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-lg border shadow-sm">
				<div className="flex items-center gap-2 w-full sm:w-auto flex-1">
					<div className="relative flex-1 max-w-sm">
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search events..."
							className="pl-8"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<Select value={statusFilter} onValueChange={setStatusFilter}>
						<SelectTrigger className="w-[150px]">
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Status</SelectItem>
							<SelectItem value="published">Published</SelectItem>
							<SelectItem value="draft">Draft</SelectItem>
							<SelectItem value="cancelled">Cancelled</SelectItem>
							<SelectItem value="completed">Completed</SelectItem>
						</SelectContent>
					</Select>
					<Select>
						<SelectTrigger className="w-[150px]">
							<SelectValue placeholder="Category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Categories</SelectItem>
							<SelectItem value="music">Music</SelectItem>
							<SelectItem value="sports">Sports</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="flex items-center gap-2">
					<Tabs value={view} onValueChange={setView} className="w-[100px]">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="grid">
								<LayoutGrid className="h-4 w-4" />
							</TabsTrigger>
							<TabsTrigger value="list">
								<ListIcon className="h-4 w-4" />
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
			</div>

			<Tabs value={view} className="space-y-4">
				<TabsContent value="grid">
					<EventGrid data={filteredEvents} />
				</TabsContent>
				<TabsContent value="list">
					<EventTable data={filteredEvents} />
				</TabsContent>
			</Tabs>

			{filteredEvents.length === 0 && (
				<Card className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
					<div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
						<Search className="h-6 w-6" />
					</div>
					<h3 className="text-lg font-semibold">No events found</h3>
					<p>Try matching your search or adjusting filters.</p>
				</Card>
			)}
		</div>
	);
}
