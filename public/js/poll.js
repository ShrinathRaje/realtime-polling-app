const socket = io();
const URL = window.location.href;

document.getElementById('pollOptionsForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const submitVoteButton = document.getElementById('submitVote');
    submitVoteButton.classList.add('voted');
    submitVoteButton.setAttribute('disabled', 'true');
    submitVoteButton.innerHTML = 'Voted &#9989';

    const radioButtons = document.getElementsByClassName('pollOption');
    
    for(const button of radioButtons) {
        if(!button.checked) {
            button.setAttribute('disabled', 'true');
        }
    }

    const selectedOption = document.querySelector('input[name="pollOption"]:checked').value;

    const xhrPost = new XMLHttpRequest();

    xhrPost.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            //console.log('Form submission successful');
            socket.emit('voted', selectedOption);
        }
    };

    xhrPost.open('POST', URL, true);
    xhrPost.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
    xhrPost.send(`pollOption=${selectedOption}`);

});

const voteCountSpans = document.getElementsByClassName('voteCount');

socket.on('voted', (option) => {
    const n = parseInt(option);
    const oldCount = parseInt(voteCountSpans[n].innerHTML);
    voteCountSpans[n].innerHTML = oldCount + 1;
});

const copyText = document.getElementById('copyText');
copyText.value = URL;

document.getElementById('copyLink').addEventListener('click', (event) => {
    copyText.select();
    document.execCommand('copy');
    event.target.innerHTML = "Copied &#9989";
});