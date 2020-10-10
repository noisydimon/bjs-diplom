

const LogoutButton1 = new LogoutButton;
LogoutButton1.action = () => ApiConnector.logout(responseLogout => {
    if (responseLogout.success) {
        location.reload()
    };
}
);

ApiConnector.current(checkResponse => {
    if (checkResponse.success) {
        console.log(checkResponse)
        ProfileWidget.showProfile(checkResponse.data)

    }
}
)

const RatesBoard1 = new RatesBoard;
console.log(RatesBoard1)

function getStocks() {
    ApiConnector.getStocks(stockResponse => {
        console.log(stockResponse.data);
        if (stockResponse.success) {
            RatesBoard1.clearTable();
            console.log(RatesBoard1);
            RatesBoard1.fillTable(stockResponse.data);
        };
    }
    )
}

setInterval(getStocks(), 60000);




const MoneyManager1 = new MoneyManager
MoneyManager1.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, responseAddMoney => {
        if (responseAddMoney.success) {
            ProfileWidget.showProfile(responseAddMoney.data);
            MoneyManager1.setMessage(true,"Баланс пополнен");
        } else {
            MoneyManager1.setMessage(false, responseAddMoney.error)
        }
    }
    )

}

MoneyManager1.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, responseConvert => {
        if (responseConvert.success) {
            ProfileWidget.showProfile(responseConvert.data);

        } else {
            MoneyManager1.setMessage(false, responseAddMoney.error)
        }

    }
    )
}

MoneyManager1.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, responseTransfer => {
        if (responseTransfer.success) {
            ProfileWidget.showProfile(responseTransfer.data);
            MoneyManager1.setMessage(true,"Перевод успешно выполнен");
        } else {
            MoneyManager1.setMessage(false, responseTransfer.error)
        }

    }
    )
}

const FavoritesWidget1 = new FavoritesWidget

ApiConnector.getFavorites(checkFavorites => {
    if (checkFavorites.success) {

        FavoritesWidget1.clearTable()
        FavoritesWidget1.fillTable(checkFavorites.data)
        MoneyManager1.updateUsersList(checkFavorites.data)
    }
}
)

FavoritesWidget1.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, responseAddFavorites => {
        if (responseAddFavorites.success) {
            FavoritesWidget1.clearTable()
            FavoritesWidget1.fillTable(responseAddFavorites.data)
            MoneyManager1.updateUsersList(responseAddFavorites.data)
            MoneyManager1.setMessage(true,"Пользователь успешно добавлен");
        } else {
            MoneyManager1.setMessage(false, responseTransfer.error)
        }
    }
    )
}


FavoritesWidget1.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, responseDeleteFavorites => {
        if (responseDeleteFavorites.success) {
            FavoritesWidget1.clearTable()
            FavoritesWidget1.fillTable(responseDeleteFavorites.data)
            MoneyManager1.updateUsersList(responseDeleteFavorites.data)
            MoneyManager1.setMessage(true,"Пользователь успешно удален");
        } else {
            MoneyManager1.setMessage(false, responseTransfer.error)
        }
        
    }
    )
}

