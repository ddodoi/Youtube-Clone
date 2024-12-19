import { useState } from "react";
import { CategoryListProps } from "./types";
import { CATEGORIES } from "./constants";
import { CategoryListContainer, CategoryListWrapper, CategoryButton } from "./styles";

const CategoryList = ({ onCategoryChange, defaultSelected = "all" }: CategoryListProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>(defaultSelected);

    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategory(categoryId);
        onCategoryChange?.(categoryId);
    };

    return (
        <CategoryListContainer>
            <CategoryListWrapper>
                {CATEGORIES.map((category) => (
                    <CategoryButton
                        key={category.id}
                        $isSelected={category.id === selectedCategory}
                        onClick={() => handleCategoryClick(category.id)}
                    >
                        {category.name}
                    </CategoryButton>
                ))}
            </CategoryListWrapper>
        </CategoryListContainer>
    );
};

export default CategoryList;