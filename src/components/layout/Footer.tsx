export function Footer() {
	return (
		<footer className="border-t bg-muted/40">
			<div className="container py-10 md:py-16">
				<div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
					<div className="col-span-2 lg:col-span-2">
						<h3 className="text-lg font-bold text-primary mb-4">
							TicketResellKE
						</h3>
						<p className="text-sm text-muted-foreground w-full md:w-2/3">
							Kenya's trusted marketplace to buy and sell authentic event
							tickets. Secure M-Pesa payments and buyer protection.
						</p>
						<div className="mt-6 flex space-x-4">
							{/* Social Icons would go here */}
						</div>
					</div>
					<div>
						<h4 className="text-sm font-semibold mb-4">Platform</h4>
						<ul className="space-y-3 text-sm text-muted-foreground">
							<li>Browse Events</li>
							<li>Sell Tickets</li>
							<li>How It Works</li>
							<li>Pricing</li>
						</ul>
					</div>
					<div>
						<h4 className="text-sm font-semibold mb-4">Support</h4>
						<ul className="space-y-3 text-sm text-muted-foreground">
							<li>Help Center</li>
							<li>Contact Us</li>
							<li>Safety Guidelines</li>
							<li>Terms of Service</li>
						</ul>
					</div>
					<div>
						<h4 className="text-sm font-semibold mb-4">Contact</h4>
						<p className="text-sm text-muted-foreground mb-2">Nairobi, Kenya</p>
						<p className="text-sm text-muted-foreground">
							support@ticketresell.co.ke
						</p>
					</div>
				</div>
				<div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center">
					<p className="text-xs text-muted-foreground">
						&copy; 2026 Ticket Resell Platform. Made with ❤️ in Kenya.
					</p>
				</div>
			</div>
		</footer>
	);
}
