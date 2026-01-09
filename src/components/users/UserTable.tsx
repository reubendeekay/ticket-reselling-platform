"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { User, UserRole, UserStatus, VerificationStatus } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	MoreHorizontal,
	Eye,
	Edit,
	Ban,
	ShieldCheck,
	CheckCircle,
	XCircle,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

interface UserTableProps {
	data: User[];
}

export function UserTable({ data }: UserTableProps) {
	const getStatusVariant = (status: UserStatus) => {
		switch (status) {
			case "active":
				return "default";
			case "suspended":
				return "secondary";
			case "banned":
				return "destructive";
			default:
				return "outline";
		}
	};

	const getVerificationIcon = (status: VerificationStatus) => {
		if (status === "verified")
			return <CheckCircle className="h-4 w-4 text-green-500" />;
		if (status === "rejected")
			return <XCircle className="h-4 w-4 text-red-500" />;
		if (status === "pending")
			return <ShieldCheck className="h-4 w-4 text-amber-500" />;
		return null;
	};

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[50px]">
							<Checkbox />
						</TableHead>
						<TableHead>User</TableHead>
						<TableHead>Role</TableHead>
						<TableHead>Verification</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="text-right">Listings</TableHead>
						<TableHead className="text-right">Sales</TableHead>
						<TableHead className="text-right">Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((user) => (
						<TableRow key={user.id}>
							<TableCell>
								<Checkbox />
							</TableCell>
							<TableCell className="font-medium flex items-center gap-3">
								<Avatar className="h-9 w-9">
									<AvatarImage src={user.avatarUrl} alt={user.name} />
									<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
								</Avatar>
								<div className="flex flex-col">
									<span>{user.name}</span>
									<span className="text-xs text-muted-foreground">
										{user.email}
									</span>
								</div>
							</TableCell>
							<TableCell>
								<Badge variant="outline" className="capitalize">
									{user.role}
								</Badge>
							</TableCell>
							<TableCell>
								<div className="flex items-center gap-2">
									{getVerificationIcon(user.verificationStatus)}
									<span className="capitalize text-sm">
										{user.verificationStatus || "N/A"}
									</span>
								</div>
							</TableCell>
							<TableCell>
								<Badge
									variant={getStatusVariant(user.status)}
									className="capitalize"
								>
									{user.status}
								</Badge>
							</TableCell>
							<TableCell className="text-right">{user.totalListings}</TableCell>
							<TableCell className="text-right">{user.totalSales}</TableCell>
							<TableCell className="text-right">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" className="h-8 w-8 p-0">
											<span className="sr-only">Open menu</span>
											<MoreHorizontal className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>Actions</DropdownMenuLabel>
										<DropdownMenuItem asChild>
											<Link href={`/users/${user.id}`}>
												<Eye className="mr-2 h-4 w-4" /> View Details
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Edit className="mr-2 h-4 w-4" /> Edit Profile
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem className="text-destructive">
											<Ban className="mr-2 h-4 w-4" /> Ban User
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
