let btn = document.querySelector("#book-button");
let section = document.querySelector("#searched-book");
$("#searched-book").hide();


function addBook() {
    let url = "https://www.googleapis.com/books/v1/volumes?q=";
    let term = $("#book_title").val();
    let end = "&key=AIzaSyD1gy29-8kQs4nHEoslprFlSwMror9pOIY";
    let fullURL = url + term + end;
    console.log(fullURL);

    $.get(fullURL, function (data) {
        $("#book-pic").attr("src", data.items[0].volumeInfo.imageLinks.thumbnail);
        $("#title").html(data.items[0].volumeInfo.title);
        $("#author").html(data.items[0].volumeInfo.authors[0]);
        let pages = data.items[0].volumeInfo.pageCount;

        $("#pages").css("width", `${pages / 10}%`);
        $("#count").html(`${pages}`);
        $("#desc").html(data.items[0].volumeInfo.description);
        if (pages < 100) {
            $("#pages").css("background-color", "green");
            $("#pages").css("width", `8%`);
        } else if (pages < 200) {
            $("#pages").css("background-color", "green");
        } else if (pages < 500) {
            $("#pages").css("background-color", "orange");
        } else if (pages >= 500) {
            $("#pages").css("background-color", "red");
        }
        let i = 0;
        $("#link").show();
        try {
            while ((data.items[i].saleInfo.buyLink === undefined) && i < 10) {
                i++;
            }
        } catch (e) {
            $("#link").hide();
            $("#searched-book").show();
        }
        $("#link").attr("href", data.items[i].saleInfo.buyLink)
        $("#searched-book").show();


    })
}
btn.addEventListener('click', () => {
    addBook();
    // if ($("#book_title").val() != "") {
    //     section.style.display = "flex";
    // }
})




