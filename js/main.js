document.querySelector('#search').onclick = (e) => {
    e.preventDefault();
    console.log("working!");
    e.preventDefault()
    form = document.querySelector('form')
    qs = new URLSearchParams(new FormData(form))
    req = 'https://b2lciyizbpsdcjil2bemghqlri0pebta.lambda-url.us-east-1.on.aws'+ '/?' + qs
    console.log(req)
    console.log(qs.toString())
    fetch(req)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        content_container = document.querySelector('.container');
        content = ''
        for (let r of data.data) {
            header = ''
            if (r.comments == '-' ) {
                header = '<header>' + r.category + '</header>'
            } else {
                header = `<header class="tooltip">${r.category}
                        <span class="tooltiptext">${r.comments}</span>
                    </header>`
            }
            content += ` <div class="card" name="test">
                <div style="height: 160px; display: flex; flex-direction: column">
                    <header>${r.label}</header>
                    ${header}
                    <span style="flex: 1; display: flex; align-items: center; font-size: 12px;">
                        ${r.answer}
                    </span>
                </div>
                <div style="height: 1px; background-color: black"></div>
                <div style="height: 70px; justify-content: center;">
                    <details>
                        <summary>Answer</summary>
                        ${r.question}
                    </details></div>
                <footer>
                    ${r.air_date}
                </footer>
            </div>`
        }
        content_container.innerHTML += content;
    });
}