export async function loadFooter() {
  const footerContainer = document.querySelector('.footer-container');
  if (!footerContainer) return;

  // footer 엘리먼트 생성
  const footer = document.createElement('footer');
  footer.classList.add('app-footer');

  // 약관 리스트
  const corpList = document.createElement('ul');
  corpList.classList.add('footer-list');

  // 이용약관
  const termsItem = document.createElement('li');
  const termsLink = document.createElement('a');
  termsLink.href = '/terms';
  termsLink.textContent = '이용약관';
  termsItem.appendChild(termsLink);

  // 개인정보처리방침
  const privacyItem = document.createElement('li');
  const privacyLink = document.createElement('a');
  privacyLink.href = '/privacy';
  privacyLink.textContent = '개인정보처리방침';
  privacyItem.appendChild(privacyLink);

  // 리스트에 추가
  corpList.appendChild(termsItem);
  corpList.appendChild(privacyItem);

  footer.appendChild(corpList);

  // footer 삽입
  footerContainer.appendChild(footer);
}