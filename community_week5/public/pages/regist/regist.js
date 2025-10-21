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


    // 로그인하러 가기 이벤트
    const gotoLoginButton  = document.getElementById('gotoLoginButton');
    if (gotoLoginButton) {
        gotoLoginButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/login';
        });
    }


    // 비밀번호 입력 시 비밀번호 확인 메시지 초기화 
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', (e) => {
            const passwordMessage = document.getElementById('password-message');
            passwordMessage.textContent = '';
        });
    }
    // 비밀번호 확인 이벤트 : debounce 적용하기
    const passwordCheckInput = document.getElementById('passwordCheck');
    if (passwordCheckInput) {
        passwordCheckInput.addEventListener('input', debounce((e) => {
            const password = document.getElementById('password').value;
            const passwordCheck = e.target.value;

            const passwordMessage = document.getElementById('password-message');

            if (password === passwordCheck) {
                passwordMessage.textContent = '비밀번호가 일치합니다.';
                passwordMessage.style.color = 'green';
            } else {
                passwordMessage.textContent = '비밀번호가 일치하지 않습니다.';
                passwordMessage.style.color = 'red';
            }
        }, 300));
    }



    // 아이디 중복 확인 이벤트 : debounce 적용하기
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', debounce(async(e) => {
            const email = e.target.value;

            // 중복 확인 API 호출 구현 필요
            try {
                const response = await fetch('/users/email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email
                    })
                });
                const message = document.getElementById('email-message');
                if(await response.json()){
                    message.textContent = '사용 가능한 이메일입니다.';
                    message.style.color = 'green';
                }
                else{
                    message.textContent = '이미 사용 중인 이메일입니다.';
                    message.style.color = 'red';
                }
        

            } catch (err) {
                console.error('검증 오류 :', err);
            }

        }, 300));
    }
    // 닉네임 중복 확인 이벤트 : debounce 적용하기
    const nicknameInput = document.getElementById('nickname');
    if (nicknameInput) {
        nicknameInput.addEventListener('input', debounce(async(e) => {
            const nickname = e.target.value;

            // 중복 확인 API 호출 구현 필요
            try {
                const response = await fetch('/users/nickname', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nickname
                    })
                });
                const message = document.getElementById('nickname-message');
                if(await response.json()){
                    message.textContent = '사용 가능한 닉네임입니다.';
                    message.style.color = 'green';
                }
                else{
                    message.textContent = '이미 사용 중인 닉네임입니다.';
                    message.style.color = 'red';
                }
        

            } catch (err) {
                console.error('검증 오류 :', err);
            }

        }, 300));
    }
       
    


    // debounce function
    function debounce(func, delay) {
        let timer;
        return function() {
            const args = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        }
    }

});
