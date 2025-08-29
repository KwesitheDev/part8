import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
    mutation AddBook(
        $title: String!, 
        $Author: String!, 
        $published: Int!, 
        $genres: [String!]!) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            title
            author
            published
            genres
        }
    }
`