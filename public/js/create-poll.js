let optionNumber = 0;

document.getElementById('addOption').addEventListener('click', createOption);
document.getElementById('main-form').addEventListener('submit', validateForm);

function createOption(event) {
    event.preventDefault();

    const n = ++optionNumber;

    const div = document.createElement('div');
    div.setAttribute('class', 'form-group');

    const option = `
        <div class="form-group">
            <label for="opt${n}"><span class="label-text">Option ${n}</span></label>
            <input type="text" name="options" id="opt${n}" class="form-control" placeholder="max 30 characters..." maxlength="30" required>
        </div>
    `;

    div.innerHTML = option;

    document.getElementById('options').appendChild(div);
    document.getElementById(`opt${n}`).focus();

    event.target.scrollIntoView({behavior: "smooth"});
}

function validateForm(event) {
    event.preventDefault();
    
    if(optionNumber < 2) {
        const msg = 'error: minimum 2 options required!';
        document.getElementById('error-msg').innerHTML = msg;
    } else {
        document.getElementById('error-msg').innerHTML = '';
        event.target.submit();
    }
}