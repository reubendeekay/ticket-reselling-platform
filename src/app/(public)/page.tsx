import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	Search,
	Ticket,
	Calendar,
	ShieldCheck,
	CreditCard,
} from "lucide-react";

export default function LandingPage() {
	return (
		<div className="flex flex-col min-h-screen">
			{/* Hero Section */}
			<section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20 lg:py-32 overflow-hidden">
				{/* Abstract Pattern Overlay Simulated with CSS */}
				<div
					className="absolute inset-0 opacity-10"
					style={{
						backgroundImage:
							"radial-gradient(circle at 20% 20%, var(--terracotta) 1px, transparent 1px), radial-gradient(circle at 80% 80%, var(--ankara-teal) 1px, transparent 1px)",
						backgroundSize: "40px 40px",
					}}
				></div>

				<div className="container relative z-10 px-4 md:px-6">
					<div className="flex flex-col items-center space-y-4 text-center">
						<div className="inline-block rounded-full bg-secondary/30 px-3 py-1 text-sm text-secondary-foreground font-semibold mb-2">
							🎉 Kenya's Trusted Ticket Marketplace
						</div>
						<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none max-w-3xl text-balance">
							Sell & Buy Event Tickets{" "}
							<span className="text-primary">Safely</span>
						</h1>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
							Discover concerts, sports, and festivals across Kenya. Secure
							M-Pesa payments and buyer protection guaranteed.
						</p>
						<div className="space-x-4 pt-4">
							<Button
								size="lg"
								className="h-12 px-8 text-lg rounded-full bg-primary hover:bg-primary/90"
							>
								<Link href="/events">Find Tickets</Link>
							</Button>
							<Button
								variant="outline"
								size="lg"
								className="h-12 px-8 text-lg rounded-full border-primary/20 text-primary hover:bg-primary/10"
							>
								<Link href="/sell">Sell Tickets</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Trust Indicators */}
			<section className="py-12 bg-white dark:bg-card border-y">
				<div className="container px-4 md:px-6">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						<div className="flex flex-col items-center text-center space-y-2">
							<div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-400">
								<ShieldCheck className="h-6 w-6" />
							</div>
							<h3 className="font-bold">Verified Sellers</h3>
						</div>
						<div className="flex flex-col items-center text-center space-y-2">
							<div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-400">
								<CreditCard className="h-6 w-6" />
							</div>
							<h3 className="font-bold">Secure M-Pesa</h3>
						</div>
						<div className="flex flex-col items-center text-center space-y-2">
							<div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-700 dark:text-orange-400">
								<Ticket className="h-6 w-6" />
							</div>
							<h3 className="font-bold">Buyer Protection</h3>
						</div>
						<div className="flex flex-col items-center text-center space-y-2">
							<div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-700 dark:text-purple-400">
								<Calendar className="h-6 w-6" />
							</div>
							<h3 className="font-bold">24/7 Support</h3>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Section Placeholder */}
			<section className="py-16 bg-muted/30">
				<div className="container px-4 md:px-6">
					<div className="flex justify-between items-center mb-10">
						<h2 className="text-3xl font-bold tracking-tight border-l-4 border-primary pl-4">
							Upcoming Events
						</h2>
						<Link
							href="/events"
							className="text-primary hover:underline font-medium"
						>
							View All &rarr;
						</Link>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* Mock Event Cards would go here */}
						<div className="border border-border bg-card text-card-foreground rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
							<div className="h-48 bg-muted w-full relative group">
								<div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
								{/* Image placeholder */}
								<div className="flex items-center justify-center h-full text-muted-foreground bg-secondary/20">
									Event Image
								</div>
							</div>
							<div className="p-6 border-l-4 border-l-primary">
								<div className="flex justify-between items-start mb-2">
									<span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
										Concert
									</span>
									<span className="font-bold text-lg text-primary">
										KES 2,500
									</span>
								</div>
								<h3 className="font-bold text-xl mb-2">Sauti Sol Experience</h3>
								<p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
									<Calendar className="h-4 w-4" /> Dec 12, 2026 • Nairobi
								</p>
								<Button className="w-full">View Tickets</Button>
							</div>
						</div>

						{/* Duplicate Cards for visual check */}
						<div className="border border-border bg-card text-card-foreground rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
							<div className="h-48 bg-muted w-full relative">
								<div className="flex items-center justify-center h-full text-muted-foreground bg-secondary/20">
									Event Image
								</div>
							</div>
							<div className="p-6 border-l-4 border-l-accent">
								<div className="flex justify-between items-start mb-2">
									<span className="text-xs font-semibold px-2 py-1 rounded-full bg-accent/10 text-accent">
										Festival
									</span>
									<span className="font-bold text-lg text-primary">
										KES 1,000
									</span>
								</div>
								<h3 className="font-bold text-xl mb-2">Blankets & Wine</h3>
								<p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
									<Calendar className="h-4 w-4" /> Nov 05, 2026 • Nairobi
								</p>
								<Button
									variant="outline"
									className="w-full border-primary/20 hover:bg-primary/5"
								>
									View Tickets
								</Button>
							</div>
						</div>

						<div className="border border-border bg-card text-card-foreground rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
							<div className="h-48 bg-muted w-full relative">
								<div className="flex items-center justify-center h-full text-muted-foreground bg-secondary/20">
									Event Image
								</div>
							</div>
							<div className="p-6 border-l-4 border-l-secondary">
								<div className="flex justify-between items-start mb-2">
									<span className="text-xs font-semibold px-2 py-1 rounded-full bg-secondary/10 text-secondary-foreground">
										Sports
									</span>
									<span className="font-bold text-lg text-primary">
										KES 500
									</span>
								</div>
								<h3 className="font-bold text-xl mb-2">Gor Mahia vs AFC</h3>
								<p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
									<Calendar className="h-4 w-4" /> Oct 20, 2026 • Kasarani
								</p>
								<Button
									variant="outline"
									className="w-full border-primary/20 hover:bg-primary/5"
								>
									View Tickets
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
