"use client";

import { users } from "@/data/mockData";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, FileText, Phone } from "lucide-react";

export default function VerificationQueuePage() {
	const pendingUsers = users.filter((u) => u.verificationStatus === "pending");

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-3xl font-bold tracking-tight">
					Verification Queue
				</h2>
				<p className="text-muted-foreground">
					Review and approve seller verification requests.
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{pendingUsers.map((user) => (
					<Card key={user.id}>
						<CardHeader className="flex flex-row items-center gap-4 pb-2">
							<Avatar className="h-12 w-12">
								<AvatarImage src={user.avatarUrl} />
								<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
							</Avatar>
							<div>
								<CardTitle className="text-base">{user.name}</CardTitle>
								<CardDescription>{user.email}</CardDescription>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Phone className="h-4 w-4" />
								{user.phone}
								<Badge
									variant="outline"
									className="ml-auto text-yellow-600 border-yellow-600"
								>
									Pending
								</Badge>
							</div>

							<div className="rounded-md border p-4">
								<div className="flex items-center gap-2 mb-2">
									<FileText className="h-4 w-4" />
									<span className="font-medium text-sm">
										Submitted Documents
									</span>
								</div>
								<div className="grid grid-cols-2 gap-2">
									<div className="aspect-video bg-muted rounded flex items-center justify-center text-xs text-muted-foreground cursor-pointer hover:bg-muted/80">
										ID Front
									</div>
									<div className="aspect-video bg-muted rounded flex items-center justify-center text-xs text-muted-foreground cursor-pointer hover:bg-muted/80">
										ID Back
									</div>
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex justify-between gap-2">
							<Button
								variant="outline"
								className="w-full text-destructive hover:bg-destructive/10"
							>
								<X className="mr-2 h-4 w-4" /> Reject
							</Button>
							<Button className="w-full bg-green-600 hover:bg-green-700">
								<Check className="mr-2 h-4 w-4" /> Approve
							</Button>
						</CardFooter>
					</Card>
				))}
				{pendingUsers.length === 0 && (
					<div className="col-span-full text-center py-12 text-muted-foreground">
						No pending verifications
					</div>
				)}
			</div>
		</div>
	);
}
