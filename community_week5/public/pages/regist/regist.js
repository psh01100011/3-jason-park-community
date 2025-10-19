import { loadHeader } from '../../component/header/header.js';


document.addEventListener('DOMContentLoaded', async () =>{
    //헤더 로딩
    loadHeader();


    // 회원가입 버튼 이벤트
    const signUpButton = document.getElementById('registButton');
    if (signUpButton) {
        signUpButton.addEventListener('click', (e) => {
            
        });
    }

});
