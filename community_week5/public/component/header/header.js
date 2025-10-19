export function loadHeader() {
  const headerContainer = document.querySelector('.header-container');
  if (!headerContainer) return;

  // 헤더 wrapper
  const header = document.createElement('header');
  header.classList.add('app-header');

  // 뒤로가기 버튼
  const backBtn = document.createElement('button');
  backBtn.textContent = '뒤로가기';
  backBtn.addEventListener('click', () => {
    history.back(); // 이전 페이지로 이동
  });
  backBtn.classList.add('back-btn');

  // 앱 이름
  const title = document.createElement('h1');
  title.textContent = '아무말대잔치';
  title.classList.add('app-title');

  // 프로필 버튼
  const profileBtn = document.createElement('button');
  profileBtn.textContent = '프로필';
  profileBtn.addEventListener('click', () => {
    //프로필로 이동
  });
  profileBtn.classList.add('profile-btn');

  header.appendChild(backBtn);
  header.appendChild(title);
  header.appendChild(profileBtn);
  headerContainer.appendChild(header);
}