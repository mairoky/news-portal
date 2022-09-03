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
        <a onclick="loadNews('${category.category_id}')" class="nav-link">${category.category_name}</a>
        `;
        categoryList.appendChild(listItem);
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
    console.log(news);
    notifyFunc(news);
    // sorting by total_views
    news.sort((a, b) => b.total_view - a.total_view);
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    news.forEach(singleNews => {
        console.log(singleNews);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col-md-6', 'col-12');
        newsDiv.innerHTML = `
        <div class="card mb-3 border-0">
        <div class="row g-0">
            <div class="col-12">
                <img src="${singleNews.image_url}" class="img-fluid">
            </div>
            <div class="col-12">
                <div class="card-body">
                    <h4 class="card-title">${singleNews.title}</h4>
                    <p class="card-text">This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a little bit longer.
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a little bit longer.
                    </p>
                    <div class="d-flex align-items-center">
                        <div class="author-info p-2 d-flex align-items-center">
                            <div class="image bg-primary rounded-circle">
                                <img src="" alt="" class="img-fluid">
                            </div>
                            <div class="info">
                                <p class="m-0">${singleNews.author.name ? singleNews.author.name : 'No Data Found!'}</p>
                                <p class="m-0"><small>${singleNews.author.published_date ? singleNews.author.published_date : 'No Data Found!'}</small></p>
                            </div>
                        </div>
                        <div class="news-views p-2">
                            <i class="fa-regular fa-eye"></i>
                            <span>1.5M</span>
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
const notifyFunc = (news) => {
    const notifyContainer = document.getElementById('notify');
    notifyContainer.textContent = '';
    if (news.length >= 0) {
        const notifyText = document.createElement('p');
        notifyText.classList.add('m-0');
        notifyText.innerText = `${news.length} items found!`;
        notifyContainer.appendChild(notifyText);
        notifyContainer.classList.remove('d-none');
    }
}