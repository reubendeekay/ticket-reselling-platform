"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Ticket, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { RoleSelector } from "@/components/auth/RoleSelector";

export default function SignupPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [showRoleSelector, setShowRoleSelector] = useState(false);

	async function onSubmit(event: React.FormEvent) {
		event.preventDefault();
		setIsLoading(true);

		// Mock signup delay
		setTimeout(() => {
			setIsLoading(false);
			setShowRoleSelector(true);
		}, 1500);
	}

	if (showRoleSelector) {
		return <RoleSelector />;
	}

	return (
		<div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
				<div className="absolute inset-0 bg-gradient-to-tr from-secondary to-primary/80" />
				{/* African Pattern Overlay */}
				<div
					className="absolute inset-0 opacity-20"
					style={{
						backgroundImage:
							"radial-gradient(circle, var(--deep-ochre) 2px, transparent 2.5px)",
						backgroundSize: "30px 30px",
					}}
				></div>
				<div className="relative z-20 flex items-center text-lg font-medium">
					<Ticket className="mr-2 h-6 w-6" />
					TicketResellKE
				</div>
				<div className="relative z-20 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-lg">
							&ldquo;Join thousands of Kenyans buying and selling tickets safely
							every day.&rdquo;
						</p>
					</blockquote>
				</div>
			</div>
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							Create an account
						</h1>
						<p className="text-sm text-muted-foreground">
							Enter your email below to create your account
						</p>
					</div>
					<div className="grid gap-6">
						<form onSubmit={onSubmit}>
							<div className="grid gap-4">
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										placeholder="name@example.com"
										type="email"
										autoCapitalize="none"
										autoComplete="email"
										autoCorrect="off"
										disabled={isLoading}
										required
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										placeholder="••••••••"
										type="password"
										autoCapitalize="none"
										autoCorrect="off"
										disabled={isLoading}
										required
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="confirm-password">Confirm Password</Label>
									<Input
										id="confirm-password"
										placeholder="••••••••"
										type="password"
										autoCapitalize="none"
										autoCorrect="off"
										disabled={isLoading}
										required
									/>
								</div>

								<Button disabled={isLoading}>
									{isLoading && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									Sign Up with Email
								</Button>
							</div>
						</form>
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">
									Or continue with
								</span>
							</div>
						</div>
						<Button variant="outline" type="button" disabled={isLoading}>
							Google
						</Button>
					</div>
					<p className="px-8 text-center text-sm text-muted-foreground">
						<Link
							href="/login"
							className="hover:text-brand underline underline-offset-4"
						>
							Already have an account? Sign In
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
