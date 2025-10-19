// public/api/post.js
let lastPostId = null;
let isEnd = false;
let isLoading = false;

export async function fetchPosts(limit = 10) {
  if (isLoading || isEnd) return [];
  isLoading = true;

  try {
    const url = lastPostId
      ? `/api/posts?lastPostId=${lastPostId}&limit=${limit}`
      : `/api/posts?limit=${limit}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('게시물 요청 실패');

    const posts = await response.json();
    if (posts.length === 0) {
      isEnd = true;
      return [];
    }

    lastPostId = posts[posts.length - 1].id; // 마지막 게시물 ID 갱신
    return posts;

  } catch (err) {
    console.error('게시물 로딩 오류:', err);
    return [];
  } finally {
    isLoading = false;
  }
}