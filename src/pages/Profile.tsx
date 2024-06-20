import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import NotFound from "../components/NotFound";
import ErrorComponent from "../components/reusable/ErrorComponent";
import Loading from "../components/reusable/Loading";
import PostGrid from "../components/reusable/PostGrid";
import UserDetails from "../components/reusable/UserDetails";
import { useModalContext } from "../context/ModalContext";
import { ActiveModal, PostResult, UserResult } from "../types";
import { getCookie } from "../utils/token";

const Profile = () => {
  const token = getCookie("token");
  const { setShowModal } = useModalContext();

  useEffect(() => {
    if (!token) {
      setShowModal(ActiveModal.login);
    }
  }, [token, setShowModal]);

  const {
    isLoading: userLoading,
    error: userError,
    data: userData,
  } = useQuery<UserResult>({
    enabled: !!token,
    queryKey: ["profile"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API}/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (!res.ok) {
          throw Error("An Error has occured");
        }
        return res.json();
      }),
  });

  const {
    isLoading: isPostLoading,
    error: postError,
    data: postsData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<PostResult>({
    enabled: !!token,
    queryKey: ["profilePosts"],
    queryFn: ({ pageParam }) =>
      fetch(
        `${import.meta.env.VITE_API}/me/posts?page=${pageParam}&pageSize=12`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ).then((res) => res.json()),
    getNextPageParam: (lastPage) => {
      if (
        !lastPage.pagination.totalPages ||
        lastPage.pagination.totalPages === lastPage.pagination.page
      ) {
        return undefined;
      }
      return lastPage.pagination.page + 1;
    },
    initialPageParam: 1,
  });

  if (userLoading) return <Loading />;

  if (userError || postError) return <ErrorComponent />;

  if (!userData || !postsData) return <NotFound />;

  const user = userData.data;
  const posts = postsData.pages.flatMap((page) => {
    return page.data;
  });

  return (
    <>
      <div className="-z-10 m-auto flex w-10/12 flex-col gap-20 md:max-w-1350">
        <div className="relative mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
          <UserDetails user={user} showUpload showUpdate />
        </div>
        <PostGrid
          posts={posts}
          loading={isPostLoading}
          hasNextPage={hasNextPage}
          loadMore={fetchNextPage}
          includeUser={false}
        />
      </div>
    </>
  );
};

export default Profile;
