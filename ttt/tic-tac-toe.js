// this is how to create a component that is globally registered
Vue.component('game-title', {
    template: `
        <h1>
            <a href="https://en.wikipedia.org/wiki/Tic-tac-toe">Tic Tac Toe</a>
        </h1>
    `,
});

Vue.component('welcome-message', {
    props: {
        'message': String,
        'playerNames': {
            type: Array,
            default: () => [],
        }
    },
    computed: {
        // a computed getter
        messageToPlayers() {
            // `this` points to the vm instance
            if (this.playerNames.length) {
                return `${this.message}`;
            } else {
                return this.message;
            }
        }
    },
    template: `
        <p>
          {{ messageToPlayers }}
        </p>
    `,
});

Vue.component('ready-checkbox', {
    props: {
        'name': String,
    },
    data: function() {
        const id = `ready-switch-for-${this.name}`;
        return {
            checked: false,
            id
        };
    },
    methods: {
        onClick(event) {
            this.checked = event.target.checked;
            this.$emit('player-ready', this.name, this.checked);
        } 
    },
    template: `
        <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" :id="id" :checked="checked" @click="onClick">
            <label class="custom-control-label" :for="id">{{name}}, are you ready?</label>
        </div>
    `,
});


const app = new Vue({
    el: '#app',
    data: {
        message: 'Welcome to the game!',
        playerNames: [],
        appClasses: ['w-100', 'h-100', 'p-5', 'd-flex', 'flex-column', 'align-items-center'],
        playerReady: {},
        boardArray: [-1,-1,-1,-1,-1,-1,-1,-1,-1],
        currPlayerIndex: 0,
        winConditions: [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]],
        gameOver: false
    },
    methods: {
        onPlayerReady(playerName, isReady) {
            this.$set(this.playerReady, playerName, isReady);
        },
        nextPlayer(box) {
            if(this.currPlayerIndex==0) {
                document.getElementById(box).innerText = "X";
                this.checkWinner();
                this.currPlayerIndex= 1;
            }
            else {
                document.getElementById(box).innerText = "O";
                this.checkWinner();
                this.currPlayerIndex= 0;
            }
        },
        checkWinner() {
            for(var i = 0; i < this.winConditions.length; i++) {
                if(this.boardArray[this.winConditions[i][0]] !== -1 && 
                    this.boardArray[this.winConditions[i][0]] == this.boardArray[this.winConditions[i][1]] && 
                    this.boardArray[this.winConditions[i][1]]==this.boardArray[this.winConditions[i][2]]) {
                    this.gameOver = true;
                    this.message = "GAME OVER! " + this.playerNames[this.currPlayerIndex] + " WINS! Refresh to play again :)";
                }
            }
        }

    },
    computed: {
        showCheckbox() {
            return this.playerNames.length && !this.playersReady;
        },
        playersReady() {
            return this.playerNames.length && this.playerNames.map(playerName => this.playerReady[playerName]).reduce((prevValue, currValue) => prevValue && currValue);
        }
    }
});

Vue.component('game-board', {
    data: function() {
        return {
            classObject: ['container', 'm-auto', 'bg-light', 'd-flex', 'flex-column'],
            styleObject: {
                'width': '900px',
                'height': '900px'
            },
            boardRowClasses: ['board-row', 'row', 'flex-grow-1'],
            boardCellClasses: ['board-cell', 'col', 'p-4', 'border', 'border-primary', 'rounded-lg'],
        };
    },
    methods: {
        boardRowKey(r) {
            return `row-${r}`;
        },
        boardCellKey(r, c) {
            return `cell-${r}-${c}`;
        },
        onClick(event) {
            if(!app.gameOver) {
                const selectedBox = parseInt(event.target.id, 10)-1;
                if(app.boardArray[selectedBox] == -1) {
                    app.boardArray[selectedBox] = app.currPlayerIndex;
                    this.$emit('player-moved', selectedBox+1);                 
                }
            }
        },
    },
    template: `
        <div id="board" :class="classObject" :style="styleObject">
            <div v-for="r of 3" :key="boardRowKey(r)" :class="boardRowClasses">
                <div
                    v-for="c of 3"
                    :key="boardCellKey(r, c)"
                    :id="(r - 1) * 3 + c"
                    :class="[{'bg-white': [2, 4, 6, 8].includes((r - 1) * 3 + c)} ,boardCellClasses]" style="text-align:center; font-size:60px" @click="onClick">
                </div>
            </div>
        </div>
    `
});


window.setTimeout(() => {
    app.playerNames.push('Crumbo', 'Slim Sandy');
    app.message = 'Ready to get started? '+app.playerNames[0] + ' goes first and ' + app.playerNames[1] + ' second!';
}, 1000);