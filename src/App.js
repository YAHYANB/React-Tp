import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [post,setPost] = useState([])
  const [comment,setComment] = useState([])


  const allData = async () =>{
    const posts = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setPost(posts.data)
  }
  const showComment = async (postId) => {
    const comments = await axios.get('https://jsonplaceholder.typicode.com/comments/?postId='+postId);
    setComment(comments.data);
  }

  const hide = (postId) =>{
    setComment([]);
  }
  useEffect(()=>{
    allData()
  },[])
  return (
    <div className="App">
      <div className="px- py-5 ">
        <h1 className='font-bold text-3xl uppercase text-orange-500 px-3'>All Posts</h1>
      </div>
      {post.map((res)=> 
        <div className='antialiased border border-slate-400 mx-2 my-3 px-4 py-3 rounded-md'>
          <h1 className='uppercase font-bold py-2 '>{res.title}</h1>
          <p className='text-gray-500 font-serif py-2'>{res.body}</p>
          <div className='space-x-2 py-2'>
          <button onClick={() => showComment(res.id)} className='bg-gray-200 hover:bg-gray-300 text-white font-semibold px-4 py-1 rounded-full'>

            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" fill="#0F0F0F"/></svg>          
          </button>
          
          <button onClick={()=>hide()} className='bg-slate-500 hover:bg-slate-400 text-white font-semibold px-4 py-1 rounded-full'>

            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z" fill="#fff"/></svg>
          </button>
          </div>
          {comment
            .filter((resCom) => resCom.postId === res.id)
            .map((res) => 
            <div className='border border-black my-2 py-3 px-3 rounded-md'>
              <div className='flex items-center space-x-3'>
                <div className='w-12'><img src="./image/user.png" alt="" /></div>
                <div className='block'>
                  <div className='uppercase font-semibold'>{res.name}</div>
                  <div className='text-sm text-gray-400'>{res.email}</div>
                </div>
              </div>
              <div className='py-2 px-4 text-gray-800'>
                {res.body}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
