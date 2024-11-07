// Load data
let songs = [];
let artists = [];
const playlist = [];

fetch('data/songs.json')
  .then(response => response.json())
  .then(data => songs = data);

fetch('data/artists.json')
  .then(response => response.json())
  .then(data => {
    artists = data;
    loadArtists();
  });

// Load artists and display their albums
function loadArtists() {
  const artistList = document.getElementById("artist-list");
  artistList.innerHTML = "";
  
  artists.forEach(artist => {
    const artistDiv = document.createElement("div");
    artistDiv.classList.add("artist");

    artistDiv.innerHTML = `<h3>${artist.name}</h3><p>${artist.bio}</p><img src="${artist.image}" alt="${artist.name}" class="artist-image">`;

    artist.albums.forEach(album => {
      const albumDiv = document.createElement("div");
      albumDiv.classList.add("album");
      albumDiv.innerHTML = `<img src="${album.cover}" alt="${album.title}" class="album-cover"><h4>${album.title} (${album.year})</h4>`;
      
      const songList = document.createElement("ul");
      songList.classList.add("song-list");
      album.songs.forEach(songId => {
        const song = songs.find(s => s.id === songId);
        if (song) {
          const songItem = document.createElement("li");
          songItem.textContent = song.title;
          songItem.onclick = () => playSong(song);
          
          const addToPlaylistButton = document.createElement("button");
          addToPlaylistButton.textContent = "+ Add to Playlist";
          addToPlaylistButton.onclick = () => addToPlaylist(song);

          songItem.appendChild(addToPlaylistButton);
          songList.appendChild(songItem);
        }
      });

      albumDiv.appendChild(songList);
      artistDiv.appendChild(albumDiv);
    });

    artistList.appendChild(artistDiv);
  });
}

// Play song function
function playSong(song) {
  const audioPlayer = document.getElementById("audio-player");
  audioPlayer.src = song.file;
  document.getElementById("song-title").textContent = song.title;
  document.getElementById("song-artist").textContent = song.artist;
  document.getElementById("album-art").src = artists
    .find(artist => artist.name === song.artist)
    .albums
    .find(album => album.songs.includes(song.id))
    .cover || "assets/artists/default.jpg";
  audioPlayer.play();
}

// Add to Playlist
function addToPlaylist(song) {
  playlist.push(song);
  displayPlaylist();
}

// Display Playlist
function displayPlaylist() {
  const playlistList = document.getElementById("playlist-list");
  playlistList.innerHTML = "";
  
  playlist.forEach((song, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${song.title} - ${song.artist
