export function loadHeader() {
  const headerContainer = document.querySelector('.header-container');
  if (!headerContainer) return;

  // 헤더 wrapper
  const header = document.createElement('header');
  header.classList.add('app-header');

  // 뒤로가기 버튼
  const backBtn = document.createElement('button');
  backBtn.textContent = '◀';
  backBtn.addEventListener('click', () => {
    history.back(); // 이전 페이지로 이동 : 우리 사이트 내에서만 작동하도록 수정 필요
  });
  backBtn.classList.add('back-btn');

  // 앱 이름
  const title = document.createElement('h1');
  title.textContent = '아무말대잔치';
  title.classList.add('app-title');
  title.addEventListener('click', () => {
    window.location.href = '/';
  });

  // 프로필 버튼
  const profileBtn = document.createElement('button');
  profileBtn.textContent = '프로필';
  profileBtn.addEventListener('click', async (e) => {
    //프로필로 이동 구현
    try {
        const response = await fetch('/users/me', {
            method: 'GET'
        });

        const data = await response.json();
        
        console.log('내 프로필:', data);


        alert(JSON.stringify(data, null, 2));

    } catch (err) {
        console.error('프로필 표시 중 오류 발생:', err);
    }



  });
  profileBtn.classList.add('profile-btn');





  header.appendChild(backBtn);
  header.appendChild(title);
  header.appendChild(profileBtn);
  headerContainer.appendChild(header);
}