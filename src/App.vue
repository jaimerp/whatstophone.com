<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <v-app>
    <v-responsive class="mx-auto" max-width="360">
      <v-main>
        <v-container>
          <header>
            <v-row>
              <v-col cols="12">
                <img
                  alt="Whats to Phone logo"
                  class="logo"
                  src="@/assets/logo-wtp.png"
                  width="125"
                  height="125"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <h1 class="green">{{ $t("message.eslogan") }}</h1>
                <h2>{{ $t("message.disclaimer") }}</h2>
              </v-col>
            </v-row>
          </header>
          <v-row>
            <v-col cols="12">
              <RouterView />
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-responsive>
  </v-app>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto;
}

h1 {
  font-weight: bolder;
  font-size: 2.6rem;
  top: -30px;
  text-align: center;
}

h2 {
  font-size: 0.9rem;
  top: -30px;
  text-align: center;
}

@media (min-width: 1024px) {
  .logo {
    margin: 0 auto;
  }

  header .wrapper {
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
