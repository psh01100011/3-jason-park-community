export function setPostList(posts) {
  const postListContainer = document.getElementById('post-list');
  posts.forEach(post => {
    const item = document.createElement('div');
    item.classList.add('post-item');

    item.innerHTML = `
      <h3>${post.title}</h3><br>
      <small>조회수 ${post.viewCount} • 댓글수 ${post.commentCount} • 댓글수  ${post.likeCount}</small>
      <hr>
      
      <small>${post.nickname} • ${new Date(post.createdAt).toLocaleString()}</small>
    `;

    item.addEventListener('click', () => {
      // 상세 페이지 이동 구현 필요
    });


    postListContainer.appendChild(item);
  });
}

