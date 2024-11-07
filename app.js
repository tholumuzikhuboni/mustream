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
