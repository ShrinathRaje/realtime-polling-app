let optionNumber = 0;

document.getElementById('addOption').addEventListener('click', createOption);
document.getElementById('main-form').addEventListener('submit', validateForm);

function createOption(event) {
    event.preventDefault();

    const n = ++optionNumber;

    const div = document.createElement('div');

    const option = `
        <div class="form-group" id="opt${n}-fg">
            <input type="text" name="options" id="opt${n}" class="form-control" placeholder="max 30 characters..." maxlength="30" required>
            <button class="btn btn-danger" id="opt${n}-rm">&#10008;</button>
        </div>
    `;

    div.innerHTML = option;

    document.getElementById('options').appendChild(div);
    document.getElementById(`opt${n}`).focus();

    event.target.scrollIntoView({behavior: "smooth"});

    document.getElementById(`opt${n}-fg`).addEventListener('click', removeOption);

    //console.log(optionNumber);
}

function validateForm(event) {
    event.preventDefault();
    
    if(optionNumber < 2) {
        const msg = 'error: minimum 2 options required!';
        document.getElementById('error-msg').innerHTML = msg;
        setTimeout(clearMsg, 2000);
    } else {
        clearMsg();
        event.target.submit();
    }
}

function removeOption(event) {
    event.preventDefault();
    
    if(event.target.nodeName !== "BUTTON")
        return;

    const optId = event.target.id.substring(3).split('-')[0];
    document.getElementById(`opt${optId}-fg`).remove();
    --optionNumber;

    //console.log(optionNumber);
}

function clearMsg() {
    document.getElementById('error-msg').innerHTML = '';
}