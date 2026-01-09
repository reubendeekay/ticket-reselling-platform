"use client";

import { useState } from "react";
import { users as initialUsers } from "@/data/mockData";
import { UserTable } from "@/components/users/UserTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Download, Search, Settings } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export default function UsersPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [roleFilter, setRoleFilter] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");

	const filteredUsers = initialUsers.filter((user) => {
		const matchesSearch =
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesRole = roleFilter === "all" || user.role === roleFilter;
		const matchesStatus =
			statusFilter === "all" || user.status === statusFilter;
		return matchesSearch && matchesRole && matchesStatus;
	});

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-4xl font-black tracking-tighter uppercase">
						Users
					</h2>
					<p className="text-muted-foreground font-medium mt-1">
						Manage users, sellers, and administrators.
					</p>
				</div>
				<Button variant="outline">
					<Download className="mr-2 h-4 w-4" /> Export
				</Button>
			</div>

			<div className="flex flex-col sm:flex-row gap-4 items-center justify-between glass p-4">
				<div className="flex items-center gap-2 w-full sm:w-auto flex-1">
					<div className="relative flex-1 max-w-sm">
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search users..."
							className="pl-8"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<Select value={roleFilter} onValueChange={setRoleFilter}>
						<SelectTrigger className="w-[150px]">
							<SelectValue placeholder="Role" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Roles</SelectItem>
							<SelectItem value="buyer">Buyer</SelectItem>
							<SelectItem value="seller">Seller</SelectItem>
							<SelectItem value="admin">Admin</SelectItem>
						</SelectContent>
					</Select>
					<Select value={statusFilter} onValueChange={setStatusFilter}>
						<SelectTrigger className="w-[150px]">
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Status</SelectItem>
							<SelectItem value="active">Active</SelectItem>
							<SelectItem value="suspended">Suspended</SelectItem>
							<SelectItem value="banned">Banned</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<Sheet>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon">
							<Settings className="h-4 w-4" />
						</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>View Settings</SheetTitle>
							<SheetDescription>
								Configure columns and display options.
							</SheetDescription>
						</SheetHeader>
						{/* Column toggle options would go here */}
					</SheetContent>
				</Sheet>
			</div>

			<UserTable data={filteredUsers} />
		</div>
	);
}
