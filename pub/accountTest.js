let myApp = Vue.createApp({
    data() {
        name: ""
        password: ""
        picture: ""

        return {
            name: "",
            password: "",
            picture: ""
        }
    },
    methods: {
        createAccount() {
            this.name = document.getElementById("name").value;
            this.pass = document.getElementById("pass").value;
            this.picture = document.getElementById("file").value;
            if (this.pass != (document.getElementById("cpass").value)) { //TODO: add password requirement (8 characters long), hash the password using Sha2-256
                console.log("Passwords don't match");
            }
            //TODO: check user list for existing usernames, if not already taken

        },
        loadImage() {
            this.picture = document.getElementById("avatar");

            console.log("Image grabbed ");
        }
    },
    computed: {
        message: function () {
            if (false) {
                return "Password Error";
            } else if (false) {
                return "Username is taken";
            }
            return "Welcome!";
        }
    }

}).mount("#app");