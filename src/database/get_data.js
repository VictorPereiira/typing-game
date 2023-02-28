async function get_data() {
    return JSON.parse(localStorage.getItem("typingGame"))
}

export default get_data;