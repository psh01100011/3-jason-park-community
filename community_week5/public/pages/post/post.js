import { loadHeader } from '../../component/header/header.js';
import { fetchPostDetail } from '../../../api/post/post.js';  
import { setPostDetail } from '../../component/postDetail/postDetail.js';






document.addEventListener('DOMContentLoaded', async () =>{
    
    //헤더 로딩
    loadHeader();
    //세션 확인


    // 게시물 내용 채우기
    try{
        //게시물 상세 내용 조회
        let postId = window.location.pathname


        postId = postId.replace('/post/','');
        const postDetail = await fetchPostDetail(postId);
        console.log('작성자 id', postDetail.userId);
        //console.log(postDetail.json());
       // 내용 채우기
       setPostDetail(postDetail);
       //댓글 상세 내용 조회

       // 댓글 채우기

    }catch(err){
        console.error('게시물 로딩 중 오류 발생:', err);
        document.getElementById('post-list').innerHTML = '<p>게시물을 불러오는 중 오류가 발생했습니다.</p>';
    }
});