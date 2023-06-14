import { Authenticated, GitHubBanner, Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';

import {
    AuthPage,
    ErrorComponent,
    notificationProvider,
    ThemedLayoutV2,
} from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';

import routerBindings, {
    CatchAllNavigate,
    DocumentTitleHandler,
    NavigateToResource,
    UnsavedChangesNotifier,
} from '@refinedev/react-router-v6';
import { DataProvider } from '@refinedev/strapi-v4';
import {
    BlogPostCreate,
    BlogPostEdit,
    BlogPostList,
    BlogPostShow,
} from 'pages/blog-posts';
import {
    CategoryCreate,
    CategoryEdit,
    CategoryList,
    CategoryShow,
} from 'pages/categories';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { authProvider, axiosInstance } from './authProvider';
import { Header } from './components/header';
import { API_URL } from './constants';
import { ColorModeContextProvider } from './contexts/color-mode';

function App() {
    return (
        <BrowserRouter>
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <Refine
                        authProvider={authProvider}
                        dataProvider={DataProvider(
                            API_URL + `/api`,
                            axiosInstance
                        )}
                        notificationProvider={notificationProvider}
                        routerProvider={routerBindings}
                        resources={[
                            {
                                name: 'posts-plural',
                                list: '/blog-posts',
                                create: '/blog-posts/create',
                                edit: '/blog-posts/edit/:id',
                                show: '/blog-posts/show/:id',
                                meta: {
                                    canDelete: true,
                                },
                            },
                            {
                                name: 'pages-plural',
                                list: '/pages',
                                create: '/categories/create',
                                edit: '/categories/edit/:id',
                                show: '/categories/show/:id',
                                meta: {
                                    canDelete: true,
                                },
                            },
                        ]}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                    >
                        <Routes>
                            <Route
                                element={
                                    <Authenticated
                                        fallback={
                                            <CatchAllNavigate to="/login" />
                                        }
                                    >
                                        <ThemedLayoutV2
                                            Header={() => (
                                                <Header isSticky={true} />
                                            )}
                                        >
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route
                                    index
                                    element={
                                        <NavigateToResource resource="blog-posts" />
                                    }
                                />
                                <Route path="/blog-posts">
                                    <Route index element={<BlogPostList />} />
                                    <Route
                                        path="create"
                                        element={<BlogPostCreate />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<BlogPostEdit />}
                                    />
                                    <Route
                                        path="show/:id"
                                        element={<BlogPostShow />}
                                    />
                                </Route>
                                <Route path="/pages">
                                    <Route index element={<CategoryList />} />
                                    <Route
                                        path="create"
                                        element={<CategoryCreate />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<CategoryEdit />}
                                    />
                                    <Route
                                        path="show/:id"
                                        element={<CategoryShow />}
                                    />
                                </Route>
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                            <Route
                                element={
                                    <Authenticated fallback={<Outlet />}>
                                        <NavigateToResource />
                                    </Authenticated>
                                }
                            >
                                <Route
                                    path="/login"
                                    element={
                                        <AuthPage
                                            type="login"
                                            formProps={{
                                                initialValues: {
                                                    email: 'azamat@gmail.com',
                                                    password: 'Azamat2023',
                                                },
                                            }}
                                        />
                                    }
                                />
                                <Route
                                    path="/register"
                                    element={<AuthPage type="register" />}
                                />
                                <Route
                                    path="/forgot-password"
                                    element={<AuthPage type="forgotPassword" />}
                                />
                            </Route>
                        </Routes>

                        <RefineKbar />
                    </Refine>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
