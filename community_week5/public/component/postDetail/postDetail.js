import { getCookie } from '../../../util/cookie.js';

export function setPostDetail(postDetail) {
  const postDetailContainer = document.getElementById('post-detail-container');

  const userId = getCookie('userId');
  const authorId = postDetail.userId;
  const container = document.getElementById('post-detail-container');
  container.innerHTML = '';

  // 📝 제목
  const titleEl = document.createElement('h1');
  titleEl.classList.add('post-detail-title');
  titleEl.textContent = postDetail.title;

  // 👤 작성자 & 작성일 & 버튼 영역
  const headerEl = document.createElement('div');
  headerEl.classList.add('post-detail-header');
  headerEl.innerHTML = `
    <div class="post-meta">
      <span class="nickname">${postDetail.nickname}</span>
      <span class="date">${new Date(postDetail.createdAt).toLocaleString()}</span>
    </div>
  `;
  console.log('유저 id : ',userId)
  console.log('작성자 id :',authorId);
  if(userId == authorId){
    headerEl.innerHTML +=`
    <div class="post-actions">
      <button id="editButton">수정</button>
      <button id="deleteButton">삭제</button>
    </div>
    `;
  }

  // ✍️ 본문 내용
  const contentEl = document.createElement('div');
  contentEl.classList.add('post-detail-content');
  contentEl.textContent = postDetail.content;

  // 📊 하단 정보
  const footerEl = document.createElement('div');
  footerEl.classList.add('post-detail-footer');
  footerEl.innerHTML = `
    <button id="likeButton">❤️ 좋아요 ${postDetail.likeCount}</button>
    <span>조회수 ${postDetail.viewCount}</span>
    <span>댓글 ${postDetail.commentCount}</span>
  `;

  // 🧱 조립
  container.appendChild(titleEl);
  container.appendChild(headerEl);
  container.appendChild(document.createElement('hr'));
  container.appendChild(contentEl);
  container.appendChild(document.createElement('hr'));
  container.appendChild(footerEl);

}


