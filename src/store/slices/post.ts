import {
	createApi,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
	reducerPath: 'postApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://api.nukusii.uz/api',
	}),
	tagTypes: ['posts-plural'],
	endpoints: (builder) => ({
		getPosts: builder.query<any, any>({
			query: (name) => `pokemon/${name}`,
		}),
	}),
});

export const { useGetPostsQuery } = postApi;

