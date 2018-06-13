<template>
  <div class="app">
    <transition name="fade" mode="out-in">
      <div v-if="stats" key="stats">
        At this rate<br>
        <a href="https://github.com/electron/electron"
          target="_blank"
          class="electron"
          :data-balloon="currentLogo('electron') + ' ' + stats.electron.total + ' stars'"
          data-balloon-pos="up"
        >
          Electron
        </a>
        ({{ stats.electron.rate }} stars/day) will take <span class="electron">{{ stats.electron.remainingDays }} days</span>
        <br>
        <a href="https://github.com/nwjs/nw.js"
        target="_blank"
        class="nwjs"
        :data-balloon="currentLogo('nwjs') + ' ' + stats.nwjs.total + ' stars'"
        data-balloon-pos="up"
        >
        NW.js</a>
        ({{ stats.nwjs.rate }} stars/day) will take <span class="nwjs">{{ stats.nwjs.remainingDays }} days</span><br>
        To reach <span class="target">100K stars</span> on GitHub.
        <div class="source">
          - Source: <a target="_blank" href="https://github.com/Armaldio/electron-and-nw.js">Armaldio</a><br>
          - Thanks to <a target="_blank" href="https://github.com/egoist/react-and-vue">EGOIST for the initial work on React vs Vue</a><br>
          - Just for fun.
        </div>
      </div>
      <div v-else key="loading">Loading...</div>
  </transition>
  </div>
</template>

<script>
import getStats from '../lib'

export default {
  data() {
    return {
      stats: null,
    }
  },

  async created() {
    this.setStats()
  },
  computed: {
    currentWinner() {
      return this.stats.electron.total > this.stats.nwjs.total ? "electron" : "nwjs"
    }
  },
  methods: {
    async setStats() {
      this.stats = await getStats()
      setInterval(async () => {
        this.stats = await getStats()
      }, 60000) // 1 minute
    },
     currentLogo(lang) {
       if (this.currentWinner) {
         return this.currentWinner === lang ? "🏆" : "🥈"
       }
    }
  }
}
</script>

<style>
body {
  background: #5f5bd4;
  margin: 0;
  color: white;
  font-family: 'Source Sans Pro', Avenir, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 1.4;
}

a {
  color: white;
}
</style>

<style scoped>
.app {
  padding: 40px;
  font-size: 4rem;
}

.electron {
  color: #4fc08d;
}

.nwjs {
  color: #61dafb;
}

a.electron,a.nwjs {
  text-decoration: none;
}


.target {
  color: yellow;
}

.source {
  margin: 20px 0;
  font-size: 2rem;
  opacity: .5;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .app {
    font-size: 2rem;
    padding: 10px;
  }

  .source {
    font-size: 1rem;
  }
}
</style>
