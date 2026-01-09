"use client";

import { Event } from "@/types";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	MoreHorizontal,
	Calendar,
	MapPin,
	Eye,
	Edit,
	Trash,
} from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EventGridProps {
	data: Event[];
}

export function EventGrid({ data }: EventGridProps) {
	return (
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{data.map((event) => (
				<Card key={event.id} className="overflow-hidden flex flex-col">
					<div className="relative aspect-video w-full">
						{/* Using a placeholder because mock images might fail or be generic. In real app, use event.posterImage */}
						<div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
							<img
								src={`https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80`}
								alt={event.name}
								className="object-cover w-full h-full"
							/>
						</div>
						<div className="absolute top-2 right-2">
							<Badge
								variant={
									event.status === "published"
										? "default"
										: event.status === "draft"
										? "secondary"
										: event.status === "cancelled"
										? "destructive"
										: "outline"
								}
								className={
									event.status === "published"
										? "bg-green-500 hover:bg-green-600"
										: ""
								}
							>
								{event.status}
							</Badge>
						</div>
						<div className="absolute bottom-2 left-2">
							<Badge
								variant="secondary"
								className="backdrop-blur-md bg-white/50 text-black dark:bg-black/50 dark:text-white"
							>
								{event.category}
							</Badge>
						</div>
					</div>
					<CardHeader className="p-4 pb-2">
						<h3
							className="font-semibold text-lg line-clamp-1"
							title={event.name}
						>
							{event.name}
						</h3>
						<div className="flex flex-col gap-1 text-sm text-muted-foreground">
							<div className="flex items-center gap-2">
								<Calendar className="h-3 w-3" />
								{format(new Date(event.date), "MMM d, yyyy • h:mm a")}
							</div>
							<div className="flex items-center gap-2">
								<MapPin className="h-3 w-3" />
								{event.venue}, {event.city}
							</div>
						</div>
					</CardHeader>
					<CardContent className="p-4 pt-2 flex-1">
						<div className="grid grid-cols-3 gap-2 text-center text-xs">
							<div className="bg-muted p-2 rounded">
								<div className="font-semibold">{event.listingsCount}</div>
								<div className="text-muted-foreground">Listings</div>
							</div>
							<div className="bg-muted p-2 rounded">
								<div className="font-semibold">{event.soldCount}</div>
								<div className="text-muted-foreground">Sold</div>
							</div>
							<div className="bg-muted p-2 rounded">
								<div className="font-semibold">{event.views}</div>
								<div className="text-muted-foreground">Views</div>
							</div>
						</div>
					</CardContent>
					<CardFooter className="p-4 pt-0 flex justify-between items-center">
						<Button variant="outline" size="sm" asChild className="w-full mr-2">
							<Link href={`/events/${event.id}`}>View Details</Link>
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="h-8 w-8">
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>
									<Edit className="mr-2 h-4 w-4" /> Edit
								</DropdownMenuItem>
								<DropdownMenuItem className="text-destructive">
									<Trash className="mr-2 h-4 w-4" /> Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
