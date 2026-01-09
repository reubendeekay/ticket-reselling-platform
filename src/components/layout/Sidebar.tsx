"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	LayoutDashboard,
	CalendarDays,
	Users,
	Ticket,
	CreditCard,
	BarChart3,
	Settings,
	ChevronDown,
	LogOut,
} from "lucide-react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
	const pathname = usePathname();
	const [openGroups, setOpenGroups] = useState<string[]>([
		"events",
		"users",
		"listings",
		"transactions",
	]);

	const toggleGroup = (group: string) => {
		setOpenGroups((prev) =>
			prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
		);
	};

	const menuItems = [
		{
			title: "Dashboard",
			href: "/admin",
			icon: LayoutDashboard,
		},
		{
			title: "Events",
			icon: CalendarDays,
			group: "events",
			items: [
				{ title: "All Events", href: "/admin/events" },
				{ title: "Create Event", href: "/admin/events/create" },
				{ title: "Venues", href: "/admin/events/venues" },
			],
		},
		{
			title: "Users",
			icon: Users,
			group: "users",
			items: [
				{ title: "All Users", href: "/admin/users" },
				{ title: "Verifications", href: "/admin/users/verifications" },
			],
		},
		{
			title: "Listings",
			icon: Ticket,
			group: "listings",
			items: [
				{ title: "All Listings", href: "/admin/listings" },
				{ title: "Flagged", href: "/admin/listings/flagged" },
				{ title: "Price Monitoring", href: "/admin/listings/price-monitoring" },
			],
		},
		{
			title: "Transactions",
			icon: CreditCard,
			group: "transactions",
			items: [
				{ title: "All Transactions", href: "/admin/transactions" },
				{ title: "Payouts", href: "/admin/transactions/payouts" },
				{ title: "Disputes", href: "/admin/transactions/disputes" },
			],
		},
		{
			title: "Analytics",
			href: "/admin/analytics",
			icon: BarChart3,
		},
		{
			title: "Settings",
			href: "/admin/settings",
			icon: Settings,
		},
	];

	return (
		<div
			className={cn(
				"pb-12 min-h-screen border-r bg-sidebar text-sidebar-foreground border-sidebar-border",
				className
			)}
		>
			<div className="space-y-4 py-4">
				<div className="px-3 py-2">
					<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight flex items-center">
						<Ticket className="mr-2 h-6 w-6 text-sidebar-primary" />
						TicketResell<span className="text-sidebar-primary">KE</span>
					</h2>
					<div className="space-y-1">
						<ScrollArea className="h-[calc(100vh-100px)] px-2">
							<div className="space-y-1 p-2">
								{menuItems.map((item) =>
									item.items ? (
										<Collapsible
											key={item.title}
											open={openGroups.includes(item.group || "")}
											onOpenChange={() => toggleGroup(item.group || "")}
											className="w-full"
										>
											<CollapsibleTrigger asChild>
												<Button
													variant="ghost"
													className="w-full justify-between hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
												>
													<span className="flex items-center">
														<item.icon className="mr-2 h-4 w-4" />
														{item.title}
													</span>
													<ChevronDown
														className={cn(
															"h-4 w-4 transition-transform",
															openGroups.includes(item.group || "")
																? ""
																: "-rotate-90"
														)}
													/>
												</Button>
											</CollapsibleTrigger>
											<CollapsibleContent className="space-y-1 ml-6 mt-1 border-l border-sidebar-border pl-2">
												{item.items.map((subItem) => (
													<Button
														key={subItem.title}
														asChild
														variant={
															pathname === subItem.href ? "secondary" : "ghost"
														}
														className={cn(
															"w-full justify-start h-8 text-sm",
															pathname === subItem.href
																? "bg-sidebar-accent text-sidebar-accent-foreground"
																: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
														)}
													>
														<Link href={subItem.href}>{subItem.title}</Link>
													</Button>
												))}
											</CollapsibleContent>
										</Collapsible>
									) : (
										<Button
											key={item.title}
											asChild
											variant={pathname === item.href ? "secondary" : "ghost"}
											className={cn(
												"w-full justify-start",
												pathname === item.href
													? "bg-sidebar-accent text-sidebar-accent-foreground"
													: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
											)}
										>
											<Link href={item.href}>
												<item.icon className="mr-2 h-4 w-4" />
												{item.title}
											</Link>
										</Button>
									)
								)}
							</div>
						</ScrollArea>
					</div>
				</div>
			</div>

			<div className="fixed bottom-0 w-[240px] border-t border-sidebar-border bg-sidebar p-4">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="w-full justify-start px-2">
							<Avatar className="h-8 w-8 mr-2">
								<AvatarImage src="/admin-avatar.png" />
								<AvatarFallback>AD</AvatarFallback>
							</Avatar>
							<div className="flex flex-col items-start">
								<span className="text-sm font-medium">Reuben</span>
								<span className="text-xs text-muted-foreground">
									Super Admin
								</span>
							</div>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56" align="end" forceMount>
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem className="text-destructive">
							<LogOut className="mr-2 h-4 w-4" />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
