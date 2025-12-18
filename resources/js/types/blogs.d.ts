import { User } from '.';

export interface IBlogCategory {
    id: number;
    name: string;
    slug: string;
    image: string;
    status: boolean;
    created_at: string;
    updated_at: string;
}

export interface IBlog {
    id: number;
    title: string;
    slug: string;
    description: string;
    excerpt: string;
    image: string;
    tags?: string;
    tagArray?: string[];
    status: boolean;
    created_at: string;
    updated_at: string;
    category?: IBlogCategory;
    blog_category_id?: number;
    author?: User;
    // category_id: number;
    // author_id: number;
}
