
// fetch category from api
const loadNewsCategory = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.data.news_category);
    }
    catch (error) {
        console.error(error);
    }
}
loadNewsCategory();

// display category
const displayCategories = categories => {
    const categoryList = document.getElementById('category-list');
    categories.forEach(category => {
        const listItem = document.createElement('li');
        listItem.classList.add('nav-item');
        listItem.innerHTML = `
        <a onclick="loadNews('${category.category_id}')" class="nav-link category-item">${category.category_name}</a>
        `;
        categoryList.appendChild(listItem);
    });
    // active category item
    const categoryItem = document.querySelectorAll('.category-item');
    categoryItem[7].classList.add('active');
    categoryItem.forEach(item => {
        item.addEventListener('click', function () {
            categoryItem.forEach(itm => itm.classList.remove('active'));
            this.classList.add('active');
        });
    });
}


// load news
const loadNews = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data);
    }
    catch (error) {
        console.error(error);
    }
}

// display news
const displayNews = news => {
    notifyFunc(news);
    // sorting by total_views
    news.sort((a, b) => b.total_view - a.total_view);
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    news.forEach(singleNews => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col-12');
        newsDiv.innerHTML = `
        <div onclick="newsDetails('${singleNews._id}')" class="card border-0 p-3" data-bs-toggle="modal" data-bs-target="#newsModal">
        <div class="row g-0 align-items-center">
            <div class="col-3">
                <img src="${singleNews.thumbnail_url}" class="img-fluid">
            </div>
            <div class="col-9">
                <div class="card-body">
                    <h4 class="card-title">${singleNews.title}</h4>
                    <p class="card-text">${singleNews.details.slice(0, 200)}.</p>
                    <p class="card-text">${singleNews.details.slice(201, 300)}...</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="author-info p-2 d-flex align-items-center">
                            <div class="image">
                                <img src="${singleNews.author.img}" alt="" class="img-fluid rounded-circle">
                            </div>
                            <div class="info ms-3">
                                <p class="m-0">${singleNews.author.name ? singleNews.author.name : 'No Data Found!'}</p>
                                <p class="m-0"><small>${singleNews.author.published_date ? singleNews.author.published_date : 'No Data Found!'}</small></p>
                            </div>
                        </div>
                        <div class="news-views p-2">
                            <i class="fa-regular fa-eye"></i>
                            <span class="ms-2">${singleNews.total_view ? singleNews.total_view : 'No data found!'}</span>
                        </div>
                        <div class="rating p-2">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="read-more-icon p-2">
                            <i class="fa-solid fa-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
        newsContainer.appendChild(newsDiv);
    });

}

// notify
const notifyFunc = news => {
    const notifyContainer = document.getElementById('notify');
    notifyContainer.textContent = '';
    if (news.length >= 0) {
        const notifyText = document.createElement('p');
        notifyText.classList.add('m-0');
        notifyText.innerText = `${news.length > 0 ? news.length + ' Items Found!' : 'No Item Found!'}`;
        notifyContainer.appendChild(notifyText);
        notifyContainer.classList.remove('d-none');
    }
}

// fetch news details
const newsDetails = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        showNewsDetails(data.data[0]);
    }
    catch (error) {
        console.error(error);
    }
}
// show news details on modal
const showNewsDetails = (newsDetail) => {
    const newsTitle = document.getElementById('newsModalLabel');
    newsTitle.innerText = `${newsDetail.title}`;
    const newsDetailModal = document.getElementById('news-detail');
    newsDetailModal.innerHTML = `
        <h5 class="">Rating: ${newsDetail.rating.number ? newsDetail.rating.number : 'No data found!'}, Badge: ${newsDetail.rating.badge ? newsDetail.rating.badge : 'No data found!'}</h5>
        <div class="d-flex justify-content-between align-items-center">
            <div class="author-info p-2 d-flex align-items-center">
                <div class="image">
                    <img src="${newsDetail.author.img}" alt="" class="img-fluid rounded-circle">
                </div>
                <div class="info ms-3">
                    <p class="m-0">${newsDetail.author.name ? newsDetail.author.name : 'No Data Found!'}</p>
                    <p class="m-0"><small>${newsDetail.author.published_date ? newsDetail.author.published_date : 'No Data Found!'}</small></p>
                </div>
            </div>
            <div class="news-views p-2">
                <i class="fa-regular fa-eye"></i>
                    <span class="ms-2">${newsDetail.total_view ? newsDetail.total_view : 'No data found!'}</span>
            </div>
        </div>
        <div class="mt-2">
        <img src="${newsDetail.image_url}" class="img-fluid w-100">
        </div>
        <p class="mt-3">${newsDetail.details}</p>
    `;
}