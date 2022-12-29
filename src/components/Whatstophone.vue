<template>
  <v-form class="text-center">
    <v-select
      :disabled="loading"
      v-model="country"
      :items="items"
      :label="$t('message.country')"
      variant="outlined"
      prepend-inner-icon="mdi-flag"
      return-object
    >
      <template #item="{ item, props }">
        <v-list-item v-bind="props">
          <template v-slot:prepend>
            <v-avatar
              size="35"
              :image="
                'http://127.0.0.1:8000/storage/' +
                item.raw.code.toLowerCase() +
                '.png'
              "
            >
            </v-avatar>
            (+{{ item.raw.prefix }})&nbsp;&nbsp;
          </template>
        </v-list-item>
      </template>
      <template #selection="{ item, props, key }">
        <v-list-item v-bind="props">
          <template v-slot:prepend>
            <v-avatar
              size="35"
              :image="
                'http://127.0.0.1:8000/storage/' +
                item.raw.code.toLowerCase() +
                '.png'
              "
            >
            </v-avatar>
            (+{{ item.raw.prefix }})&nbsp;&nbsp;{{ item.title }}
          </template>
        </v-list-item>
      </template>
    </v-select>

    <v-text-field
      :disabled="loading"
      v-model.number="phone"
      @keypress="isNumber($event)"
      variant="outlined"
      :label="$t('message.phone')"
      style="font-size: 5em !important; text-align: center"
      prepend-inner-icon="mdi-phone"
      clearable
      :prefix="'+' + prefixes[country.value]"
    ></v-text-field>
    <v-btn
      @click="whatsapp()"
      variant="flat"
      prepend-icon="mdi-whatsapp"
      color="green"
      :loading="loading"
    >
      Whatsapp
    </v-btn>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      phone: null,
      country: {value:4, code:'ES', title: 'Spain', prefix: '34'},
      items: [],
      token: "",
      prefixes: [],
      loading: false,
    };
  },
  mounted() {
    axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
    //https://api.whatstophone.com/api/

    axios
      .post("login", {
        name: "app",
        email: "app@whatstophone.com",
        password: "Hsd&723(·)as$2!?3",
      })
      .then((response) => {
        if (response.data.message == "Success") {
          this.token = response.data.token;
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + this.token;
          axios.get("prefixes").then((response) => {
            // https://www.worldometers.info/img/flags/'.$codeCountry.'-flag.gif
            let arrBuffer = response.data;
            arrBuffer.forEach((item, index) => {
              let itemBuffer = {
                value: item.id,
                code: item.code,
                title: item.country_name,
                prefix: item.prefix,
              };
              this.items.push(itemBuffer);
              this.prefixes[item.id] = item.prefix;
            });
            //console.log(this.items)
          });
        }
      });
  },
  methods: {
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    whatsapp() {
      this.loading = true;
      if (this.phone) {
        axios
          .post("/addrequest", {
            phone: this.phone,
            zone_prefix_id: this.country.value,
          })
          .then((response) => {
            if (response.data.message == "Success") {
              window.location.href =
                "https://wa.me/" + this.prefixes[this.country.value] + this.phone;
            }
          })
          .catch((err) => {});
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped>
form {
  top: -30px;
}
.v-text-field >>> input {
  font-size: 2em;
  font-weight: 100;
  text-align: center;
}
</style>
