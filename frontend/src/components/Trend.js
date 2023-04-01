import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from './Utils';
import { getTrends } from '../actions/post.actions';
import { NavLink } from 'react-router-dom';


const Trend = () => {
    const posts = useSelector((state) => state.allPosts)
    const usersData = useSelector((state) => state.users)
    const trendList = useSelector((state) => state.trending)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isEmpty(posts[0])) {
            const postsArr = Object.keys(posts).map((i) => posts[i])
            let sortedArray = postsArr.sort((a, b) => {
                return b.likers.length - a.likers.length
            })
            sortedArray.length = 3
            dispatch(getTrends(sortedArray))
        }

    }, [posts, dispatch])

    return (
        <div className='trending-container'>
            <h4>Trending</h4>
            <NavLink exact to="/trending">
                <ul>
                    {trendList.length &&
                        trendList.map((post) => {
                            return (
                                <li key={post._id}>
                                    <div>
                                        {post.picture && <img src={post.picture} alt="post-pic" />}
                                        {post.video && (
                                            <iframe
                                                src={post.video}
                                                allowFullScreen
                                                allow="autoplay; clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                                                title={post._id} />
                                        )}
                                        {isEmpty(post.picture) && isEmpty(post.video) && (
                                            <img src={usersData[0] && usersData.map((user) => {
                                                if(user._id === post.posterId) return user.picture          
                                                else return null                                     
                                            }).join('')} alt="profil-pic" />
                                        )}
                                    </div>
                                    <div className='trend-content'>
                                        <p>{post.message}</p>
                                        <span>Lire</span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </NavLink>
        </div>
    );
};

export default Trend;