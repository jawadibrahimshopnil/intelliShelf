import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import BorrowedBooks from "../pages/BorrowedBooks";
import CategorizedBooks from "../pages/CategorizedBooks";
import BookDetails from './../pages/BookDetails';
import AllBooks from "../pages/AllBooks";
import AddBook from "../pages/AddBook";
import PrivateRoute from "./PrivateRoute";
import UpdateBook from "../pages/UpdateBook";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: ()=>fetch("https://intellishelf-server.vercel.app/categories")
            },
            {
                path: '/addbook',
                element: <PrivateRoute><AddBook></AddBook></PrivateRoute>   
            },
            {
                path: '/updatebook/:id',
                element: <PrivateRoute><UpdateBook></UpdateBook></PrivateRoute>,
                loader: ({params})=>fetch(`https://intellishelf-server.vercel.app/book/${params.id}`, {credentials: 'include'})
            },
            {
                path: '/allbooks',
                element: <AllBooks></AllBooks>,
                loader: ()=>fetch("https://intellishelf-server.vercel.app/books")
            },
            {
                path: '/book/:id',
                element: <PrivateRoute><BookDetails></BookDetails></PrivateRoute>,
                loader: ({params}) => fetch(`https://intellishelf-server.vercel.app/book/${params.id}`, {credentials: 'include'})
            },
            {
                path: '/categories/:category',
                element: <CategorizedBooks></CategorizedBooks>,
                loader: ({params}) => fetch(`https://intellishelf-server.vercel.app/books?category=${params.category}`)
            },
            {
                path: '/borrowed',
                element: <PrivateRoute><BorrowedBooks></BorrowedBooks></PrivateRoute> 
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    },
]);

export default router;