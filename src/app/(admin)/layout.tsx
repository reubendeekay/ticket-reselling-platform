import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-screen bg-background text-foreground">
			<Sidebar className="w-64 hidden md:block fixed h-screen z-30" />
			<div className="flex-1 md:ml-64 flex flex-col min-h-screen">
				<Header />
				<main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 space-y-6">
					{children}
				</main>
			</div>
		</div>
	);
}
