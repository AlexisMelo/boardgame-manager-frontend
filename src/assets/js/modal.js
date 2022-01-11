const modal = {
    selectTab(tabName) {
        let tabs = document.getElementsByClassName("tab");
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].style.display = "none";
            document
                .getElementById(`button${tabs[i].id}`)
                .classList.remove("selected");
        }
        document.getElementById(tabName).style.display = "flex";
        document.getElementById(`button${tabName}`).classList.add("selected");
    },
    openModal(modalElement) {
        modalElement.style.display = "block";
    },
    closeModal(modalElement) {
        modalElement.style.display = "none";
    }
}

export default modal