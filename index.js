
const tweetUrl = 'http://ec2-54-172-96-100.compute-1.amazonaws.com/feed/random?q=noodle';

let id_set = new Set();
let allTweets = [];
let clear = 1;
let userTweetIndex = 0;
let unpaused = 1;
var months = {
  'Jan' : '01',
  'Feb' : '02',
  'Mar' : '03',
  'Apr' : '04',
  'May' : '05',
  'Jun' : '06',
  'Jul' : '07',
  'Aug' : '08',
  'Sep' : '09',
  'Oct' : '10',
  'Nov' : '11',
  'Dec' : '12'
}


function fetchTweets(){
  tweets = [];
  tweets.length = 0;

  if (unpaused){


    fetch(tweetUrl)
      .then(res => res.json())
      
      .then((data) => {
    
        
        data.statuses.forEach((item, i) => {
            if (!id_set.has(item.id)) {
               
         
                id_set.add(item.id);
                allTweets.push(item);
                
                tweets.push(item);
                if (i >= 10){
                  return;
                }
                

              }
            else{
                alert('it happened');

            }
        });


      
       refreshTweets(tweets, clear);

      clear = 0;
        

      })

      .catch(err => {
        console.log(err);
      })
  }

}



function filterTweets(keyword){
  alert(keyword);
  let filtered = [];
  if (!keyword) {
    return tweet.posts;
  } 
  
  else {
    tweet.posts.forEach((item, i) =>{
      if (item.title.toLowerCase().search(keyword.toLowerCase()) == -1){
       
        tweet.posts.splice(i,1);
      }
    });



}
}


const ml = Vue.component('mad-lib', {
  
  template: `
  <!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <title>Lab3: Madlibs</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
</head>
<body>


</body>
</html>

  `

  });



let searchString = "";
const handleSearch = event => {

  console.log(event.target.value.trim().toLowerCase());
    searchString = event.target.value.trim().toLowerCase();
    var posts = filterTweets(searchString);
   
   



}



var inpt = Vue.component('base-input', {
  
  data: function(){
    return{
message: null
    } ;
  },

  methods:{
    onTextChange(){

      this.$emit("searched", this.message);
    }
    
  
  },
  


  template: `
  <div class = "button-head-right">
    
    <input v-model="message" type="text" placeholder="search" name = "base-input" @input="onTextChange"></input>
  </div>
  
`,
})




var filtervue = new Vue({
  el: '.button-head-right',


  methods: {
    filt: function(keyword){
    let filtered = [];
    if (!keyword) {
      return tweet.posts;
    } 
    
    else {
      tweet.posts.forEach((item, i) =>{
        if (item.title.toLowerCase().search(keyword.toLowerCase()) == -1){
         
          tweet.posts.splice(i,1);
        }
      });
  
    }
  
  }
}


})



function setup_user_tweet(){
  var new_text = document.getElementById("new-tweet").value;
  var date = new Date();
  date = date.toString();
  let month = months[date.substring(4,7)];
  let year = date.substring(11,15);
  let day = date.substring(8,10);
  let cleanDate = date.substring(4,7) + ' ' + day + ' ' + year;
  let numDate = year + month + day + "." + userTweetIndex;
 tweet.posts.unshift({ id: userTweetIndex, title: new_text, date: numDate, cleandate: cleanDate, author: 'wittyNoodleTweeter', handle: '@handle', pic: 'twitter_egg_blue.png', styles: 'my-tweet'})
  userTweetIndex ++;
}



	
function checkUrl(url) {
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false);
  http.send();
  return http.status!=404;
}

