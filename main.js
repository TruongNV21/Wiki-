const  searchTermElem = document.querySelector('#input')
const searchResultElem = document.querySelector('#main ol')
// const urlFake = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info|extracts&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=debounce`'
// var url = "https://en.wikipedia.org/w/api.php"; 

searchTermElem.select();

searchTermElem.addEventListener('keyup', function (event) {
    search(event.target.value);
});

function render(data){
    let htmls =  [];
    htmls.push(`
    <p>kết quả tìm kiếm:</p>
    `)
    for(let i =0; i< params['limit'];i++){
        if(data[3][i]){
            htmls.push(`
            <li class="item-result-${i}">
                <a href='${data[3][i]}' class="title-link">
                    <h3 class="title">${data[1][i]}</h3>
                </a>
            </li>
            `)
        }
    }

    searchResultElem.innerHTML = htmls.join('')
}

const debounce = (fn, delay=500) => {
    let timeoutId;

    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn.apply(null, args);
        }, delay);
    };
};

var params = {
    action: "opensearch",
    search: "",
    limit: "5",
    namespace: "0",
    format: "json"
};


const search = debounce(async (inputValue)=>{
    if(!inputValue.trim()){
        searchResultElem.innerHTML = ''
        return ;
    }
    //
    let url = "https://en.wikipedia.org/w/api.php"; 
    url = url + "?origin=*";
    params['search'] = inputValue;
    Object.keys(params).forEach((key)=>{url += "&" + key + "=" + params[key];});
    //tạo url chuẩn với từ khóa tìm kiếm
    try{
        const res = await fetch(url)
        const searchResults = await res.json()
        console.log(searchResults)
        render(searchResults)
    }
    catch(error){
        console.log(error)
    }
})




