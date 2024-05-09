var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import reduceCoins from './reducers/coins.js';
import Cache from './Cache.js';
import { setupEventListeners } from './event-Listener/eventListener.js';
import { CryptoChart } from './chart.js';
const cache = Cache.getInstance();
const selectedCoins = new Set();
const cryptoChart = new CryptoChart();
let addedCoins = new Set();
export function getCoins() {
    return __awaiter(this, void 0, void 0, function* () {
        const cacheResponse = yield cache.getData('https://api.coingecko.com/api/v3/coins/list');
        // const cacheResponse = await cache.getData('coins.json');  
        const coins = (cacheResponse);
        return coins;
    });
}
function getCoinData(coinId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cacheResponse = yield cache.getData(`https://api.coingecko.com/api/v3/coins/${coinId}`);
        const coinData = (cacheResponse);
        return coinData;
    });
}
export function coinsContainerClicked(e) {
    return __awaiter(this, void 0, void 0, function* () {
        if (e.target instanceof HTMLElement) {
            const element = e.target;
            if (element.tagName === 'INPUT' && element.type === 'checkbox') {
                console.log('Toggle clicked:', element);
                handleCheckboxToggle(element);
            }
            else if (element.id.startsWith('more-info-')) {
                const coinId = element.id.substring('more-info-'.length);
                const coinData = yield getCoinData(coinId);
                console.log(coinData);
                document.getElementById(`data-container-${coinId}`).innerHTML = `
                <img src="${coinData.image.thumb}"/> <br>
                usd: ${coinData.market_data.current_price.usd}$ <br>
                eur: ${coinData.market_data.current_price.eur}€ <br>
                ils: ${coinData.market_data.current_price.ils}₪
            `;
            }
        }
    });
}
function handleCheckboxToggle(checkbox) {
    const coinId = checkbox.id.substring('toggle-'.length);
    if (checkbox.checked && selectedCoins.size >= 5) {
        const switchConfirmation = confirm('You can only select up to 5 coins. Do you want to switch coins?');
        if (switchConfirmation) {
            handleSwitchCoins(coinId);
        }
        else {
            checkbox.checked = false;
        }
    }
    else {
        if (checkbox.checked) {
            selectedCoins.add(coinId);
            addCoinToLiveReports(coinId);
        }
        else {
            selectedCoins.delete(coinId);
            removeCoinFromLiveReports(coinId);
        }
        console.log(`Selected coins: ${Array.from(selectedCoins).join(', ')}`);
        cryptoChart.updateSelectedCoins(selectedCoins);
        localStorage.setItem('selectedCoins', JSON.stringify(Array.from(selectedCoins)));
    }
}
export function addCoinToLiveReports(coinId) {
    if (!addedCoins.has(coinId)) {
        const coinCard = document.getElementById('coin-card-' + coinId);
        if (coinCard) {
            const clone = coinCard.cloneNode(true);
            clone.id = 'live-report-' + coinId;
            document.getElementById('live-reports').appendChild(clone);
        }
        addedCoins.add(coinId);
    }
}
export function removeCoinFromLiveReports(coinId) {
    const liveReport = document.getElementById('live-report-' + coinId);
    if (liveReport) {
        liveReport.remove();
        const homeTabCheckbox = document.getElementById('toggle-' + coinId);
        if (homeTabCheckbox) {
            homeTabCheckbox.checked = false;
        }
        cryptoChart.stopChartForCoin(coinId);
        selectedCoins.delete(coinId);
        console.log(`Removed coin ${coinId} from live reports and stopped chart updates.`);
    }
}
function handleSwitchCoins(newCoinId) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentSelectedCoins = Array.from(selectedCoins);
        const coinToRemove = yield promptForCoinToRemove(currentSelectedCoins);
        if (coinToRemove) {
            selectedCoins.delete(coinToRemove);
            console.log(`Removed coin ${coinToRemove} from live reports.`);
            selectedCoins.add(newCoinId);
            console.log(`Switched ${coinToRemove} with ${newCoinId}`);
            updateUIAndCharts(coinToRemove, newCoinId);
        }
    });
}
function updateUIAndCharts(removedCoinId, addedCoinId) {
    removeCoinFromLiveReports(removedCoinId);
    addCoinToLiveReports(addedCoinId);
    cryptoChart.updateChart();
    alert(`Switched ${removedCoinId} with ${addedCoinId}`);
}
function promptForCoinToRemove(coinsArray) {
    let userChoice = null;
    while (userChoice === null) {
        const userInput = prompt(`You have selected more than 5 coins. Choose a coin to remove:\n${coinsArray.join(', ')}`);
        if (userInput === null) {
            break;
        }
        const normalizedInput = userInput.trim().toLowerCase();
        if (coinsArray.indexOf(normalizedInput) !== -1) {
            userChoice = normalizedInput;
        }
        else {
            alert(`Invalid input. Please choose a coin from the list.`);
        }
    }
    return userChoice;
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    setupEventListeners(selectedCoins);
    const coins = yield getCoins();
    displayCoins(coins.slice(0, 100));
    function displayCoins(coinsToDisplay) {
        const html = reduceCoins(coinsToDisplay);
        document.getElementById('coins-container').innerHTML = html;
    }
}))();
export { addedCoins };