function create_tweet(tweet){

  const tweetList = document.createElement("div");

  tweetContainer.appendChild(tweetList);
  const div = document.createElement('div');
  div.setAttribute('id', 'yeet');
  tweetContainer.appendChild(div);
  Vue.component('tw-t', {
  props: ['title', 'date', 'cleandate', 'author', 'handle', 'pic', 'styles'],
  template: `
  <div class = "twitterfeed" v-bind:id='styles'><div class = "profile-pic">
  <img id = "ppic" :src = "pic"></div><div class = "tweet">
  <div class = "tweet-info"><div class = "poster-name">{{ author }}</div>
  <div class = "poster-handle">{{ handle }}</div>
  <div class = "post-date">{{ cleandate }}</div></div>
  <div class = "tweet-content">{{ title }}</div></div></div>
  `

  });

  const twt = document.createElement('tw-t');
  twt.setAttribute("v-for", "post in posts");
  twt.setAttribute("v-bind:key", "post.id");
  twt.setAttribute("v-bind:title","post.title");
  twt.setAttribute("v-bind:date","post.date");
  twt.setAttribute("v-bind:author","post.author");
  twt.setAttribute("v-bind:handle","post.handle");
  twt.setAttribute("v-bind:pic","post.pic");
  twt.setAttribute("v-bind:cleandate","post.cleandate");
  twt.setAttribute("v-bind:styles","post.styles");
  div.appendChild(twt);
  var vm = new Vue({
     el: '#yeet',
  data: {
    posts: []

  },
  methods: {
    filt: function(keyword){
      alert(keyword);
      let filtered = [];
      if (!keyword) {
        return tweet.posts;
      } 
      
      else {
        tweet.posts.forEach((item, i) =>{
          if (item.title.toLowerCase().search(keyword.toLowerCase()) == -1){
           
            tweet.posts.splice(i,1);
          }
        });
    
    
    
    }
    }
    
  }
 });
 return vm;
}


  /**
   * Removes all existing tweets from tweetList and then append all tweets back in

   */
  const tweetContainer = document.getElementById('tweet-container');
  function refreshTweets(tweets, remove) {
      // feel free to use a more complicated heuristics like in-place-patch, for simplicity, we will clear all tweets and append all tweets back
      // {@link https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript}
   //   if (!remove){
    //  while (tweetContainer.firstChild) {
     //     tweetContainer.removeChild(tweetContainer.firstChild);
     //}}
  
      // create an unordered list to hold the tweets
      // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement}
      
    
      // all tweet objects (no duplicates) stored in tweets variable
     
      // filter on search text
      // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter}
      //const filteredResult = filterTweets(searchString);
      
      // sort by date
      // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}
    
      //var tweet = create_tweet();

      // execute the arrow function for each tweet

      // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach}
      tweets.forEach(tweetObject => {
        var cleanDate = tweetObject.user.created_at.substring(4,10) + tweetObject.user.created_at.substr(tweetObject.user.created_at.length - 5)
        var numDate = cleanDate.substring(cleanDate.length - 5) + months[cleanDate.substring(0,3)] + cleanDate.substring(4,6)
        numDate = numDate.replace(/\s/g, '');
        tweet.posts.forEach((item, i) =>{
        if (item.id == tweetObject.id){
          tweet.posts.splice(i, 1);

        }
          
        })
        let PicUrl = ''
        if(checkUrl(tweetObject.user.profile_image_url)){
           PicUrl = tweetObject.user.profile_image_url;
        }
        else{
          PicUrl = 'twitter_egg_blue.png'

        }
        tweet.posts.push({ id: tweetObject.id, title: tweetObject.text.replace(/(\r\n|\n|\r)/gm, ""), date: numDate, cleandate: cleanDate, author: tweetObject.user.name, handle: '@' + tweetObject.user.screen_name, pic: PicUrl, styles:'nah'})
        tweet.posts.sort((a, b) => (a.date < b.date) ? 1 : -1);

          // create a container for individual tweet
        // showTweet(tweetObject);
         //create_tweet();
       
          // e.g. create a div holding tweet content
          
      });

 

  }



  Vue.component('game-title', {
    template: `
        <h1>
            <a href="https://en.wikipedia.org/wiki/Tic-tac-toe">Tic Tac Toe</a>
        </h1>
    `,
});

currPlayerIndex = 0;
boardArray= [-1,-1,-1,-1,-1,-1,-1,-1,-1];
gameOver= false;

