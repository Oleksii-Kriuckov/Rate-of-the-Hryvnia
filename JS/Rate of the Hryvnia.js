window.onload = function () {
    let table = document.querySelector("#table");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            // localStorage.data = JSON.stringify(data);
            document.querySelector("#date").innerHTML = data[0].exchangedate;
            for (i = 0; i < data.length; i++) {
                switch (data[i].cc) {
                    case "USD": {
                        table.childNodes[5].innerHTML = data[i].rate;
                        break;
                    }
                    case "EUR": {
                        table.childNodes[11].innerHTML = data[i].rate;
                        break;
                    }
                    case "GBP": {
                        table.childNodes[17].innerHTML = data[i].rate;
                        break;
                    }
                    case "PLN": {
                        table.childNodes[23].innerHTML = data[i].rate;
                        break;
                    }
                    case "RUB": {
                        table.childNodes[29].innerHTML = data[i].rate;
                        break;
                    }
                }
            }
        }
    }
    xhr.send();
}