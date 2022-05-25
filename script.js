const button = document.getElementById('button')
const audioElement = document.getElementById('audio')

// DISABLE/ENABLE BUTTON
function toggleButton() {
    button.disabled = !button.disabled;
}

//PASSING JOKE TO VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '<API KEY HERE>',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
      });
}

// GET JOKES FROM JOKE API
async function getJokes() {
    let joke = '';
    const apiURL = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
       const response = await fetch(apiURL);
       const data = await response.json();
       if (data.setup) {
           joke = `${data.setup} ... ${data.delivery}`;
       } else {
           joke = data.joke;
       }

       // TEXT-TO-SPEECH
       tellMe(joke);
       // DISABLE BUTTON
       toggleButton();
    } catch (error) {
        // CATCH ERRORS
        console.log('OOPS', error);
    }
}

// EVENT LISTENERS
button.addEventListener('click', getJokes);
audio.addEventListener('ended', toggleButton);