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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
			<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
				<div>
					<h2 className="text-4xl font-black tracking-tighter uppercase">
						Settings
					</h2>
					<p className="text-muted-foreground mt-1 text-lg font-medium">
						Manage platform configuration and preferences.
					</p>
				</div>
			</div>

			<Tabs defaultValue="general" className="space-y-6">
				<TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0">
					<TabsTrigger
						value="general"
						className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground neo-border bg-white px-6 py-2.5 font-bold uppercase tracking-wider transition-all data-[state=active]:neo-shadow hover:translate-y-[-2px] hover:neo-shadow-sm"
					>
						General
					</TabsTrigger>
					<TabsTrigger
						value="commission"
						className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground neo-border bg-white px-6 py-2.5 font-bold uppercase tracking-wider transition-all data-[state=active]:neo-shadow hover:translate-y-[-2px] hover:neo-shadow-sm"
					>
						Commission
					</TabsTrigger>
					<TabsTrigger
						value="payment"
						className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground neo-border bg-white px-6 py-2.5 font-bold uppercase tracking-wider transition-all data-[state=active]:neo-shadow hover:translate-y-[-2px] hover:neo-shadow-sm"
					>
						Payment
					</TabsTrigger>
					<TabsTrigger
						value="notifications"
						className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground neo-border bg-white px-6 py-2.5 font-bold uppercase tracking-wider transition-all data-[state=active]:neo-shadow hover:translate-y-[-2px] hover:neo-shadow-sm"
					>
						Notifications
					</TabsTrigger>
					<TabsTrigger
						value="team"
						className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground neo-border bg-white px-6 py-2.5 font-bold uppercase tracking-wider transition-all data-[state=active]:neo-shadow hover:translate-y-[-2px] hover:neo-shadow-sm"
					>
						Team
					</TabsTrigger>
				</TabsList>

				<TabsContent value="general" className="space-y-4">
					<Card className="glass border-l-4 border-l-primary">
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
									className="bg-background/50"
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="contact-email">Support Email</Label>
								<Input
									id="contact-email"
									defaultValue="support@ticketresell.co.ke"
									className="bg-background/50"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="currency">Currency</Label>
									<Select defaultValue="kes">
										<SelectTrigger id="currency" className="bg-background/50">
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
										<SelectTrigger id="timezone" className="bg-background/50">
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
						<CardFooter className="border-t px-6 py-4 bg-muted/20">
							<Button>Save Changes</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent value="commission" className="space-y-4">
					<Card className="glass border-l-4 border-l-purple-500">
						<CardHeader>
							<CardTitle>Commission Rates</CardTitle>
							<CardDescription>
								Adjust the fees charged on transactions.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-4">
								<div className="flex items-center justify-between rounded-lg border bg-background/50 p-4">
									<div className="space-y-0.5">
										<Label className="text-base">Buyer Fee (%)</Label>
										<p className="text-sm text-muted-foreground">
											Percentage charged to the buyer
										</p>
									</div>
									<div className="w-[100px] flex items-center gap-2">
										<Input
											type="number"
											defaultValue="5"
											className="bg-background"
										/>
										<span className="text-sm font-medium">%</span>
									</div>
								</div>
								<div className="flex items-center justify-between rounded-lg border bg-background/50 p-4">
									<div className="space-y-0.5">
										<Label className="text-base">Seller Fee (%)</Label>
										<p className="text-sm text-muted-foreground">
											Percentage deducted from seller payout
										</p>
									</div>
									<div className="w-[100px] flex items-center gap-2">
										<Input
											type="number"
											defaultValue="5"
											className="bg-background"
										/>
										<span className="text-sm font-medium">%</span>
									</div>
								</div>
							</div>
						</CardContent>
						<CardFooter className="border-t px-6 py-4 bg-muted/20">
							<Button>Update Rates</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent value="payment" className="space-y-4">
					<Card className="glass border-l-4 border-l-green-500">
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
									className="bg-background/50 font-mono"
								/>
							</div>
							<div className="grid gap-2">
								<Label>Consumer Secret</Label>
								<Input
									type="password"
									value="****************"
									className="bg-background/50 font-mono"
								/>
							</div>
							<div className="flex items-center space-x-2 rounded-lg border bg-background/50 p-4">
								<Switch id="mpesa-live" />
								<Label htmlFor="mpesa-live" className="text-base">
									Live Mode
								</Label>
							</div>
						</CardContent>
						<CardFooter className="border-t px-6 py-4 bg-muted/20">
							<Button>Save Configuration</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent value="notifications" className="space-y-4">
					<Card className="glass border-l-4 border-l-amber-500">
						<CardHeader>
							<CardTitle>Email Notifications</CardTitle>
							<CardDescription>Manage system automated emails.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between rounded-lg border bg-background/50 p-4">
								<div className="space-y-0.5">
									<Label className="text-base">New Registration Alert</Label>
									<p className="text-sm text-muted-foreground">
										Notify admins when a new user joins
									</p>
								</div>
								<Switch defaultChecked />
							</div>
							<div className="flex items-center justify-between rounded-lg border bg-background/50 p-4">
								<div className="space-y-0.5">
									<Label className="text-base">Dispute Created</Label>
									<p className="text-sm text-muted-foreground">
										Notify admins when a dispute is opened
									</p>
								</div>
								<Switch defaultChecked />
							</div>
							<div className="flex items-center justify-between rounded-lg border bg-background/50 p-4">
								<div className="space-y-0.5">
									<Label className="text-base">High Value Transaction</Label>
									<p className="text-sm text-muted-foreground">
										Alert for transactions over KES 50,000
									</p>
								</div>
								<Switch defaultChecked />
							</div>
						</CardContent>
						<CardFooter className="border-t px-6 py-4 bg-muted/20">
							<Button>Save Preferences</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
