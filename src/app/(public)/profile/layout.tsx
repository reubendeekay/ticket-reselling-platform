"use client";

import Link from "next/link";
import {
	User,
	Ticket,
	ShoppingBag,
	Settings,
	LogOut,
	LayoutDashboard,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sidebarNavItems = [
	{
		title: "Overview",
		href: "/profile",
		icon: LayoutDashboard,
	},
	{
		title: "My Tickets",
		href: "/profile/tickets",
		icon: Ticket,
	},
	{
		title: "My Listings",
		href: "/profile/listings",
		icon: ShoppingBag,
	},
	{
		title: "Account Settings",
		href: "/profile/settings",
		icon: Settings,
	},
];

interface ProfileLayoutProps {
	children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
	const pathname = usePathname();

	return (
		<div className="container py-10">
			<div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
				<aside className="-mx-4 lg:w-1/5">
					<nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
						{sidebarNavItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									"flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors",
									pathname === item.href
										? "bg-muted text-primary font-bold"
										: "text-muted-foreground"
								)}
							>
								<item.icon className="h-4 w-4" />
								{item.title}
							</Link>
						))}
						<div className="my-2 border-t border-muted hidden lg:block" />
						<Button
							variant="ghost"
							className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50 text-sm font-medium"
						>
							<LogOut className="mr-2 h-4 w-4" /> Log out
						</Button>
					</nav>
				</aside>
				<div className="flex-1 lg:max-w-4xl">{children}</div>
			</div>
		</div>
	);
}
