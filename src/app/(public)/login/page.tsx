"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Ticket, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { RoleSelector } from "@/components/auth/RoleSelector";

export default function LoginPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [showRoleSelector, setShowRoleSelector] = useState(false);

	async function onSubmit(event: React.FormEvent) {
		event.preventDefault();
		setIsLoading(true);

		// Mock login delay
		setTimeout(() => {
			setIsLoading(false);
			// For demo purposes, we'll show role selector after "login"
			// In real app, check if user has role needed
			setShowRoleSelector(true);
		}, 1500);
	}

	if (showRoleSelector) {
		return <RoleSelector />;
	}

	return (
		<div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
				<div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary" />
				{/* African Pattern Overlay */}
				<div
					className="absolute inset-0 opacity-20"
					style={{
						backgroundImage:
							"linear-gradient(45deg, var(--terracotta) 25%, transparent 25%, transparent 75%, var(--terracotta) 75%, var(--terracotta)), linear-gradient(45deg, var(--terracotta) 25%, transparent 25%, transparent 75%, var(--terracotta) 75%, var(--terracotta))",
						backgroundSize: "60px 60px",
						backgroundPosition: "0 0, 30px 30px",
					}}
				></div>
				<div className="relative z-20 flex items-center text-lg font-medium">
					<Ticket className="mr-2 h-6 w-6" />
					TicketResellKE
				</div>
				<div className="relative z-20 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-lg">
							&ldquo;I sold my extra Sauti Sol tickets in minutes! The buyer
							protection gave me peace of mind using M-Pesa.&rdquo;
						</p>
						<footer className="text-sm">Amina Wanjiku</footer>
					</blockquote>
				</div>
			</div>
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							Welcome back
						</h1>
						<p className="text-sm text-muted-foreground">
							Enter your email to sign in to your account
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
									<div className="flex items-center justify-between">
										<Label htmlFor="password">Password</Label>
										<Link
											href="#"
											className="text-sm text-primary hover:underline"
										>
											Forgot password?
										</Link>
									</div>
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
								<div className="flex items-center space-x-2">
									<Checkbox id="remember" />
									<label
										htmlFor="remember"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										Remember me
									</label>
								</div>
								<Button disabled={isLoading}>
									{isLoading && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									Sign In with Email
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
							{isLoading ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<svg
									className="mr-2 h-4 w-4"
									aria-hidden="true"
									focusable="false"
									data-prefix="fab"
									data-icon="google"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 488 512"
								>
									<path
										fill="currentColor"
										d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
									></path>
								</svg>
							)}
							Google
						</Button>
					</div>
					<p className="px-8 text-center text-sm text-muted-foreground">
						<Link
							href="/signup"
							className="hover:text-brand underline underline-offset-4"
						>
							Don&apos;t have an account? Sign Up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
