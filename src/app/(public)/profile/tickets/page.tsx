"use client";

import { events } from "@/data/mockData";
import { EventCard } from "@/components/events/EventCard";

export default function MyTicketsPage() {
	// Mock user's tickets - just using some events as placeholders
	const myEvents = events.slice(0, 3);

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-3xl font-bold tracking-tight">My Tickets</h2>
				<p className="text-muted-foreground">Manage your upcoming events</p>
			</div>

			{myEvents.length > 0 ? (
				<div className="grid gap-6 sm:grid-cols-2">
					{myEvents.map((event) => (
						<EventCard key={event.id} event={event} />
					))}
				</div>
			) : (
				<p>No tickets found.</p>
			)}
		</div>
	);
}
