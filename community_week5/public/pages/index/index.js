import { loadHeader } from '../../component/header/header.js';
import { fetchPosts } from '../../../api/post/post.js';
import { setPostList } from '../../component/post/post.js';


async function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    const newPosts = await fetchPosts();
    setPostList(newPosts);
  }
}


document.addEventListener('DOMContentLoaded', async () =>{
    //헤더 로딩
    loadHeader();

    // 게시물 리스트 채우기
    try{
        document.getElementById('post-list').innerHTML = '<p>테스트 게시물 리스트.</p>';
        // 게시물 가져오는 api 호출 fetchPosts()
        const posts = await fetchPosts();
        //게시물 container에 채우는 함수 호출 : setPostList()
        setPostList(posts);

        //무한 스크롤 구현
        window.addEventListener('scroll', handleScroll);
    }catch(err){
        console.error('게시물 로딩 중 오류 발생:', err);
        document.getElementById('post-list').innerHTML = '<p>게시물을 불러오는 중 오류가 발생했습니다.</p>';
    }
});