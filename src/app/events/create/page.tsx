import { EventForm } from "@/components/events/EventForm";

export default function CreateEventPage() {
	return (
		<div className="max-w-4xl mx-auto space-y-6">
			<div>
				<h2 className="text-3xl font-bold tracking-tight">Create New Event</h2>
				<p className="text-muted-foreground">
					Fill in the details below to list a new event on the platform.
				</p>
			</div>

			<EventForm />
		</div>
	);
}
