import {
	User,
	Event,
	Listing,
	Transaction,
	UserRole,
	UserStatus,
	VerificationStatus,
	EventStatus,
	ListingStatus,
	TransactionStatus,
	PaymentMethod,
	PayoutStatus,
	TicketCategory,
} from "@/types";
import { addDays, subDays, format } from "date-fns";

// Helper to get random item from array
const random = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
// Helper for random number
const randomInt = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1)) + min;
// Helper for random date within range
const randomDate = (start: Date, end: Date) =>
	new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	).toISOString();

// Kenyan Data
const firstNames = [
	"James",
	"John",
	"Mary",
	"Elizabeth",
	"Peter",
	"Joseph",
	"David",
	"Samuel",
	"Grace",
	"Faith",
	"Esther",
	"Mercy",
	"Brian",
	"Kevin",
	"Dennis",
	"Ian",
	"Wanjiku",
	"Kamau",
	"Otieno",
	"Achieng",
	"Njoroge",
	"Maina",
	"Kipchoge",
	"Chebet",
	"Omollo",
];
const lastNames = [
	"Mwangi",
	"Maina",
	"Kamau",
	"Otieno",
	"Kariuki",
	"Njeri",
	"Wanjiku",
	"Odhiambo",
	"Ochieng",
	"Kiptoo",
	"Kimani",
	"Nyambura",
	"Mutua",
	"Njoroge",
	"Waweru",
	"Koech",
	"Cheruiyot",
	"Rotich",
	"Juma",
	"Owuor",
];
const cities = [
	"Nairobi",
	"Mombasa",
	"Kisumu",
	"Nakuru",
	"Eldoret",
	"Thika",
	"Malindi",
	"Kitale",
	"Garissa",
	"Kakamega",
];
const venues = [
	{ name: "Kasarani Stadium", city: "Nairobi", capacity: 60000 },
	{ name: "Nyayo National Stadium", city: "Nairobi", capacity: 30000 },
	{ name: "KICC", city: "Nairobi", capacity: 5000 },
	{ name: "Carnivore Grounds", city: "Nairobi", capacity: 4000 },
	{ name: "Uhuru Gardens", city: "Nairobi", capacity: 10000 },
	{ name: "Sarit Expo Centre", city: "Nairobi", capacity: 2000 },
	{ name: "Mombasa Sports Club", city: "Mombasa", capacity: 3000 },
	{ name: "Jomo Kenyatta Sports Ground", city: "Kisumu", capacity: 5000 },
	{ name: "Afraha Stadium", city: "Nakuru", capacity: 8000 },
];

const eventCategories = [
	"Music",
	"Sports",
	"Conference",
	"Comedy",
	"Festival",
	"Workshop",
	"Theatre",
];
const eventNames = [
	"Sauti Sol Final Tour",
	"Nairobi Fashion Week",
	"Safari Sevens",
	"Churchill Show Live",
	"Blankets and Wine",
	"Koroga Festival",
	"Tech Summit Kenya",
	"Magical Kenya Open",
	"Tusker Oktobafest",
	"Jazz Festival",
	"Nairobi Burger Festival",
	"WRC Safari Rally",
	"Mugithi Night",
	"Luo Festival",
	"Rhumba Night",
	"Afro-Fusion Concert",
];

// Generate Users
export const users: User[] = Array.from({ length: 60 }).map((_, i) => {
	const firstName = random(firstNames);
	const lastName = random(lastNames);
	const role = i < 5 ? "admin" : Math.random() > 0.7 ? "seller" : "buyer";

	return {
		id: `u-${i + 1}`,
		name: `${firstName} ${lastName}`,
		email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
		phone: `+2547${randomInt(10, 99)}${randomInt(100000, 999999)}`,
		role: role as UserRole,
		verificationStatus:
			role === "seller"
				? (random([
						"verified",
						"pending",
						"unverified",
						"rejected",
				  ]) as VerificationStatus)
				: "unverified",
		status: random([
			"active",
			"active",
			"active",
			"suspended",
			"banned",
		]) as UserStatus,
		rating: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
		joinDate: randomDate(subDays(new Date(), 365), new Date()),
		avatarUrl: `https://i. Pravatar.cc/150?u=${i}`,
		totalListings: role === "seller" ? randomInt(0, 50) : 0,
		totalSales: role === "seller" ? randomInt(0, 200) : 0,
		totalPurchases: randomInt(0, 20),
		revenue: role === "seller" ? randomInt(0, 500000) : 0,
		commission: role === "seller" ? randomInt(0, 50000) : 0,
	};
});

