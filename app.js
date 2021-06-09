const searchSong = () =>{
    const searched = document.getElementById("search-here").value ;
    const url = `https://api.lyrics.ovh/suggest/${searched}`
    fetch(url)
    .then (response => response.json())
    .then (data => displaySong(data.data));
}

const displaySong = songs =>{
    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML= "";
    songs.forEach(song => {
      const songDiv = document.createElement("div");
      songDiv.className = 'search-result col-md-8 mx-auto py-4';
      songDiv.innerHTML =`
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                      
                        <source src="${song.preview}" type="audio/mpeg">
                        Your browser does not support the audio element.
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>
      `;
      songContainer.appendChild(songDiv);

    });
}

const getLyric = (artist, title) =>{
    const url = ` https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
    .then(res => res.json())
    .then(data =>  showLyrics(data.lyrics))
}

// with async await: 

// const getlyric = async (artist , title) =>{
    //const url = ` https://api.lyrics.ovh/v1/${artist}/${title}`;
    // const res = await fetch (url);
    // const data = rest.json();
    // showLyrics(data.lyrics);
//}

const showLyrics = lyric =>{
    const lyricDiv = document.getElementById("song-lyric");
    lyricDiv.innerText = lyric;
}