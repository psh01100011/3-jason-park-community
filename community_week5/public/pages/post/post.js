import { loadHeader } from '../../component/header/header.js';
































document.addEventListener('DOMContentLoaded', async () =>{
    //헤더 로딩
    loadHeader();
    //세션 확인


    // 게시물 리스트 채우기
    try{



       //게시물 상세 내용 조회

       // 내용 채우기

       //댓글 상세 내용 조회

       // 댓글 채우기

    }catch(err){
        console.error('게시물 로딩 중 오류 발생:', err);
        document.getElementById('post-list').innerHTML = '<p>게시물을 불러오는 중 오류가 발생했습니다.</p>';
    }
});