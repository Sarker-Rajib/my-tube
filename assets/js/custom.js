
fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then(res => res.json())
    .then(data => {
        const categories = data.data;
        const buttonWrapper = document.getElementById("button-wrapper");
        categories.forEach(element => {
            const button = document.createElement('button');
            button.innerText = element.category;
            button.classList.add("button-custom");
            button.addEventListener('click', () => {
                getData(`${element.category_id}`);
            });
            buttonWrapper.appendChild(button);
        });
    })
    .catch(err => console.log(err));
// ------

let dataForSort = [];

const getData = (id) => {
    const contentWrapper = document.getElementById("content-wrapper");
    contentWrapper.innerHTML = '';

    fetch(`https://openapi.programming-hero.com/api/videos/category/${id ? id : 1000}`)
        .then(res => res.json())
        .then(data => {
            const alldata = data.data;
            dataForSort = alldata
            // console.log(dataForSort.length);

            if (dataForSort.length != 0) {
                createBtn()
            }
            else {
                document.getElementById('sort').innerHTML = ''
            }

            if (alldata.length > 0) {
                alldata.forEach(item => {
                    const column = document.createElement('div');
                    let minutes;
                    let hours;
                    let days;
                    let years;
                    // console.log(item);
                    if (item?.others?.posted_date) {
                        seconds = parseFloat(item?.others?.posted_date)
                        // console.log(seconds);
                        const minutesP = seconds / 60;
                        minutes = Math.floor(minutesP % 60)
                        const hourss = Math.floor(minutesP / 60)
                        hours = Math.floor(hourss % 24)
                        const dayss = Math.floor(hourss / 24)
                        days = Math.floor(dayss % 365)
                        years = Math.floor(dayss / 365)
                    }
                    // console.log(days);
                    column.classList.add('col-md-6', 'col-lg-4', 'col-xl-3');
                    const cardDiv = document.createElement('div');
                    cardDiv.classList.add('card', 'h-100', 'overflow-hidden');
                    cardDiv.innerHTML = `
                        <div class="overflow-hidden position-relative" style="height: 175px">
                            <img class="card-img-top" src="${item.thumbnail}" alt="Card image cap">
                            <div class="text-end ${minutes ? '' : 'd-none'} position-absolute w-100" style="z-index:999; bottom:0; left:0; font-size:12px">
                                <p class="text-white bg-dark px-3 py-1 text-end ${minutes ? '' : 'd-none'}">${years ? years + " Years" : ''} ${days ? days + " Days" : ''} ${hours} Hours ${minutes} Minutes ago</p>
                            </div>
                        </div>
                        <div class="card-body">

                            <div class="d-flex align-items-start">
                                <img width="30" height="30" class="me-2 rounded-circle " src="${item?.authors[0]?.profile_picture}" alt="Card image cap">
                                <div>
                                    <h5 class="card-title">
                                    ${item.title}
                                    </h5>
                                    <p class="card-text d-flex align-items-center">${item?.authors[0]?.profile_name} 
                                    <img width="20" class="${item?.authors[0] && item.authors[0].verified ? '' : 'd-none'} ms-2" src="assets/image/veri.avif" alt="Card image cap">
                                    </p>
                                    <p>${item?.others?.views} Views</p>
                                </div>
                            </div>
                        </div>
                    `;
                    column.appendChild(cardDiv);
                    contentWrapper.appendChild(column);
                });
            }
            else {
                contentWrapper.innerHTML = `
                <div class="text-center PT-5">
                    <img class="img-fluid" style="max-width:250px" src="https://cdn.vectorstock.com/i/preview-1x/41/65/no-data-empty-file-folder-not-found-information-vector-46334165.jpg" alt="Card image cap">
                    <h3>No contents Found</h3>
                </div>
                `
            }
        })
        .catch(err => console.log(err));
};

const sortTheData = () => {
    const contentWrapper = document.getElementById("content-wrapper");
    contentWrapper.innerHTML = '';
    // console.log(dataForSort);

    const sortedData = dataForSort.sort((a, b) => {
        // console.log(parseInt(a.others.views));

        return parseInt(b.others.views) - parseInt(a.others.views)
    });

    sortedData.forEach(item => {
        const column = document.createElement('div');
        let minutes;
        let hours;
        let days;
        let years;
        // console.log(item);
        if (item?.others?.posted_date) {
            seconds = parseFloat(item?.others?.posted_date)
            // console.log(seconds);
            const minutesP = seconds / 60;
            minutes = Math.floor(minutesP % 60)
            const hourss = Math.floor(minutesP / 60)
            hours = Math.floor(hourss % 24)
            const dayss = Math.floor(hourss / 24)
            days = Math.floor(dayss % 365)
            years = Math.floor(dayss / 365)
        }
        // console.log(days);
        column.classList.add('col-md-6', 'col-lg-4', 'col-xl-3');
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'h-100');
        cardDiv.innerHTML = `
            <div class="overflow-hidden position-relative" style="height: 175px">
                <img class="card-img-top" src="${item.thumbnail}" alt="Card image cap">
                <div class="text-end ${minutes ? '' : 'd-none'} position-absolute w-100" style="z-index:999; bottom:0; left:0; font-size:12px">
                    <p class="text-white bg-dark px-3 py-1 text-end ${minutes ? '' : 'd-none'}">${years ? years + " Years" : ''} ${days ? days + " Days" : ''} ${hours} Hours ${minutes} Minutes ago</p>
                </div>
            </div>
            <div class="card-body">

                <div class="d-flex align-items-start">
                    <img width="30" height="30" class="me-2 rounded-circle " src="${item?.authors[0]?.profile_picture}" alt="Card image cap">
                    <div>
                        <h5 class="card-title">
                        ${item.title}
                        </h5>
                        <p class="card-text d-flex align-items-center">${item?.authors[0]?.profile_name} 
                        <img width="20" class="${item?.authors[0] && item.authors[0].verified ? '' : 'd-none'} ms-2" src="assets/image/veri.avif" alt="Card image cap">
                        </p>
                        <p>${item?.others?.views} Views</p>
                    </div>
                </div>
            </div>
        `;
        column.appendChild(cardDiv);
        contentWrapper.appendChild(column);
    });
};

const createBtn = () => {
    const sortDiv = document.getElementById('sort');
    sortDiv.innerHTML = '';
    const sortBtn = document.createElement('button');
    sortBtn.classList.add('btn', 'sort-button');
    sortBtn.innerText = "Sort By View";
    sortBtn.addEventListener('click', () => sortTheData())
    sortDiv.appendChild(sortBtn);
};

getData();