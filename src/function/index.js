import { Menu, MenuJS } from "../components/Menu";
import { BtnStartGameJS } from "../components/BtnStartGame";

async function activeButtonsFun() {
    await MenuJS()
    await BtnStartGameJS()
}

export default activeButtonsFun;