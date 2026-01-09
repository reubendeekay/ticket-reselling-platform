export type UserRole = "admin" | "seller" | "buyer";
export type UserStatus = "active" | "suspended" | "banned";
export type VerificationStatus =
	| "verified"
	| "pending"
	| "rejected"
	| "unverified";

export interface User {
	id: string;
	name: string;
	email: string;
	phone: string;
	role: UserRole;
	verificationStatus: VerificationStatus;
	status: UserStatus;
	rating: number;
	joinDate: string; // ISO date
	avatarUrl?: string;
	// Metrics
	totalListings: number;
	totalSales: number;
	totalPurchases: number;
	revenue: number;
	commission: number;
}

export type EventStatus = "draft" | "published" | "cancelled" | "completed";

export interface TicketCategory {
	id: string;
	name: string;
	price: number;
	section?: string;
	maxMarkup: number; // percentage
}

export interface Event {
	id: string;
	name: string;
	category: string;
	date: string; // ISO date
	venue: string;
	city: string;
	capacity: number;
	status: EventStatus;
	description: string;
	posterImage: string;
	images: string[];
	organizer: string;
	ticketCategories: TicketCategory[];
	// Metrics
	listingsCount: number;
	soldCount: number;
	views: number;
	averageResalePrice: number;
	createdAt: string;
}

export type ListingStatus =
	| "active"
	| "sold"
	| "expired"
	| "flagged"
	| "removed";

export interface Listing {
	id: string;
	eventId: string;
	sellerId: string;
	ticketType: string; // References TicketCategory name or id
	quantity: number;
	price: number;
	originalPrice: number;
	markup: number; // percentage
	section?: string;
	seatNumbers?: string[];
	status: ListingStatus;
	images?: string[];
	views: number;
	favorites: number;
	createdAt: string;
	flagged: boolean;
	flagReason?: string;

	// Relations (populated for UI convenience)
	event?: Event;
	seller?: User;
}

export type TransactionStatus =
	| "pending"
	| "completed"
	| "failed"
	| "refunded"
	| "disputed"
	| "escrow";
export type PaymentMethod = "M-Pesa" | "Card" | "Airtel Money";
export type PayoutStatus = "pending" | "processed" | "failed";

export interface Transaction {
	id: string;
	eventId: string;
	listingId: string;
	buyerId: string;
	sellerId: string;
	amount: number;
	platformFee: number;
	sellerRevenue: number;
	paymentMethod: PaymentMethod;
	paymentReference: string;
	status: TransactionStatus;
	transactionDate: string;
	payoutStatus: PayoutStatus;

	// Relations
	event?: Event;
	buyer?: User;
	seller?: User;
}

export interface Dispute {
	id: string;
	transactionId: string;
	reason: string;
	status: "open" | "resolved" | "closed";
	createdAt: string;
	messages: {
		senderId: string;
		message: string;
		timestamp: string;
	}[];
}