// Vue.component('tttApp',{
var ttt = Vue.component({

  
    data: function() { 
        return {
            appClasses: ['w-100', 'h-100', 'p-5', 'd-flex', 'flex-column', 'align-items-center'],
            winConditions: [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
        };
        
    },
    methods: {
        checkWinner() {
            for(var i = 0; i < ttt.data().winConditions.length; i++) {
                if(boardArray[ttt.data().winConditions[i][0]] !== -1 && 
                    boardArray[ttt.data().winConditions[i][0]] == boardArray[ttt.data().winConditions[i][1]] && 
                    boardArray[ttt.data().winConditions[i][1]]== boardArray[ttt.data().winConditions[i][2]]) {
                    gameOver = true;
                }
            }
            var count=0;
            for(var i = 0; i<boardArray.length; i++) {
                if(boardArray[i]!=-1) {
                    count++
                }
            }
            if(count == 9) {
                gameOver = true;
            }
        },
        nextPlayer(box) {            
            boardArray[box-1]=currPlayerIndex;
            if(currPlayerIndex==0) {
                document.getElementById(box).innerText = "X";
                ttt.methods.checkWinner();
                currPlayerIndex= 1;
            }
            else {
                document.getElementById(box).innerText = "O";
                ttt.methods.checkWinner();
                currPlayerIndex= 0;
            }
        }
    },
    template: `
        <div id="tttApp">
        <game-title style="text-align: center;"></game-title>
        <game-board @player-moved="nextPlayer"></game-board>
        </div>
    `
})

Vue.component('game-board', {
    data: function() {
        return {
            classObject: ['container', 'm-auto', 'bg-light', 'd-flex', 'flex-column'],
            styleObject: {
                'width': '900px',
                'height': '900px'
            },
            boardRowClasses: ['board-row', 'row', 'flex-grow-1'],
            boardCellClasses: ['board-cell', 'col', 'p-4', 'border', 'border-primary', 'rounded-lg'],
        };
    },
    methods: {
        boardRowKey(r) {
            return `row-${r}`;
        },
        boardCellKey(r, c) {
            return `cell-${r}-${c}`;
        },
        onClick: (event) => {
            if(!gameOver) {
                const selectedBox = parseInt(event.target.id, 10)-1;
                if(boardArray[selectedBox] == -1) {
                    ttt.methods.nextPlayer(selectedBox+1);                 
                }
            }
            else {
                for(var i = 1; i < 10; i++) {
                    document.getElementById(i).innerText = "";
                }
                currPlayerIndex = 0;
                boardArray= [-1,-1,-1,-1,-1,-1,-1,-1,-1];
                gameOver= false;
            }
        },
    },
    template: `
        <div id="board" :class="classObject" :style="styleObject">
            <div v-for="r of 3" :key="boardRowKey(r)" :class="boardRowClasses">
                <div
                    v-for="c of 3"
                    :key="boardCellKey(r, c)"
                    :id="(r - 1) * 3 + c"
                    :class="[{'bg-white': [2, 4, 6, 8].includes((r - 1) * 3 + c)} ,boardCellClasses]" style="text-align:center; font-size:60px" @click="onClick">
                </div>
            </div>
        </div>
    `
});
  






const Bar = { template: '<div style="text-align: center;"><a href = "ttt/tic-tac-toe.html"</div>' }

const Foo = { template: '<div style="text-align: center;"><a href = "madlib/index.html"</div>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
    { path: '/madlib/index.html', 
    component: ttt,
    beforeEnter: (to, from, next) => {
        currPlayerIndex = 0;
        boardArray= [-1,-1,-1,-1,-1,-1,-1,-1,-1];
        gameOver= false;
        next();
    }
    },
    { path: '/ttt/tic-tac-toe.html', component: Bar }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({routes})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const routerrouter = new Vue({
  router,
}).$mount('#routerrouter')



 
//var tweet = create_tweet();
var tweet = create_tweet();
fetchTweets();

document.getElementById("tweetbutton").addEventListener("click", setup_user_tweet);  

var scrolling = false;
 
$( window ).scroll( function() {
  scrolling = true;
});
 
setInterval( function() {
  if ( scrolling ) {
    scrolling = false;
    fetchTweets()
  }
}, 250 );