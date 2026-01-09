"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus, Trash, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const ticketCategorySchema = z.object({
	name: z.string().min(1, "Name is required"),
	originalPrice: z.coerce.number().min(0, "Price must be positive"),
	section: z.string().optional(),
	maxMarkup: z.coerce.number().min(0).max(100, "Max markup cannot exceed 100%"),
});

const formSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	category: z.string().min(1, "Category is required"),
	date: z.date({
		required_error: "Date is required",
	}),
	venue: z.string().min(1, "Venue is required"),
	status: z.enum(["draft", "published"]),
	description: z.string().optional(),
	posterImage: z.any().optional(), // In a real app, refine this
	ticketCategories: z
		.array(ticketCategorySchema)
		.min(1, "At least one ticket category is required"),
	organizer: z.string().min(1, "Organizer name is required"),
	commissionRate: z.coerce.number().min(0).max(100).default(10),
	revenueSharing: z.boolean().default(false),
	featured: z.boolean().default(false),
	terms: z.string().optional(),
});

type EventFormValues = z.infer<typeof formSchema>;

export function EventForm() {
	const form = useForm<EventFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			category: "",
			venue: "",
			status: "draft",
			description: "",
			ticketCategories: [
				{
					name: "Regular",
					originalPrice: 1000,
					section: "General",
					maxMarkup: 20,
				},
			],
			organizer: "",
			commissionRate: 10,
			revenueSharing: false,
			featured: false,
			terms: "",
		},
	});

	const { fields, append, remove } = useFieldArray({
		name: "ticketCategories",
		control: form.control,
	});

	function onSubmit(data: EventFormValues) {
		console.log(data);
		// In a real app, submit to API
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{/* Basic Info */}
				<Card>
					<CardHeader>
						<CardTitle>Basic Information</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-6 md:grid-cols-2">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Event Name</FormLabel>
									<FormControl>
										<Input placeholder="e.g. Sauti Sol Final Tour" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a category" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="music">Music</SelectItem>
											<SelectItem value="sports">Sports</SelectItem>
											<SelectItem value="conference">Conference</SelectItem>
											<SelectItem value="comedy">Comedy</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Date of Event</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-full pl-3 text-left font-normal",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														format(field.value, "PPP")
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) => date < new Date()}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="venue"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Venue</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select venue" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="Kasarani Stadium">
												Kasarani Stadium
											</SelectItem>
											<SelectItem value="KICC">KICC</SelectItem>
											<SelectItem value="Carnivore">Carnivore</SelectItem>
										</SelectContent>
									</Select>
									<FormDescription className="text-xs">
										Or add a new venue in settings
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>

				{/* Description & Media */}
				<Card>
					<CardHeader>
						<CardTitle>Description & Media</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Tell people what your event is about..."
											className="resize-y"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
							<Upload className="h-8 w-8 mb-2 text-muted-foreground" />
							<p className="text-sm font-medium">Upload Poster Image</p>
							<p className="text-xs text-muted-foreground">
								Drag & drop or click to upload
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Ticket Categories */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle>Ticket Categories</CardTitle>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() =>
								append({
									name: "",
									originalPrice: 0,
									section: "",
									maxMarkup: 20,
								})
							}
						>
							<Plus className="mr-2 h-4 w-4" />
							Add Category
						</Button>
					</CardHeader>
					<CardContent className="space-y-4">
						{fields.map((field, index) => (
							<div
								key={field.id}
								className="flex gap-4 items-end border p-4 rounded-lg bg-muted/20"
							>
								<FormField
									control={form.control}
									name={`ticketCategories.${index}.name`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Category Name</FormLabel>
											<FormControl>
												<Input placeholder="VIP" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`ticketCategories.${index}.originalPrice`}
									render={({ field }) => (
										<FormItem className="w-[120px]">
											<FormLabel>Price (KES)</FormLabel>
											<FormControl>
												<Input type="number" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`ticketCategories.${index}.maxMarkup`}
									render={({ field }) => (
										<FormItem className="w-[120px]">
											<FormLabel>Max Markup %</FormLabel>
											<FormControl>
												<Input type="number" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									type="button"
									variant="metric"
									size="icon"
									className="bg-red-100 hover:bg-red-200 text-red-600 mb-[2px]"
									onClick={() => remove(index)}
								>
									<Trash className="h-4 w-4" />
								</Button>
							</div>
						))}
					</CardContent>
				</Card>

				{/* Additional Settings */}
				<Card>
					<CardHeader>
						<CardTitle>Settings</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-6 md:grid-cols-2">
						<FormField
							control={form.control}
							name="organizer"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Organizer Name</FormLabel>
									<FormControl>
										<Input placeholder="e.g. Sauti Sol" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="featured"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<FormLabel className="text-base">Featured Event</FormLabel>
										<FormDescription>
											Display prominently on home page
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="revenueSharing"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<FormLabel className="text-base">Revenue Sharing</FormLabel>
										<FormDescription>
											Enable splitting revenue with partners
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Listing Status</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select status" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="draft">Draft (Hidden)</SelectItem>
											<SelectItem value="published">
												Published (Visible)
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>

				<div className="flex justify-end gap-4 pb-12">
					<Button variant="ghost" type="button">
						Cancel
					</Button>
					<Button type="submit">Publish Event</Button>
				</div>
			</form>
		</Form>
	);
}
