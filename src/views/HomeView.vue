<template>
  <v-app>
    <v-system-bar height="50" dark>Vue Tree App</v-system-bar>
    <v-main>
      <CustomTree v-bind:data="parsedTreeData" />
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios"
import CustomTree from "@/components/CustomTree"
import { listToTree } from "@/utils/transformations"

export default {
  name: "HomeView",

  components: {
    CustomTree,
  },

  data() {
    return {
      treeData: [],
    }
  },

  methods: {
    listToTree,
    async getData() {
      const baseApiURL = process.env.VUE_APP_API_BASE_URL
      const apiAccessKey = process.env.VUE_APP_API_ACCESS_KEY
      const dataBinID = process.env.VUE_APP_DATA_BIN_ID

      if (!baseApiURL || !apiAccessKey || !dataBinID) {
        console.error("Failed to fetch api details")
        return
      }

      // API access key
      axios.defaults.headers["X-Access-Key"] = apiAccessKey

      // API URL for fetching json bin by ID
      axios
        .get(`${baseApiURL}/b/${dataBinID}`)
        .then((res) => {
          if (res.status !== 200) {
            console.error("Failed to fetch data")
            return
          }

          this.treeData = res.data.record
        })
        .catch((err) => console.error("Failed to fetch data", err))
    },
  },

  computed: {
    parsedTreeData() {
      if (this.treeData.length === 0) return []

      return listToTree(this.treeData)
    },
  },

  created() {
    this.getData()
  },
}
</script>
