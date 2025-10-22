import { loadHeader } from '../../component/header/header.js';
import { setWriteForm } from '../../component/writeForm/writeForm.js';

document.addEventListener('DOMContentLoaded', async () =>{
    //헤더 로딩
    loadHeader();
    setWriteForm();
});


// 글 작성 완료 버튼 -> 백엔드 연동
const submitButton = document.getElementById('submitButton');
if (submitButton) {

    submitButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        if (!title || !content) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }   

        try {
            const response = await fetch('/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    content: content
                }),
                credentials: 'include'
            });

            if (response.status !== 201) {
                throw new Error('글 작성 요청 실패');
            }

            // 글 작성 성공 시 메인 페이지로 이동
            window.location.href = '/';

        } catch (err) {
            console.error('글 작성 중 오류 발생:', err);
            alert('글 작성에 실패했습니다. 다시 시도해주세요.');
        }
    });






}