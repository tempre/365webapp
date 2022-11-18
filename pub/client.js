var socket = io();

let app = Vue.createApp({
    data() {
        return {
            submit: false,
            text: "",
            author: "aks"
        };
    },
    methods: {
        message_send() {
            if(this.submit && this.text != "") {
                socket.emit("message", this.text, this.author);
                this.text = "";
            }
        },
    },
    computed: {
    },
    mounted() {
        socket.emit("message", "test", "aks");
    },
    created() {
        window.addEventListener('keydown', (e) => {
            if (e.key == 'Enter') {
                this.submit = true;
            }
        });

        window.addEventListener('keyup', (e) => {
            if(e.key == 'Enter') {
                this.submit = false;
            }
        });
    },
}).mount('#app');
