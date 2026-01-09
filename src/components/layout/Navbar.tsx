import Link from "next/link";
import { Search, Menu, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Navbar() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center">
				<Link href="/" className="mr-6 flex items-center space-x-2">
					<span className="text-xl font-bold text-primary">TicketResellKE</span>
				</Link>
				<div className="hidden md:flex md:flex-1 md:items-center md:space-x-4">
					<nav className="flex items-center space-x-6 text-sm font-medium">
						<Link
							href="/events"
							className="transition-colors hover:text-foreground/80 text-foreground/60"
						>
							Browse Events
						</Link>
						<Link
							href="/sell"
							className="transition-colors hover:text-foreground/80 text-foreground/60"
						>
							Sell Tickets
						</Link>
						<Link
							href="/how-it-works"
							className="transition-colors hover:text-foreground/80 text-foreground/60"
						>
							How It Works
						</Link>
					</nav>
				</div>
				<div className="flex flex-1 items-center justify-end space-x-4">
					<div className="w-full max-w-[200px] lg:max-w-[300px] relative hidden lg:block">
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input placeholder="Search events..." className="pl-8 h-9" />
					</div>
					<nav className="flex items-center space-x-2">
						<Button variant="ghost" size="icon">
							<ShoppingCart className="h-5 w-5" />
							<span className="sr-only">Cart</span>
						</Button>
						<Button variant="ghost" size="icon">
							<User className="h-5 w-5" />
							<span className="sr-only">Account</span>
						</Button>
						<Button variant="ghost" size="icon" className="md:hidden">
							<Menu className="h-5 w-5" />
							<span className="sr-only">Menu</span>
						</Button>
					</nav>
				</div>
			</div>
		</header>
	);
}
