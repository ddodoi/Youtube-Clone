export interface CategoryItemType {
    id: string;
    name: string;
}

export interface CategoryListProps {
    onCategoryChange?: (category: string) => void;
    defaultSelected?: string;
}
