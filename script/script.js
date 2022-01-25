// render song
// scroll top
// play / pause/seek
// CD rotate
// next / prev
// Random
// Next/Repeat when ened
// Active song
// scroll active song into view
// paly song when click
 const $$ = document.querySelectorAll.bind(document);
 const $ = document.querySelector.bind(document);
 const heading = $('.heading-name-song-now h2');
 const cdThumb = $('.cd-thumb');
 const audio = $('#audio');
 const playBtn = $('.btn-play');
 const player = $('.music-player');
 const progress = $('#progress');
 const nextBtn = $('.btn-forward');
 const prevBtn = $('.btn-backward');
 const randomBtn = $('.btn-random');
 const repeatBtn = $('.btn-repeat');
 const listSong = $('.list-song');
 const PLAYER_STORAGE_KEY = "MY_PLAYER_MUSIC"
 const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Là Ai Từ Bỏ - Là Ai Vô Tình',
            singer: 'Hương Ly',
            path: './asset/music/music1.mp3',
            image: './asset/picture/photo1.jpeg'
        },
        {
           name: 'Tiếng gọi Nỗi Lòng',
           singer: 'Chi Dân',
           path: './asset/music/music2.mp3',
           image: './asset/picture/photo2.jpeg'
       },
       {
           name: 'Thay Lòng',
           singer: 'DIMZ-TVk-NH4T',
           path: './asset/music/music3.mp3',
           image: './asset/picture/photo3.jpeg'
       },
       {
           name: 'Yêu Là Cưới',
           singer: 'Phát Hồ',
           path: './asset/music/music4.mp3',
           image: './asset/picture/photo4.jpeg'
       },
       {
           name: 'Cưới Luôn Được Không',
           singer: 'YuniBoo-GocToi-Mixer',
           path: './asset/music/music5.mp3',
           image: './asset/picture/photo5.jpeg'
       },
       {
        name: 'Là Ai Từ Bỏ - Là Ai Vô Tình',
        singer: 'Hương Ly',
        path: './asset/music/music1.mp3',
        image: './asset/picture/photo1.jpeg'
        },
        {
        name: 'Tiếng gọi Nỗi Lòng',
        singer: 'Chi Dân',
        path: './asset/music/music2.mp3',
        image: './asset/picture/photo2.jpeg'
    },
    {
        name: 'Thay Lòng',
        singer: 'DIMZ-TVk-NH4T',
        path: './asset/music/music3.mp3',
        image: './asset/picture/photo3.jpeg'
    },
    {
        name: 'Yêu Là Cưới',
        singer: 'Phát Hồ',
        path: './asset/music/music4.mp3',
        image: './asset/picture/photo4.jpeg'
    },
    {
        name: 'Cưới Luôn Được Không',
        singer: 'YuniBoo-GocToi-Mixer',
        path: './asset/music/music5.mp3',
        image: './asset/picture/photo5.jpeg'
    },
    ],
    setConfig: function(key, value)
    {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function()
    {
        const htmls = this.songs.map((song,index) => {
            return `<div class="item-song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                        <img src="${song.image}" alt="" class="song-img">
                        <div class="song-info">
                            <h4 class="song-name">${song.name}</h4>
                            <p class="song-author">${song.singer}</p>
                        </div>
                        <div class="song-info-more">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                     </div>`
        })
        listSong.innerHTML = htmls.join('');
    },
    defineProperties: function()
    {
        Object.defineProperty(this, 'currentSong',{
            get: function()
            {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvent: function()
    {   
        const _this = this;
        const cd = $('.cd');
        const cdWidth = cd.offsetWidth

        const cdThumdAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000,
            iterations: Infinity
        })

        cdThumdAnimate.pause()
        document.onscroll = function()
        {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newcdWidth = cdWidth - scrollTop;

            cd.style.width = newcdWidth > 0 ? newcdWidth +'px' : 0;
            cd.style.opacity = newcdWidth / cdWidth;
            
        }
        playBtn.onclick = function()
        {   
            if(_this.isPlaying)
            {   
                audio.pause();
              
            }
            else{

                audio.play();

            }
            // when song is play
        }
        audio.onplay = function()
            {
                _this.isPlaying = true;
                player.classList.add('playing')
                cdThumdAnimate.play();
            }
            audio.onpause = function()
            {
                _this.isPlaying = false;
                player.classList.remove('playing')
                cdThumdAnimate.pause();
                
            }
            // Khi tieens do bai hat thay doi
            audio.ontimeupdate = function()
            {
                if(audio.duration)
                {
                    const progressPercent = Math.floor(audio.currentTime / audio.duration * 100) ;
                    progress.value = progressPercent
                }
            }
            // xử lí khi tua xong
            progress.onchange = function(e)
            {
                const seekTime = audio.duration / 100 * e.target.value;
                audio.currentTime = seekTime;
            }
            nextBtn.onclick = function()
            {   
                if(_this.isRandom)
                {
                    _this.randomSong();
                }
                else{
                    _this.nextSong();
                }
                audio.play();
                _this.render();
                _this.scrollIntoView();
            }
            prevBtn.onclick = function()
            {
                if(_this.isRandom)
                {
                    _this.randomSong();
                }
                else{
                    _this.prevSong();
                }
                audio.play();
                _this.render();
                _this.scrollIntoView();

            }
            audio.onended = function()
            {
                if(_this.isRepeat)
                {
                    audio.play();
                }
                else{

                    nextBtn.click();
                }
            }

        randomBtn.onclick = function(e)
        {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom',_this.isRandom)
            randomBtn.classList.toggle('active',_this.isRandom);
        }
        repeatBtn.onclick = function(e)
        {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat',_this.isRepeat)
           
            repeatBtn.classList.toggle('active',_this.isRepeat)
        }
        listSong.onclick = function(e)
        {
            const songNode = e.target.closest('.item-song:not(.active)');

            if(songNode || e.target.closest('.song-info-more'))
            {
                if(songNode)
                {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
            }
        }
    },
    scrollIntoView: function()
    {
        setTimeout(() => 
        {
            if(this.currentIndex === 0)
            {
                $('.item-song.active').scrollIntoView(
                    {
                        behavior: "smooth",
                        block: "center"
                    }
                )
            }
            else{
                $('.item-song.active').scrollIntoView(
                    {
                        behavior: "smooth",
                        block: "nearest"
                    }
                )
            }
        },300)
    },
    loadCurrentSong: function()
    {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path
    },
    randomSong: function()
    {   let newIndex ;
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length)
        {
            this.currentIndex = 0 ;
        }
        this.loadCurrentSong();
    },
    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0)
        {
            this.currentIndex = this.songs.length - 1 ;
        }
        this.loadCurrentSong();
    },
    loadCofig: function()
    {
        this.isRandom = this.config.isRandom
        
        this.isRepeat = this.config.isRepeat
    },
    start: function(){

        this.loadCofig();
        
        this.defineProperties();
        
        this.handleEvent();
        
        this.loadCurrentSong();
        
        this.render();

        randomBtn.classList.toggle('active',this.isRandom);
        repeatBtn.classList.toggle('active',this.isRepeat)
      
    }
 }
 app.start();
 