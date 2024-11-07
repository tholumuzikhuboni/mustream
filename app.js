// Declare global variables to hold the data
let artists = [];
let songs = [];

// Fetch artists data from 'artists.json'
fetch('data/artists.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load artists data');
    }
    return response.json();
  })
  .then(data => {
    artists = data;
    console.log("Artists loaded:", artists);  // Debugging log
    loadArtists();  // Call the function to display artists after loading the data
  })
  .catch(error => console.log('Error loading artists:', error));

// Fetch songs data from 'songs.json'
fetch('data/songs.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load songs data');
    }
    return response.json();
  })
  .then(data => {
    songs = data;
    console.log("Songs loaded:", songs);  // Debugging log
  })
  .catch(error => console.log('Error loading songs:', error));

// Function to display artist information, including their bio
function loadArtists() {
  const artistList = document.getElementById("artist-list");
  artistList.innerHTML = "";  // Clear the list
  
  // Loop through each artist and display their information
  artists.forEach(artist => {
    const artistDiv = document.createElement("div");
    artistDiv.classList.add("artist");

    // Add artist name, bio, and image
    artistDiv.innerHTML = `
      <h3>${artist.name}</h3>
      <p>${artist.bio}</p>
      <img src="${artist.image}" alt="${artist.name}" class="artist-image">
    `;

    // Add albums for the artist
    artist.albums.forEach(album => {
      const albumDiv = document.createElement("div");
      albumDiv.classList.add("album");
      albumDiv.innerHTML = `
        <img src="${album.cover}" alt="${album.title}" class="album-cover">
        <h4>${album.title} (${album.year})</h4>
      `;
      
      // Add the songs for each album
      const songList = document.createElement("ul");
      album.songs.forEach(songId => {
        const song = songs.find(s => s.id === songId);
        if (song) {
          const songItem = document.createElement("li");
          songItem.textContent = song.title;
          songItem.onclick = () => playSong(song);
          songList.appendChild(songItem);
        }
      });

      albumDiv.appendChild(songList);
      artistDiv.appendChild(albumDiv);
    });

    artistList.appendChild(artistDiv);
  });
}

// Function to play a song when clicked
function playSong(song) {
  const audioPlayer = document.getElementById("audio-player");
  audioPlayer.src = song.file;
  document.getElementById("song-title").textContent = song.title;
  document.getElementById("song-artist").textContent = song.artist;
  audioPlayer.play();
    }
