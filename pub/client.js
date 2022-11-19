var socket = io();

const MESSAGE    = 0;
const USER       = 1;
const EVENT_SIZE = 2;

let app = Vue.createApp({
    data() {
        return {
            submit: false,
            text: "",
            author: "aks",
            history: [],
        };
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
    methods: {
        message_send() {
            if(this.submit && this.text != "") {
                socket.emit("event", MESSAGE ,{"message": this.text, "author": this.author});
                this.text = "";
            }
        },
    },
    computed: {
    },
    mounted() {
        socket.on("update", (d) => {
            this.history.push(d);
        })
    },
}).mount('#app');
