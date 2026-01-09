"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Filter, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const CATEGORIES = [
	"Music",
	"Sports",
	"Conference",
	"Comedy",
	"Festival",
	"Theatre",
];
const CITIES = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"];

export function EventFilters() {
	const [date, setDate] = useState<Date | undefined>();
	const [priceRange, setPriceRange] = useState([0, 50000]);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold text-lg flex items-center">
					<Filter className="mr-2 h-4 w-4" /> Filters
				</h3>
				<Button variant="ghost" size="sm" className="h-8 text-muted-foreground">
					Reset
				</Button>
			</div>

			{/* Price Range */}
			<div className="space-y-4">
				<h4 className="font-medium text-sm">Price Range (KES)</h4>
				<Slider
					defaultValue={[0, 50000]}
					max={100000}
					step={1000}
					value={priceRange}
					onValueChange={setPriceRange}
					className="py-4"
				/>
				<div className="flex items-center justify-between text-xs text-muted-foreground">
					<span>{priceRange[0].toLocaleString()}</span>
					<span>{priceRange[1].toLocaleString()}+</span>
				</div>
			</div>

			{/* Date Picker */}
			<div className="space-y-2">
				<h4 className="font-medium text-sm">Date</h4>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={"outline"}
							className={cn(
								"w-full justify-start text-left font-normal",
								!date && "text-muted-foreground"
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{date ? format(date, "PPP") : <span>Pick a date</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							mode="single"
							selected={date}
							onSelect={setDate}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
			</div>

			{/* Categories */}
			<div className="space-y-3">
				<h4 className="font-medium text-sm">Categories</h4>
				<div className="space-y-2">
					{CATEGORIES.map((category) => (
						<div key={category} className="flex items-center space-x-2">
							<Checkbox id={`cat-${category}`} />
							<Label
								htmlFor={`cat-${category}`}
								className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								{category}
							</Label>
						</div>
					))}
				</div>
			</div>

			{/* Cities */}
			<div className="space-y-3">
				<h4 className="font-medium text-sm">City</h4>
				<div className="space-y-2">
					{CITIES.map((city) => (
						<div key={city} className="flex items-center space-x-2">
							<Checkbox id={`city-${city}`} />
							<Label
								htmlFor={`city-${city}`}
								className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								{city}
							</Label>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
