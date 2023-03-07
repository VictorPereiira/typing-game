import { Menu, MenuJS } from "../components/Menu";
import { BtnStartGameJS } from "../components/BtnStartGame";


async function activeButtonsFun() {
    // Menu
    await MenuJS()
    // await InputJS()
    await BtnStartGameJS()


    // async function gameOver() {
    //     $("#home").classList.add('blur');
    //     document.body.insertAdjacentHTML('beforeend', await CardGameOver())
    // }
}



export default activeButtonsFun;