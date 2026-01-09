"use client";

import { Bell, Search, Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export function Header() {
	const { setTheme, theme } = useTheme();
	const pathname = usePathname();
	const paths = pathname.split("/").filter(Boolean);

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex h-14 items-center px-6 gap-4">
				<div className="hidden md:flex">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href="/">Home</BreadcrumbLink>
							</BreadcrumbItem>
							{paths.map((path, index) => {
								const href = `/${paths.slice(0, index + 1).join("/")}`;
								const isLast = index === paths.length - 1;
								const title = path.charAt(0).toUpperCase() + path.slice(1);

								return (
									<div key={path} className="flex items-center">
										<BreadcrumbSeparator />
										<BreadcrumbItem>
											{isLast ? (
												<BreadcrumbPage>{title}</BreadcrumbPage>
											) : (
												<BreadcrumbLink href={href}>{title}</BreadcrumbLink>
											)}
										</BreadcrumbItem>
									</div>
								);
							})}
						</BreadcrumbList>
					</Breadcrumb>
				</div>

				<div className="flex-1 flex justify-center max-w-xl mx-auto">
					<div className="relative w-full">
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search events, users, listings..."
							className="pl-8 w-full"
						/>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="relative">
								<Bell className="h-5 w-5" />
								<Badge
									className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
									variant="destructive"
								>
									3
								</Badge>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-80">
							<DropdownMenuLabel>Notifications</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<div className="flex flex-col gap-1">
									<span className="font-medium">New Dispute Opened</span>
									<span className="text-xs text-muted-foreground">
										Order #12345 has a new dispute
									</span>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<div className="flex flex-col gap-1">
									<span className="font-medium">High Value Transaction</span>
									<span className="text-xs text-muted-foreground">
										KES 150,000 transaction detected
									</span>
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<Button
						variant="ghost"
						size="icon"
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
					>
						<Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
						<span className="sr-only">Toggle theme</span>
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="relative h-8 w-8 rounded-full">
								<Avatar className="h-8 w-8">
									<AvatarImage src="/admin-avatar.png" />
									<AvatarFallback>AD</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Log out</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
