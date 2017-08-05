var socket = io.connect('http://localhost:9092');
socket.on("connect", function() {
    console.log("Connected");
});
Vue.component('task-list', {
    template: '#task-list',
    props: {
        tasks: { default: [] }
    },
    data() {
        return {
            newTask: ''
        };
    },
    computed: {
        incomplete() {
            return this.tasks.filter(this.inProgress).length;
        }
    },
    methods: {
        addTask() {
            if (this.newTask) {
                this.tasks.push({
                    title: this.newTask,
                    id: this.tasks.length
                });
                this.newTask = '';
            }
        },
        completeTask(task) {
            task.completed = !task.completed;
        },
        removeTask(index) {
            this.tasks.splice(index, 1);
        },
        runTasks() {
            console.log(JSON.stringify(this.tasks));
            socket.emit('updatecontainer', this.tasks);
        },
        clearAll() {
            console.log('clearAll');
            socket.emit('deleteallcontainers', {});
            this.tasks = [];
        },

        inProgress(task) {
            return !this.isCompleted(task);
        },
        isCompleted(task) {
            return task.completed;
        }
    }
});

Vue.component('task-item', {
    template: '#task-item',
    props: ['task'],
    computed: {
        className() {
            let classes = ['tasks__item__toggle'];
            if (this.task.completed) {
                classes.push('tasks__item__toggle--completed');
            }
            return classes.join(' ');
        }
    }
});

new Vue({
    el: '#app',
    data: {
        tasks: []
    }
});