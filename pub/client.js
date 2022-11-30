var socket = io();

const MESSAGE    = 0;
const USER_JOIN  = 1;
const USER_LEAVE = 2;
const EVENT_SIZE = 3;

let app = Vue.createApp({
    data() {
        return {
            submit: false,
            text: "",
            author: "aks",
            history: [],
            id: socket.id
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
        socket.on("init", (x) => {
            this.history = x;
        });

        socket.emit("event", USER_JOIN, {"message": "", "author": this.author});
    },
}).mount('#app');
