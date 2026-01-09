"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
	return (
		<div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
			<div>
				<h2 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-primary to-purple-400">
					Settings
				</h2>
				<p className="text-muted-foreground text-lg">
					Manage platform configuration and preferences.
				</p>
			</div>

			<Tabs defaultValue="general" className="space-y-4">
				<TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0">
					<TabsTrigger
						value="general"
						className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground glass px-6 py-2 rounded-full border"
					>
						General
					</TabsTrigger>
					<TabsTrigger
						value="commission"
						className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground glass px-6 py-2 rounded-full border"
					>
						Commission
					</TabsTrigger>
					<TabsTrigger
						value="payment"
						className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground glass px-6 py-2 rounded-full border"
					>
						Payment
					</TabsTrigger>
					<TabsTrigger
						value="notifications"
						className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground glass px-6 py-2 rounded-full border"
					>
						Notifications
					</TabsTrigger>
					<TabsTrigger
						value="team"
						className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground glass px-6 py-2 rounded-full border"
					>
						Team
					</TabsTrigger>
				</TabsList>

				<TabsContent value="general" className="space-y-4">
					<Card className="glass">
						<CardHeader>
							<CardTitle>Details</CardTitle>
							<CardDescription>
								Basic information about the platform instance.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-2">
								<Label htmlFor="platform-name">Platform Name</Label>
								<Input
									id="platform-name"
									defaultValue="TicketResellKE"
									className="glass"
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="contact-email">Support Email</Label>
								<Input
									id="contact-email"
									defaultValue="support@ticketresell.co.ke"
									className="glass"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="currency">Currency</Label>
									<Select defaultValue="kes">
										<SelectTrigger id="currency" className="glass">
											<SelectValue placeholder="Select" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="kes">KES (Kenyan Shilling)</SelectItem>
											<SelectItem value="usd">USD (US Dollar)</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="timezone">Timezone</Label>
									<Select defaultValue="nairobi">
										<SelectTrigger id="timezone" className="glass">
											<SelectValue placeholder="Select" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="nairobi">
												Africa/Nairobi (GMT+3)
											</SelectItem>
											<SelectItem value="utc">UTC</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</CardContent>
						<CardFooter className="border-t px-6 py-4">
							<Button>Save Changes</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent value="commission" className="space-y-4">
					<Card className="glass">
						<CardHeader>
							<CardTitle>Commission Rates</CardTitle>
							<CardDescription>
								Adjust the fees charged on transactions.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-4">
								<div className="flex items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<Label className="text-base">Buyer Fee (%)</Label>
										<p className="text-sm text-muted-foreground">
											Percentage charged to the buyer
										</p>
									</div>
									<div className="w-[100px] flex items-center gap-2">
										<Input type="number" defaultValue="5" className="glass" />
										<span className="text-sm">%</span>
									</div>
								</div>
								<div className="flex items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<Label className="text-base">Seller Fee (%)</Label>
										<p className="text-sm text-muted-foreground">
											Percentage deducted from seller payout
										</p>
									</div>
									<div className="w-[100px] flex items-center gap-2">
										<Input type="number" defaultValue="5" className="glass" />
										<span className="text-sm">%</span>
									</div>
								</div>
							</div>
						</CardContent>
						<CardFooter className="border-t px-6 py-4">
							<Button>Update Rates</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent value="payment" className="space-y-4">
					<Card className="glass">
						<CardHeader>
							<CardTitle>M-Pesa Integration</CardTitle>
							<CardDescription>Configure Daraja API settings.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-2">
								<Label>Consumer Key</Label>
								<Input
									type="password"
									value="************************"
									className="glass"
								/>
							</div>
							<div className="grid gap-2">
								<Label>Consumer Secret</Label>
								<Input
									type="password"
									value="****************"
									className="glass"
								/>
							</div>
							<div className="flex items-center space-x-2">
								<Switch id="mpesa-live" />
								<Label htmlFor="mpesa-live">Live Mode</Label>
							</div>
						</CardContent>
						<CardFooter className="border-t px-6 py-4">
							<Button>Save Configuration</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent value="notifications" className="space-y-4">
					<Card className="glass">
						<CardHeader>
							<CardTitle>Email Notifications</CardTitle>
							<CardDescription>Manage system automated emails.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label className="text-base">New Registration Alert</Label>
									<p className="text-sm text-muted-foreground">
										Notify admins when a new user joins
									</p>
								</div>
								<Switch defaultChecked />
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label className="text-base">Dispute Created</Label>
									<p className="text-sm text-muted-foreground">
										Notify admins when a dispute is opened
									</p>
								</div>
								<Switch defaultChecked />
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label className="text-base">High Value Transaction</Label>
									<p className="text-sm text-muted-foreground">
										Alert for transactions over KES 50,000
									</p>
								</div>
								<Switch defaultChecked />
							</div>
						</CardContent>
						<CardFooter className="border-t px-6 py-4">
							<Button>Save Preferences</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
