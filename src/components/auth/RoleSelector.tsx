"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ShoppingBag, Tag, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function RoleSelector() {
	const router = useRouter();
	const [selectedRole, setSelectedRole] = useState<
		"buyer" | "seller" | "both" | null
	>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleContinue = () => {
		if (!selectedRole) return;
		setIsLoading(true);
		// Simulate saving role
		setTimeout(() => {
			// In real app, check for admin credentials here or redirect
			if (selectedRole === "seller" || selectedRole === "both") {
				router.push("/home"); // Redirect to home logged in
			} else {
				router.push("/home");
			}
		}, 1000);
	};

	return (
		<div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
			<Card className="w-full max-w-2xl border-none shadow-2xl">
				<CardHeader className="text-center">
					<CardTitle className="text-3xl font-bold text-primary">
						How will you use TicketHub?
					</CardTitle>
					<CardDescription className="text-lg">
						Select your primary goal. You can change this later.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-6 md:grid-cols-3 pt-6">
					<div
						className={cn(
							"cursor-pointer rounded-xl border-2 p-6 hover:border-primary hover:bg-primary/5 transition-all text-center space-y-4",
							selectedRole === "buyer"
								? "border-primary bg-primary/10 ring-2 ring-primary ring-offset-2"
								: "border-muted"
						)}
						onClick={() => setSelectedRole("buyer")}
					>
						<div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
							<ShoppingBag className="h-8 w-8" />
						</div>
						<div>
							<h3 className="font-bold text-lg mb-1">Buy Tickets</h3>
							<p className="text-sm text-muted-foreground">
								I want to discover and attend events
							</p>
						</div>
						{selectedRole === "buyer" && (
							<Check className="absolute top-4 right-4 h-6 w-6 text-primary" />
						)}
					</div>

					<div
						className={cn(
							"cursor-pointer rounded-xl border-2 p-6 hover:border-primary hover:bg-primary/5 transition-all text-center space-y-4",
							selectedRole === "seller"
								? "border-primary bg-primary/10 ring-2 ring-primary ring-offset-2"
								: "border-muted"
						)}
						onClick={() => setSelectedRole("seller")}
					>
						<div className="mx-auto w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
							<Tag className="h-8 w-8" />
						</div>
						<div>
							<h3 className="font-bold text-lg mb-1">Sell Tickets</h3>
							<p className="text-sm text-muted-foreground">
								I have tickets I want to sell safely
							</p>
						</div>
					</div>

					<div
						className={cn(
							"cursor-pointer rounded-xl border-2 p-6 hover:border-primary hover:bg-primary/5 transition-all text-center space-y-4",
							selectedRole === "both"
								? "border-primary bg-primary/10 ring-2 ring-primary ring-offset-2"
								: "border-muted"
						)}
						onClick={() => setSelectedRole("both")}
					>
						<div className="mx-auto w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
							<div className="flex">
								<ShoppingBag className="h-6 w-6 mr-[-8px]" />
								<Tag className="h-6 w-6" />
							</div>
						</div>
						<div>
							<h3 className="font-bold text-lg mb-1">Both</h3>
							<p className="text-sm text-muted-foreground">
								I want to do it all!
							</p>
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex justify-center pb-8">
					<Button
						size="lg"
						className="w-full md:w-1/2 text-lg h-12 rounded-full"
						onClick={handleContinue}
						disabled={!selectedRole || isLoading}
					>
						{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Continue
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
