"use client";

import { use, useState } from "react";
import { events } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	Calendar,
	MapPin,
	Clock,
	Share2,
	Heart,
	ShieldCheck,
	Ticket,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function EventDetailsPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);
	const event = events.find((e) => e.id === id) || events[0]; // Fallback to first event if not found

	// Derived state for ticket selection
	const [selectedCategory, setSelectedCategory] = useState<string>(
		event.ticketCategories[0]?.id
	);
	const [quantity, setQuantity] = useState(1);

	const currentCategory = event.ticketCategories.find(
		(c) => c.id === selectedCategory
	);
	const totalPrice = currentCategory ? currentCategory.price * quantity : 0;

	return (
		<div className="min-h-screen bg-background pb-20">
			{/* Hero Image */}
			<div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden bg-black">
				<div
					className="absolute inset-0 bg-cover bg-center opacity-60"
					style={{ backgroundImage: `url(${event.posterImage})` }}
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

				<div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
					<div className="container">
						<Badge className="mb-4 text-lg py-1 px-4">{event.category}</Badge>
						<h1 className="text-4xl md:text-6xl font-bold text-white mb-2 leading-tight max-w-4xl">
							{event.name}
						</h1>
						<p className="text-white/80 text-xl font-medium flex items-center gap-2">
							<MapPin className="h-5 w-5 text-primary" /> {event.venue},{" "}
							{event.city}
						</p>
					</div>
				</div>
			</div>

			<div className="container mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
				{/* Left Column: Details */}
				<div className="lg:col-span-2 space-y-8">
					{/* Date & Time Bar */}
					<div className="flex flex-wrap gap-6 bg-secondary/20 p-6 rounded-xl border border-secondary">
						<div className="flex items-center gap-3">
							<div className="bg-primary/20 p-2 rounded-lg text-primary">
								<Calendar className="h-6 w-6" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Date</p>
								<p className="font-semibold text-lg">
									{format(new Date(event.date), "EEE, MMM do, yyyy")}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<div className="bg-primary/20 p-2 rounded-lg text-primary">
								<Clock className="h-6 w-6" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Time</p>
								<p className="font-semibold text-lg">
									{format(new Date(event.date), "h:mm a")}
								</p>
							</div>
						</div>
					</div>

					{/* About */}
					<section className="space-y-4">
						<h2 className="text-2xl font-bold">About this Event</h2>
						<p className="text-lg text-muted-foreground leading-relaxed">
							{event.description}
						</p>
						<p className="text-muted-foreground leading-relaxed">
							Join us for an unforgettable experience at {event.venue}. This
							event promises to be one of the highlights of the year, featuring
							amazing performances and a vibrant atmosphere. Secure your tickets
							now before they sell out!
						</p>
					</section>

					<Separator />

					{/* Organizer */}
					<section className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Avatar className="h-14 w-14">
								<AvatarImage
									src={`https://i.pravatar.cc/150?u=${event.organizer}`}
								/>
								<AvatarFallback>OR</AvatarFallback>
							</Avatar>
							<div>
								<p className="text-sm text-muted-foreground">Organized by</p>
								<h3 className="text-xl font-semibold">{event.organizer}</h3>
							</div>
						</div>
						<Button variant="outline">View Profile</Button>
					</section>
				</div>

				{/* Right Column: Ticket Selection */}
				<div className="relative">
					<Card className="sticky top-24 border-primary/20 shadow-xl overflow-hidden">
						<div className="bg-primary p-4 text-primary-foreground text-center font-bold text-lg">
							Get Tickets
						</div>
						<CardContent className="p-6 space-y-6">
							{/* Categories */}
							<div className="space-y-3">
								<p className="font-medium">Select Ticket Category</p>
								<div className="space-y-2">
									{event.ticketCategories.map((cat) => (
										<div
											key={cat.id}
											onClick={() => setSelectedCategory(cat.id)}
											className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex justify-between items-center hover:border-primary/50 ${
												selectedCategory === cat.id
													? "border-primary bg-primary/5"
													: "border-transparent bg-secondary"
											}`}
										>
											<div>
												<p className="font-semibold">{cat.name}</p>
												<p className="text-xs text-muted-foreground">
													{cat.section || "General Admission"}
												</p>
											</div>
											<p className="font-bold text-primary">
												KES {cat.price.toLocaleString()}
											</p>
										</div>
									))}
								</div>
							</div>

							<Separator />

							{/* Quantity */}
							<div className="flex items-center justify-between">
								<p className="font-medium">Quantity</p>
								<div className="flex items-center gap-3">
									<Button
										variant="outline"
										size="icon"
										className="h-8 w-8"
										onClick={() => setQuantity(Math.max(1, quantity - 1))}
										disabled={quantity <= 1}
									>
										-
									</Button>
									<span className="w-8 text-center font-bold text-lg">
										{quantity}
									</span>
									<Button
										variant="outline"
										size="icon"
										className="h-8 w-8"
										onClick={() => setQuantity(Math.min(10, quantity + 1))}
										disabled={quantity >= 10}
									>
										+
									</Button>
								</div>
							</div>

							{/* Total & Action */}
							<div className="pt-4 space-y-4">
								<div className="flex justify-between items-end">
									<p className="text-muted-foreground">Total Amount</p>
									<p className="text-3xl font-bold">
										KES {totalPrice.toLocaleString()}
									</p>
								</div>
								<Button
									className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/25"
									size="lg"
								>
									<Ticket className="mr-2 h-5 w-5" /> Buy Tickets Now
								</Button>
								<p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
									<ShieldCheck className="h-3 w-3" /> 100% Buyer Guarantee
								</p>
							</div>
						</CardContent>
					</Card>

					<div className="mt-6 flex justify-center gap-4">
						<Button variant="ghost" className="text-muted-foreground">
							<Share2 className="mr-2 h-4 w-4" /> Share
						</Button>
						<Button variant="ghost" className="text-muted-foreground">
							<Heart className="mr-2 h-4 w-4" /> Save
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
