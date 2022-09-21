<template>
  <v-treeview :items="data" :open="open" open-on-click>
    <template v-slot:prepend="{ item, open }">
      <v-icon v-if="item.children.length > 0">
        {{ open ? "mdi-folder-open" : "mdi-folder" }}
      </v-icon>
      <v-icon v-else>
        {{ "mdi-file-document-outline" }}
      </v-icon>
    </template>
  </v-treeview>
</template>

<script>
import { searchTree } from "@/utils/transformations"

export default {
  name: "CustomTree",
  props: ["data"],

  data() {
    return { open: [] }
  },

  mounted() {
    setTimeout(() => {
      if (this.data[0] && this.$route.query.active) {
        const res = searchTree(this.data[0], this.$route.query.active)
        if (!res) {
          alert("Invalid active id provided")
          return
        }

        this.open = res
      }
    }, 1000)
  },
}
</script>
