const button = document.querySelector("input");
const table = document.querySelector("table");

const getRate = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                data.splice(56);
                document.querySelector("#date").innerHTML = "на " + data[0].exchangedate;

                let filter = data.filter((el) => {
                    return el.rate > 25
                })
                console.log(filter)
                filter.forEach((element) => {
                    if (element.cc !== "XDR") {
                        let tr = document.createElement("tr");
                        table.append(tr);
                        for (i = 0; i < 3; i++) {
                            let td = document.createElement("td");
                            tr.append(td);
                        }
                        let first = tr.firstChild;
                        first.innerHTML = element.txt;
                        first.nextSibling.innerHTML = element.cc;
                        tr.lastChild.innerHTML = element.rate.toFixed(2);
                    }
                });
            } else {
                let div = document.querySelector("main").lastChild.previousSibling;
                div.classList.add("error");
                if (xhr.status == 400) {
                    document.querySelector(".error").innerHTML = "Status code: 400, клієнська помилка"
                }
                if (xhr.status == 500) {
                    document.querySelector(".error").innerHTML = "Status code: 500, серверна помилка"
                }
            }
        }
    }

    xhr.send();
    button.removeEventListener('click', getRate)
}

button.addEventListener('click', getRate)