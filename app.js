let artists = [];
let songs = [];

fetch('data/artists.json')
  .then(response => response.json())
  .then(data => {
    artists = data;
    loadArtists();
  })
  .catch(error => console.error('Error loading artists:', error));

fetch('data/songs.json')
  .then(response => response.json())
  .then(data => {
    songs = data;
  })
  .catch(error => console.error('Error loading songs:', error));

function loadArtists() {
  const artistList = document.getElementById("artist-list");
  artistList.innerHTML = "";

  artists.forEach(artist => {
    const artistDiv = document.createElement("div");
    artistDiv.classList.add("artist");
    artistDiv.innerHTML = `
      <img src="${artist.image}" alt="${artist.name}">
      <div class="artist-name" onclick="showArtistBio('${artist.name}')">${artist.name}</div>
    `;
    artistList.appendChild(artistDiv);
  });

  loadAlbums();  // Load albums after artists are loaded
}

function loadAlbums() {
  const albumList = document.getElementById("album-list");
  albumList.innerHTML = "";

  artists.forEach(artist => {
    artist.albums.forEach(album => {
      const albumDiv = document.createElement("div");
      albumDiv.classList.add("album");
      albumDiv.innerHTML = `
        <img src="${album.cover}" alt="${album.title}">
        <h4>${album.title} (${album.year})</h4>
      `;
      albumDiv.onclick = () => loadAlbumSongs(album);
      albumList.appendChild(albumDiv);
    });
  });
}

function loadAlbumSongs(album) {
  // Implement functionality to display songs from the selected album
  console.log('Loading songs for album:', album.title);
}

function showArtistBio(artistName) {
  const artist = artists.find(a => a.name === artistName);
  if (artist) {
    const bioModal = document.getElementById("bio-modal");
    const bioContent = document.getElementById("bio-content");
    bioContent.innerHTML = artist.bio;
    bioModal.style.display = "flex";
  }
}

function closeModal() {
  document.getElementById("bio-modal").style.display = "none";
}
function loadAlbums() {
  const albumList = document.getElementById("album-list");
  albumList.innerHTML = "";

  artists.forEach(artist => {
    artist.albums.forEach(album => {
      const albumDiv = document.createElement("div");
      albumDiv.classList.add("album");
      albumDiv.innerHTML = `
        <img src="${album.cover}" alt="${album.title}">
        <h4>${album.title} (${album.year})</h4>
      `;
      albumDiv.onclick = () => openAlbumPage(album);
      albumList.appendChild(albumDiv);
    });
  });
}

function openAlbumPage(album) {
  // Store the album data in localStorage
  localStorage.setItem('selectedAlbum', JSON.stringify(album));

  // Navigate to the album page
  window.location.href = 'album.html';
                                              }
// Load album data from localStorage and populate the page
document.addEventListener("DOMContentLoaded", function() {
  const selectedAlbum = JSON.parse(localStorage.getItem('selectedAlbum'));

  if (selectedAlbum) {
    // Set the album title
    document.getElementById("album-title").textContent = selectedAlbum.title;

    // Load the album songs into the playlist
    const albumSongsList = document.getElementById("album-songs-list");
    selectedAlbum.songs.forEach(song => {
      const songItem = document.createElement("li");
      songItem.textContent = `${song.title} - ${song.artist}`;
      albumSongsList.appendChild(songItem);
    });

    // Load top played songs (mock data for now)
    const topPlayedList = document.getElementById("top-played-list");
    // Example top played songs (this could be fetched from a server in the future)
    const topPlayedSongs = getTopPlayedSongs();
    topPlayedSongs.forEach(song => {
      const songItem = document.createElement("li");
      songItem.textContent = `${song.title} - ${song.artist}`;
      topPlayedList.appendChild(songItem);
    });

    // Load recommended songs (mock data for now)
    const recommendedSongsList = document.getElementById("recommended-songs-list");
    const recommendedSongs = getRecommendedSongs();
    recommendedSongs.forEach(song => {
      const songItem = document.createElement("li");
      songItem.textContent = `${song.title} - ${song.artist}`;
      recommendedSongsList.appendChild(songItem);
    });
  }
});

// Mock top played songs (this should be dynamic)
function getTopPlayedSongs() {
  return [
    { title: "Song 1", artist: "Artist 1" },
    { title: "Song 2", artist: "Artist 2" },
    { title: "Song 3", artist: "Artist 3" }
  ];
}

// Mock recommended songs (this should be dynamic based on user preferences)
function getRecommendedSongs() {
  return [
    { title: "Song A", artist: "Artist A" },
    { title: "Song B", artist: "Artist B" },
    { title: "Song C", artist: "Artist C" }
  ];
    }

document.addEventListener("DOMContentLoaded", function() {
    // Fetch the selected album from localStorage
    const selectedAlbum = JSON.parse(localStorage.getItem('selectedAlbum'));
    
    if (selectedAlbum) {
        // Set the album title
        document.getElementById("album-title").textContent = selectedAlbum.title;

        // Display the album's songs in the list
        const albumSongsList = document.getElementById("album-songs-list");
        selectedAlbum.songs.forEach((song, index) => {
            const songItem = document.createElement("li");
            songItem.textContent = `${song.title} - ${song.artist}`;
            albumSongsList.appendChild(songItem);
        });

        // Set up the music player functionality
        let currentSongIndex = 0;
        let isPlaying = false;
        let audio = new Audio(selectedAlbum.songs[currentSongIndex].audioUrl);

        // Play/Pause functionality
        const playBtn = document.getElementById("play-btn");
        playBtn.addEventListener("click", () => {
            if (isPlaying) {
                audio.pause();
                playBtn.textContent = "Play";
            } else {
                audio.play();
                playBtn.textContent = "Pause";
            }
            isPlaying = !isPlaying;
        });

        // Next song functionality
        const nextBtn = document.getElementById("next-btn");
        nextBtn.addEventListener("click", () => {
            currentSongIndex = (currentSongIndex + 1) % selectedAlbum.songs.length;
            audio.src = selectedAlbum.songs[currentSongIndex].audioUrl;
            audio.play();
            playBtn.textContent = "Pause";
            isPlaying = true;
        });

        // Previous song functionality
        const prevBtn = document.getElementById("prev-btn");
        prevBtn.addEventListener("click", () => {
            currentSongIndex = (currentSongIndex - 1 + selectedAlbum.songs.length) % selectedAlbum.songs.length;
            audio.src = selectedAlbum.songs[currentSongIndex].audioUrl;
            audio.play();
            playBtn.textContent = "Pause";
            isPlaying = true;
        });

        //
