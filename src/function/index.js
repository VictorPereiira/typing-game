import { $, $$ } from "../utils/snippets";
import { Menu, MenuJS } from "../components/Menu";
import get_data from "../database/get_data";


async function activeButtonsFun() {
    // Menu
    await MenuJS()

    // // Time
    // let time_interval = null
    // $("#home .main__button").addEventListener("click", async () => {
    //     $("#menu") ? $("#menu").remove() : true;
    //     const { speedTime } = await get_data()
    //     $("#home .main__button").remove()
    //     time_interval = setInterval(updateClock, +speedTime)
    // })

    // async function updateClock() {
    //     // if (pause) return
    //     const time = Number($(".header__time").innerText.slice(0, -1))
    //     if (time > 0) {
    //         $(".header__time").innerText = `${time - 1}s`
    //     } else {
    //         clearInterval(time_interval)
    //         await gameOver()
    //     }
    // }


    // async function gameOver() {
    //     $("#home").classList.add('blur');
    //     document.body.insertAdjacentHTML('beforeend', await CardGameOver())
    // }
}



export default activeButtonsFun;