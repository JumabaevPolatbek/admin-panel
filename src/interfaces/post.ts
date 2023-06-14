export interface Data {
    data: Post[];
    meta: Meta;
}

export interface Post {
    id: number;
    attributes: Attributes;
}

export interface Attributes {
    title_kk?: string;
    title_uz?: string;
    title_ru?: string;
    title_en?: string;
    content_kk?: string;
    content_uz?: string;
    content_ru?: string;
    content_en?: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    id: number;
}

export interface Meta {
    pagination: Pagination;
}

export interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}
