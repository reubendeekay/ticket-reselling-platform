import {
	DashboardStats,
	DashboardCharts,
	RecentTransactions,
	TopEvents,
} from "@/components/dashboard/components";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Home() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
				<div className="flex items-center space-x-2">
					<Button size="sm" variant="outline">
						<Download className="mr-2 h-4 w-4" />
						Download Report
					</Button>
				</div>
			</div>

			<DashboardStats />
			<DashboardCharts />

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<RecentTransactions />
				<TopEvents />
			</div>
		</div>
	);
}
