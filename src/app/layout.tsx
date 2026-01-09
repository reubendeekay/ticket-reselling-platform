import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "TicketResellKE Admin",
	description: "Admin dashboard for Kenya's premier ticket reselling platform",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="flex min-h-screen bg-background text-foreground">
						<Sidebar className="w-64 hidden md:block fixed h-screen z-30" />
						<div className="flex-1 md:ml-64 flex flex-col min-h-screen">
							<Header />
							<main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 space-y-6">
								{children}
							</main>
						</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
