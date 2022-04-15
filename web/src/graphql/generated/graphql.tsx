import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Course = {
  __typename?: 'Course';
  id: Scalars['ID'];
  slug: Scalars['String'];
  title: Scalars['String'];
};

export type CreateCourseInput = {
  title: Scalars['String'];
};

export type CreateEnrollmentInput = {
  course_id: Scalars['String'];
};

export type CreateProductInput = {
  title: Scalars['String'];
};

export type CreatePurchaseInput = {
  product_id: Scalars['String'];
};

export type Enrollment = {
  __typename?: 'Enrollment';
  canceled_at?: Maybe<Scalars['DateTime']>;
  course: Course;
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  student: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCourse: Course;
  createEnrollment: Enrollment;
  createProduct: Product;
  createPurchase: Purchase;
};


export type MutationCreateCourseArgs = {
  data: CreateCourseInput;
};


export type MutationCreateEnrollmentArgs = {
  data: CreateEnrollmentInput;
};


export type MutationCreateProductArgs = {
  data: CreateProductInput;
};


export type MutationCreatePurchaseArgs = {
  data: CreatePurchaseInput;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  slug: Scalars['String'];
  title: Scalars['String'];
};

/** Available purchase statuses */
export enum PuchaseStatus {
  Approved = 'APPROVED',
  Failed = 'FAILED',
  Pending = 'PENDING'
}

export type Purchase = {
  __typename?: 'Purchase';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  product: Product;
  status: PuchaseStatus;
};

export type Query = {
  __typename?: 'Query';
  Enrollments: Array<Enrollment>;
  course: Course;
  courses: Array<Course>;
  me: User;
  products: Array<Product>;
  purchases: Array<Purchase>;
};


export type QueryCourseArgs = {
  course_id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  auth_user_id: Scalars['ID'];
  enrollments: Array<Enrollment>;
  purchases: Array<Purchase>;
};

export type CreatePurchaseMutationVariables = Exact<{
  product_id: Scalars['String'];
}>;


export type CreatePurchaseMutation = { __typename?: 'Mutation', createPurchase: { __typename?: 'Purchase', id: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', enrollments: Array<{ __typename?: 'Enrollment', id: string, created_at: any, course: { __typename?: 'Course', title: string, slug: string } }> } };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, title: string, slug: string }> };


export const CreatePurchaseDocument = gql`
    mutation CreatePurchase($product_id: String!) {
  createPurchase(data: {product_id: $product_id}) {
    id
  }
}
    `;
export type CreatePurchaseMutationFn = Apollo.MutationFunction<CreatePurchaseMutation, CreatePurchaseMutationVariables>;

/**
 * __useCreatePurchaseMutation__
 *
 * To run a mutation, you first call `useCreatePurchaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePurchaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPurchaseMutation, { data, loading, error }] = useCreatePurchaseMutation({
 *   variables: {
 *      product_id: // value for 'product_id'
 *   },
 * });
 */
export function useCreatePurchaseMutation(baseOptions?: Apollo.MutationHookOptions<CreatePurchaseMutation, CreatePurchaseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePurchaseMutation, CreatePurchaseMutationVariables>(CreatePurchaseDocument, options);
      }
export type CreatePurchaseMutationHookResult = ReturnType<typeof useCreatePurchaseMutation>;
export type CreatePurchaseMutationResult = Apollo.MutationResult<CreatePurchaseMutation>;
export type CreatePurchaseMutationOptions = Apollo.BaseMutationOptions<CreatePurchaseMutation, CreatePurchaseMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    enrollments {
      id
      created_at
      course {
        title
        slug
      }
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetProductsDocument = gql`
    query GetProducts {
  products {
    id
    title
    slug
  }
}
    `;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;