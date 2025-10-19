export function setPostList(posts) {
  const postListContainer = document.getElementById('post-list');

  posts.forEach(post => {
    const item = document.createElement('div');
    item.classList.add('post-item');

    item.innerHTML = `
      <h3>${post.title}</h3>
      <small>${post.nickname} • ${new Date(post.createdAt).toLocaleString()}</small>
      <hr>
    `;

    item.addEventListener('click', () => {
      // 상세 페이지 이동 구현 필요
    });


    postListContainer.appendChild(item);
  });
}

