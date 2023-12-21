import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query"
import { createPost, createUserAccount, getRecentPosts, sighInAccount, signOutAccount } from "../appwrite/api"
import { INewPost, INewUser, IUpdatePost } from "@/types"
import { QUERY_KEYS } from "./queryKeys"

// creating user
export const useCreateUserAccount = () => {
  return useMutation ({
    mutationFn: (user: INewUser) => createUserAccount(user)
  })
}

// sign in account
export const useSignInAccount = () => {
  return useMutation ({
    mutationFn: (user: {
      email: string; 
      password: string;
    }) => sighInAccount(user),
  });
}

// sign out account
export const useSignOutAccount = () => {
  return useMutation ({
    mutationFn: signOutAccount
  });
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};