<template>
  <div id="front">
    <h1>OWASP ASVS</h1>
    <input v-model="query" @keyup="search"></input>
    <div class="results no-dizmo-drag">
      <div class="" v-if="results.length > 0">
        <div class="result" v-for="r in results">
          <div class="header">
            <div class="cwe">CWE <span>{{r.CWE}}</span></div>
            <span>-</span>
            <div class="item">Item <span>{{r.Item}}</span></div>
            <span>-</span>
            <div class="section">Section <span>{{r.Section}}</span></div>
            <span>-</span>
            <div class="name">Name <span>{{r.Name}}</span></div>
            <span>-</span>

            <div class="l3 level" v-if="r.L3 === 'X'">Level: 3</div>
            <div class="l2 level" v-else-if="r.L2 === 'X'">Level: 2</div>
            <div class="l1 level" v-else>Level: 1</div>
          </div>

          <div class="description">Description <span>{{r.Description}}</span></div>
        </div>
      </div>
      <div v-else>
        <div>Enter an asset you are trying to protect..</div>
      </div>
    </div>
  </div>
</template>

<script>
var timeOut = 0
export default {
  name: 'App',
  data: () => ({
    message: 'coretm-owasp-asvs',
    query: dizmo.publicStorage.getProperty('query') || '',
    results: [
    ],
  }),
  mounted: function () {
    dizmo.publicStorage.subscribeToProperty('query', (_, q) => {
      this.query = q
      this.submitSearch(q)
    })
  },
  methods: {
    search: function () {
      console.log('clearing')
      clearInterval(timeOut)
      timeOut = setTimeout(this.storeQuery, 500)
    },
    storeQuery: function () {
      dizmo.publicStorage.setProperty('query', this.query)
      console.log(`Searching for ${this.query}`)
    },
    submitSearch: async function (q) {
      var res = await fetch('http://localhost:9200/asvs/_search?pretty', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
      {
        "query": {
          "match": {
            "Description": {
            "query": q
            }
          }
        },
        "sort": [
          {
          }
        ]
      }
      )
      })
      var json = await res.json()
      console.log(json)
      var descriptions = json.hits.hits.map(h => h._source)
      this.results = descriptions
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
    text-align: center;
}
html, body {
  padding: 0.5em;
}
.result {
  margin: 1em 0;
  border: solid 1px #a2a2a2;
  border-radius: 5px;
  padding: 0.5em;
}
#front {
  display: flex;
  flex-direction: column;
}

.results {
  flex-grow: 0;
  flex-shrink: 1;
  overflow: auto;
}
.header > div {
  display: inline-block;
}
</style>
