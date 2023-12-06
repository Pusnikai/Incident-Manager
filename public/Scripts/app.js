/* SPA --> The Single page app */
(function() {
    function Start() {
        console.log("App Started")
        let deleteButtons = document.querySelectorAll('.btn-danger');
        for (button of deleteButtons) {
            button.addEventListener('click', (event) => {
                //this is for the delete confirmation 
                if (!confirm("Are you sure want to delete this assignment?")) {
                    event.preventDefault();
                    window.location.assign('/assignments');
                    //this redirects the user if they cancel
                }
            });
        }
    }
    window.addEventListener("load", Start);
})();