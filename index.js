import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener('click', (e) =>{
 
    if (e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
    else if (e.target.dataset.likes){
        handleLikeClick(e.target.dataset.likes)
    } 
    else if (e.target.dataset.retweets){
        handleRetweetClick(e.target.dataset.retweets)
    }
    else if (e.target.dataset.replies){
        handleReplyClick(e.target.dataset.replies)
    }

})

function handleTweetBtnClick(){
    const tweetInput    = document.querySelector('#tweet-input')

    if (tweetInput.value){
        const tweetData = {
            handle: `@Scrimba 💎`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: `${tweetInput.value}`,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
        }
    
        tweetsData.unshift(tweetData)
        tweetInput.value = ''
        render()
    }
}

function handleLikeClick(tweetId){
    const targetTweetObject = tweetsData.filter( (tweet) => {
                                return tweet.uuid === tweetId
                            })[0]

    targetTweetObject.isLiked = targetTweetObject.isLiked ? false : true 
    
    if (targetTweetObject.isLiked){
        targetTweetObject.likes++
    }else {
        targetTweetObject.likes--
    }                      
    render()
}

function handleRetweetClick(tweetId){
    const targetTweetObject = tweetsData.filter( (tweet) => {
        return tweet.uuid === tweetId
    })[0]

    targetTweetObject.isRetweeted = !targetTweetObject.isRetweeted

    if (targetTweetObject.isRetweeted){
        targetTweetObject.retweets++
    }else {
        targetTweetObject.retweets--
    }                      
    
    render()
}

function handleReplyClick(replyId){
    const replyEl = document.getElementById(`replies-${replyId}`)
    replyEl.classList.toggle('hidden')
}

function render(){
    const feed     = document.querySelector('#feed')
    feed.innerHTML = getFeedHtml();  
}

function getFeedHtml(){

    let feedHtml = '';
    tweetsData.forEach((tweet) => {

        let likedClass = ''
        let retweetClass = ''
        let repliesHtml = ''
        if (tweet.isLiked){
            likedClass = 'liked'
        }
        if (tweet.isRetweeted){
            retweetClass = 'retweeted'
        }

        if (tweet.replies.length > 0){
            for(let reply of tweet.replies){
                repliesHtml += `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                    </div>
                </div>`
            }
        }

        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots" data-replies="${tweet.uuid}"> </i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${likedClass}" data-likes="${tweet.uuid}"></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${retweetClass}" data-retweets="${tweet.uuid}"></i>
                            ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
            <div class="hidden" id="replies-${tweet.uuid}">
                ${repliesHtml}
            </div>
        </div>`
    })
    return feedHtml  
}

render()



