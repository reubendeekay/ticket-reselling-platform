"use client";

import { EventForm } from "@/components/events/EventForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Ticket, DollarSign, ShieldCheck } from "lucide-react";

export default function SellTicketsPage() {
	return (
		<div className="min-h-screen bg-muted/30 pb-20">
			{/* Header */}
			<div className="bg-primary py-12 text-primary-foreground">
				<div className="container">
					<h1 className="text-4xl font-bold mb-4">Sell Your Tickets</h1>
					<p className="text-xl opacity-90 max-w-2xl">
						Turn your extra tickets into cash securely. List your tickets in
						minutes and get paid directly to M-Pesa.
					</p>
				</div>
			</div>

			<div className="container -mt-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left: Benefits */}
					<div className="space-y-6 lg:col-span-1 order-2 lg:order-1 lg:mt-12">
						<Card className="border-none shadow-md bg-white/50 backdrop-blur">
							<CardHeader>
								<CardTitle className="text-lg">Why Sell with Us?</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="flex gap-4">
									<div className="bg-green-100 p-2 rounded-lg text-green-600 h-fit">
										<DollarSign className="h-6 w-6" />
									</div>
									<div>
										<h3 className="font-semibold mb-1">Instant Payouts</h3>
										<p className="text-sm text-muted-foreground">
											Get paid immediately via M-Pesa once the event is
											verified.
										</p>
									</div>
								</div>
								<div className="flex gap-4">
									<div className="bg-blue-100 p-2 rounded-lg text-blue-600 h-fit">
										<ShieldCheck className="h-6 w-6" />
									</div>
									<div>
										<h3 className="font-semibold mb-1">Secure Transfer</h3>
										<p className="text-sm text-muted-foreground">
											We handle the ticket transfer to ensure safety for both
											parties.
										</p>
									</div>
								</div>
								<div className="flex gap-4">
									<div className="bg-purple-100 p-2 rounded-lg text-purple-600 h-fit">
										<Ticket className="h-6 w-6" />
									</div>
									<div>
										<h3 className="font-semibold mb-1">Reach more Fans</h3>
										<p className="text-sm text-muted-foreground">
											List on Kenya's biggest marketplace and sell faster.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Right: Form */}
					<div className="lg:col-span-2 order-1 lg:order-2">
						<Card className="shadow-lg border-t-4 border-t-primary">
							<CardHeader>
								<CardTitle>Event Details</CardTitle>
								<CardDescription>
									Enter the details of the event you have tickets for.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<EventForm />
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
