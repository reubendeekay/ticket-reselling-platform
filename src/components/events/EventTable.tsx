"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Event } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Edit, Trash, Copy } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

interface EventTableProps {
	data: Event[];
}

export function EventTable({ data }: EventTableProps) {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[50px]">
							<Checkbox />
						</TableHead>
						<TableHead>Event</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Venue</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="text-right">Listings</TableHead>
						<TableHead className="text-right">Sold</TableHead>
						<TableHead className="text-right">Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((event) => (
						<TableRow key={event.id}>
							<TableCell>
								<Checkbox />
							</TableCell>
							<TableCell className="font-medium flex items-center gap-3">
								<Avatar className="h-10 w-10 rounded">
									<AvatarImage
										src={`https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=64&h=64&auto=format&fit=crop&q=60`}
										alt={event.name}
									/>
									<AvatarFallback>{event.name.substring(0, 2)}</AvatarFallback>
								</Avatar>
								<div className="flex flex-col">
									<span>{event.name}</span>
									<span className="text-xs text-muted-foreground">
										{event.organizer}
									</span>
								</div>
							</TableCell>
							<TableCell>
								{format(new Date(event.date), "MMM d, yyyy")}
							</TableCell>
							<TableCell>{event.venue}</TableCell>
							<TableCell>
								<Badge variant="outline">{event.category}</Badge>
							</TableCell>
							<TableCell>
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
							</TableCell>
							<TableCell className="text-right">
								{event.listingsCount}
							</TableCell>
							<TableCell className="text-right">{event.soldCount}</TableCell>
							<TableCell className="text-right">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" className="h-8 w-8 p-0">
											<span className="sr-only">Open menu</span>
											<MoreHorizontal className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>Actions</DropdownMenuLabel>
										<DropdownMenuItem asChild>
											<Link href={`/events/${event.id}`}>
												<Eye className="mr-2 h-4 w-4" /> View Details
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Edit className="mr-2 h-4 w-4" /> Edit
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Copy className="mr-2 h-4 w-4" /> Duplicate
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem className="text-destructive">
											<Trash className="mr-2 h-4 w-4" /> Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