// Generate Events
export const events: Event[] = Array.from({ length: 25 }).map((_, i) => {
	const venue = random(venues);
	const category = random(eventCategories);
	const status = random([
		"published",
		"published",
		"published",
		"draft",
		"cancelled",
		"completed",
	]) as EventStatus;
	const date = randomDate(subDays(new Date(), 30), addDays(new Date(), 90));

	const ticketPrices = [1500, 2500, 5000, 10000, 15000];
	const cats: TicketCategory[] = [
		{
			id: `tc-${i}-1`,
			name: "Regular",
			price: random(ticketPrices),
			section: "General Admission",
			maxMarkup: 20,
		},
		{
			id: `tc-${i}-2`,
			name: "VIP",
			price: random(ticketPrices) * 2,
			section: "VIP Deck",
			maxMarkup: 30,
		},
	];
	if (Math.random() > 0.5) {
		cats.push({
			id: `tc-${i}-3`,
			name: "VVIP",
			price: random(ticketPrices) * 4,
			section: "Golden Circle",
			maxMarkup: 50,
		});
	}

	return {
		id: `e-${i + 1}`,
		name: random(eventNames) + " " + (2024 + Math.floor(i / 10)),
		category,
		date,
		venue: venue.name,
		city: venue.city,
		capacity: venue.capacity,
		status,
		description: `Experience the thrill of ${category} at ${venue.name}. Get your tickets now used!`,
		posterImage: `/placeholder-event.jpg`, // Placeholder
		images: [],
		organizer:
			users.find((u) => u.role === "admin" || u.role === "seller")?.name ||
			"Organizer",
		ticketCategories: cats,
		listingsCount: randomInt(10, 200),
		soldCount: randomInt(50, 2000),
		views: randomInt(1000, 50000),
		averageResalePrice: randomInt(2000, 20000),
		createdAt: subDays(new Date(), randomInt(30, 100)).toISOString(),
	};
});

// Generate Listings
export const listings: Listing[] = Array.from({ length: 150 }).map((_, i) => {
	const event = random(events);
	const seller = random(
		users.filter((u) => u.role === "seller" || u.role === "buyer")
	);
	const category = random(event.ticketCategories);
	const originalPrice = category.price;
	const markup = randomInt(0, category.maxMarkup);
	const price = Math.floor(originalPrice * (1 + markup / 100));

	return {
		id: `l-${i + 1}`,
		eventId: event.id,
		sellerId: seller.id,
		ticketType: category.name,
		quantity: randomInt(1, 5),
		price,
		originalPrice,
		markup,
		section: category.section,
		status: random([
			"active",
			"active",
			"sold",
			"sold",
			"expired",
			"removed",
		]) as ListingStatus,
		views: randomInt(10, 500),
		favorites: randomInt(0, 50),
		createdAt: randomDate(new Date(event.createdAt), new Date()),
		flagged: Math.random() > 0.9,
		flagReason: Math.random() > 0.9 ? "Suspicious pricing" : undefined,
		event,
		seller,
	};
});

// Generate Transactions
export const transactions: Transaction[] = Array.from({ length: 100 }).map(
	(_, i) => {
		const listing = random(
			listings.filter((l) => l.status === "sold" || l.status === "active")
		); // Allow random listings to have history
		const buyer = random(users.filter((u) => u.id !== listing.sellerId));
		const amount = listing.price * randomInt(1, listing.quantity);
		const fee = Math.floor(amount * 0.1); // 10% fee

		const status = random([
			"completed",
			"completed",
			"pending",
			"escrow",
			"refunded",
			"disputed",
		]) as TransactionStatus;

		return {
			id: `tx-${i + 1}`,
			eventId: listing.eventId,
			listingId: listing.id,
			buyerId: buyer.id,
			sellerId: listing.sellerId,
			amount,
			platformFee: fee,
			sellerRevenue: amount - fee,
			paymentMethod: random([
				"M-Pesa",
				"Card",
				"Airtel Money",
			]) as PaymentMethod,
			paymentReference: `${random(["MP", "CD", "AM"])}${randomInt(
				10000000,
				99999999
			)}`,
			status,
			transactionDate: randomDate(new Date(listing.createdAt), new Date()),
			payoutStatus:
				status === "completed"
					? (random(["processed", "pending"]) as PayoutStatus)
					: "pending",
			event: listing.event,
			buyer,
			seller: listing.seller,
		};
	}
);

// Analytics Data Helper
export const getRevenueData = () => {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	return months.map((month) => ({
		name: month,
		revenue: randomInt(100000, 1000000),
		commission: randomInt(10000, 100000),
	}));
};

export const getCategoryData = () => {
	return eventCategories.map((cat) => ({
		name: cat,
		value: randomInt(10, 100),
	}));
};
