// Load song and artist data
let songs = [];
let artists = [];
const playlist = [];

fetch('data/songs.json')
  .then(response => response.json())
  .then(data => {
    songs = data;
    displaySongs();
  });

fetch('data/artists.json')
  .then(response => response.json())
  .then(data => {
    artists = data;
    loadArtists();
  });

// Load artist profiles
function loadArtists() {
  const artistList = document.getElementById("artist-list");
  artists.forEach(artist => {
    const artistDiv = document.createElement("div");
    artistDiv.innerHTML = `<h3>${artist.name}</h3><p>${artist.bio}</p><img src="${artist.image}" alt="${artist.name}" class="artist-image">`;
    artistList.appendChild(artistDiv);
  });
}

// Search songs and filter playlist
function searchSongs() {
  const searchTerm = document.getElementById("search-bar").value.toLowerCase();
  const filteredSongs = songs.filter(song => song.title.toLowerCase().includes(searchTerm) || song.artist.toLowerCase().includes(searchTerm));
  displayFilteredSongs(filteredSongs);
}

// Display filtered songs in playlist
function displayFilteredSongs(filteredSongs) {
  playlist.length = 0;
  filteredSongs.forEach(song => addToPlaylist(song));
}

// Add a song to the playlist
function addToPlaylist(song) {
  playlist.push(song);
  displayPlaylist();
}

// Display the playlist
function displayPlaylist() {
  const playlistList = document.getElementById("playlist-list");
  playlistList.innerHTML = "";  // Clear current playlist
  playlist.forEach(song => {
    const listItem = document.createElement("li");
    listItem.textContent = `${song.title} - ${song.artist}`;
    listItem.onclick = () => playSong(song);
    playlistList.appendChild(listItem);
  });
}

// Play a song
function playSong(song) {
  const audioPlayer = document.getElementById("audio-player");
  audioPlayer.src = song.file;
  document.getElementById("song-title").textContent = song.title;
  document.getElementById("song-artist").textContent = song.artist;
  document.getElementById("album-art").src = song.albumArt || "assets/artists/default.jpg";
  audioPlayer.play();
}

// Add a random recommendation to playlist
function addRandomRecommendation() {
  const randomSong = songs[Math.floor(Math.random() * songs.length)];
  addToPlaylist(randomSong);
    }
