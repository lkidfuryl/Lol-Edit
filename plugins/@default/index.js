import './theme.css';

window.addEventListener('load', () => {
    // Wait for viewport root
    const interval = setInterval(() => {
        const manager = document.getElementById('rcp-fe-viewport-root')
        if (manager) {
            clearInterval(interval)

            const observer = new MutationObserver(mutations => {
                const backdrop = document.querySelector('.regalia-loaded')?.shadowRoot.querySelector('.regalia-profile-banner-backdrop.regalia-banner-loaded');
                if (backdrop) {
                    backdrop.setAttribute('style', 'opacity: 0.5; filter: grayscale(100%) brightness(3);');
                }

                const socialChatGroup = document.querySelectorAll('.group-header');
                for (let i = 0; i < socialChatGroup.length; i++) {
                    socialChatGroup[i].setAttribute('style', 'background: rgba(0,0,0,0); color: dimgray;');
                }

                const member_name = document.querySelectorAll('.member-name');
                for (let j = 0; j < member_name.length; j++) {
                    member_name[j].setAttribute('style', 'color: dimgray;');
                }
            });

            observer.observe(manager, {
                childList: true,
                subtree: true
            });
        }
    }, 500);
});
// Función para verificar si el contenedor de botón de reproducción existe
function checkForPlayButtonContainer() {
    var playButtonContainer = document.querySelector('.play-button-container');
    if (playButtonContainer) {
        clearInterval(intervalId); // Detener el intervalo de tiempo
        createVideoElement(playButtonContainer); // Crear y agregar el elemento de video
    }
}

// Función para crear y agregar el elemento de video
function createVideoElement(playButtonContainer) {
    var videoContainer = document.createElement('div');
    videoContainer.classList.add('video-container');
    
    var video = document.createElement('video');
    video.autoplay = true;
    video.loop = true;
    video.src = '/fe/lol-static-assets/videos/find-match-button-idle.webm';
    video.style.position = 'absolute';
    video.style.width = '258px';
    
    // Cambiar la dirección del video cuando el cursor entra y sale del elemento de video
    playButtonContainer.addEventListener('mouseenter', function() {
        video.src = '/fe/lol-static-assets/videos/find-match-button-hover.webm';
    });
    playButtonContainer.addEventListener('mouseleave', function() {
        video.src = '/fe/lol-static-assets/videos/find-match-button-idle.webm';
    });
    
    videoContainer.appendChild(video);
    playButtonContainer.appendChild(videoContainer);
}

// Verificar si el contenedor de botón de reproducción existe cada 500 ms
var intervalId = setInterval(checkForPlayButtonContainer, 500);
