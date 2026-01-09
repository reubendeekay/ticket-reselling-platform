import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";
import { Event } from "@/types";

interface EventCardProps {
	event: Event;
	className?: string;
}

export function EventCard({ event, className }: EventCardProps) {
	return (
		<Card
			className={cn(
				"overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 h-full flex flex-col group",
				className
			)}
		>
			<div className="relative aspect-[16/9] bg-muted overflow-hidden">
				{/* Placeholder for now, would be next/image */}
				<div className="absolute inset-0 bg-secondary/20 flex items-center justify-center text-muted-foreground group-hover:scale-105 transition-transform duration-500">
					{/* If we had real images we'd use them. For now just a colored block or placeholder text */}
					<span className="sr-only">{event.name}</span>
				</div>
				<div
					className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
					style={{ backgroundImage: `url(${event.posterImage})` }}
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

				<Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground hover:bg-secondary/90">
					{event.category}
				</Badge>

				<div className="absolute bottom-2 left-2 right-2 text-white">
					<p className="text-xs font-medium flex items-center mb-1">
						<Calendar className="mr-1 h-3 w-3" />
						{new Date(event.date).toLocaleDateString(undefined, {
							weekday: "short",
							month: "short",
							day: "numeric",
							hour: "numeric",
							minute: "2-digit",
						})}
					</p>
				</div>
			</div>

			<CardContent className="p-4 flex-1 border-l-4 border-l-primary">
				<h3
					className="font-bold text-lg leading-tight mb-2 line-clamp-2"
					title={event.name}
				>
					<Link
						href={`/events/${event.id}`}
						className="hover:text-primary transition-colors"
					>
						{event.name}
					</Link>
				</h3>
				<p className="text-sm text-muted-foreground flex items-center mb-3">
					<MapPin className="mr-1 h-3.5 w-3.5" />
					{event.venue}
				</p>
			</CardContent>

			<CardFooter className="p-4 pt-0 flex items-center justify-between border-l-4 border-l-primary">
				<div className="flex flex-col">
					<span className="text-xs text-muted-foreground">Starting from</span>
					<span className="font-bold text-lg text-primary">
						KES{" "}
						{event.ticketCategories.length > 0
							? Math.min(
									...event.ticketCategories.map((c) => c.price)
							  ).toLocaleString()
							: "N/A"}
					</span>
				</div>
				<Button size="sm" asChild>
					<Link href={`/events/${event.id}`}>Buy Ticket</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
