import { Button } from "@/components/ui/button";
import { Music, LayoutGrid, Award, Dumbbell } from "lucide-react";

interface Category {
	id: string;
	name: string;
	icon: React.ReactNode;
}

const CATEGORIES: Category[] = [
	{ id: "all", name: "All", icon: <LayoutGrid className="h-4 w-4" /> },
	{ id: "music", name: "Music", icon: <Music className="h-4 w-4" /> },
	{ id: "sports", name: "Sports", icon: <Dumbbell className="h-4 w-4" /> },
	{ id: "arts", name: "Arts & Theater", icon: <Award className="h-4 w-4" /> }, // Using Award as placeholder
];

interface CategoryListProps {
	selected?: string;
	onSelect?: (id: string) => void;
}

export function CategoryList({
	selected = "all",
	onSelect,
}: CategoryListProps) {
	return (
		<div className="flex items-center space-x-2 overflow-x-auto pb-4 no-scrollbar">
			{CATEGORIES.map((cat) => (
				<Button
					key={cat.id}
					variant={selected === cat.id ? "default" : "outline"}
					className={`rounded-full whitespace-nowrap ${
						selected === cat.id
							? "bg-primary text-primary-foreground"
							: "border-primary/20 text-muted-foreground hover:text-primary hover:bg-primary/5"
					}`}
					onClick={() => onSelect && onSelect(cat.id)}
				>
					{cat.icon}
					<span className="ml-2">{cat.name}</span>
				</Button>
			))}
		</div>
	);
}
