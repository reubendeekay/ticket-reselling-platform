"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileSettingsPage() {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-3xl font-bold tracking-tight">Account Settings</h2>
				<p className="text-muted-foreground">Manage your account preferences</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Personal Information</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>First Name</Label>
							<Input defaultValue="Reuben" />
						</div>
						<div className="space-y-2">
							<Label>Last Name</Label>
							<Input defaultValue="Mwaura" />
						</div>
					</div>
					<div className="space-y-2">
						<Label>Email</Label>
						<Input defaultValue="reuben@example.com" />
					</div>
					<div className="space-y-2">
						<Label>Phone</Label>
						<Input defaultValue="+254 712 345 678" />
					</div>
					<Button>Save Changes</Button>
				</CardContent>
			</Card>
		</div>
	);
}
