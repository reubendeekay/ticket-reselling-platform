"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { events } from "@/data/mockData";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Phone, CheckCircle, Loader2 } from "lucide-react";
import { useState, Suspense } from "react";

function CheckoutContent() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const eventId = searchParams.get("eventId") || "e-1"; // Fallback URL param logic mostly for demo
	const qty = Number(searchParams.get("qty") || "1");
	const catId = searchParams.get("catId");

	const event = events.find((e) => e.id === eventId) || events[0];
	const category =
		event.ticketCategories.find((c) => c.id === catId) ||
		event.ticketCategories[0];
	const totalAmount = category.price * qty;

	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState<"phone" | "processing" | "success">("phone");
	const [phone, setPhone] = useState("+254");

	const handlePayment = async () => {
		setLoading(true);
		// Simulate API call
		setTimeout(() => {
			setStep("processing");
			setTimeout(() => {
				setLoading(false);
				setStep("success");
			}, 2000);
		}, 1000);
	};

	return (
		<div className="min-h-screen bg-muted/30 py-12">
			<div className="container max-w-lg">
				<Card className="shadow-xl border-t-4 border-t-primary">
					<CardHeader>
						<CardTitle>Checkout</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* Order Summary */}
						<div className="space-y-4 bg-muted/50 p-4 rounded-lg">
							<h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
								Order Summary
							</h3>
							<div className="flex justify-between items-start">
								<div>
									<p className="font-bold text-lg">{event.name}</p>
									<p className="text-sm text-muted-foreground">
										{event.venue}, {event.city}
									</p>
									<p className="text-sm mt-1">
										{category.name} Ticket x {qty}
									</p>
								</div>
								<div className="text-right">
									<p className="text-sm text-muted-foreground">Amount</p>
									<p className="font-bold text-lg">
										KES {totalAmount.toLocaleString()}
									</p>
								</div>
							</div>
							<Separator />
							<div className="flex justify-between font-bold text-xl text-primary">
								<span>Total</span>
								<span>KES {totalAmount.toLocaleString()}</span>
							</div>
						</div>

						{/* Payment Flow */}
						{step === "phone" && (
							<div className="space-y-4">
								<div className="space-y-2">
									<Label>M-Pesa Phone Number</Label>
									<div className="relative">
										<Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
										<Input
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
											className="pl-9 font-mono"
											placeholder="+254..."
										/>
									</div>
									<p className="text-xs text-muted-foreground">
										Enter the number to receive the M-Pesa prompt.
									</p>
								</div>
								<Button
									className="w-full h-12 text-lg"
									onClick={handlePayment}
									disabled={loading}
								>
									{loading ? (
										<Loader2 className="animate-spin mr-2" />
									) : (
										"Pay with M-Pesa"
									)}
								</Button>
							</div>
						)}

						{step === "processing" && (
							<div className="text-center py-8 space-y-4">
								<Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
								<h3 className="font-semibold text-lg">Processing Payment</h3>
								<p className="text-muted-foreground text-sm">
									Please check your phone and enter your M-Pesa PIN to complete
									the transaction.
								</p>
							</div>
						)}

						{step === "success" && (
							<div className="text-center py-6 space-y-4">
								<CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
								<h3 className="font-bold text-2xl">Payment Successful!</h3>
								<p className="text-muted-foreground">
									Your tickets have been sent to your email.
								</p>
								<Button
									className="w-full"
									variant="outline"
									onClick={() => router.push("/profile/tickets")}
								>
									View My Tickets
								</Button>
							</div>
						)}
					</CardContent>

					{step === "phone" && (
						<CardFooter className="justify-center border-t py-4 bg-muted/20">
							<p className="text-xs text-muted-foreground flex items-center gap-1">
								<ShieldCheck className="h-3 w-3" /> Secure Payment via Daraja
								API
							</p>
						</CardFooter>
					)}
				</Card>
			</div>
		</div>
	);
}

export default function CheckoutPage() {
	return (
		<Suspense
			fallback={
				<div className="flex h-screen items-center justify-center">
					Loading...
				</div>
			}
		>
			<CheckoutContent />
		</Suspense>
	);
}
