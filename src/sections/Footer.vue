<script setup lang="ts">
  import { shallowRef } from "vue";
  import IconNikeLogo from "@/components/icons/IconNikeLogo.vue";
  import IconAppleLogo from "@/components/icons/IconAppleLogo.vue";
  import IconAmazonLogo from "@/components/icons/IconAmazonLogo.vue";
  import IconNetflixLogo from "@/components/icons/IconNetflixLogo.vue";
  import IconPayPalLogo from "@/components/icons/IconPayPalLogo.vue";
  import IconMicrosoftLogo from "@/components/icons/IconMicrosoftLogo.vue";
  import IconVisaLogo from "@/components/icons/IconVisaLogo.vue";

  const companies = shallowRef([
    {
      name: "Nike",
      logo: IconNikeLogo,
      link: "https://www.nike.com",
    },
    {
      name: "Amazon",
      logo: IconAmazonLogo,
      link: "https://www.amazon.com",
    },
    {
      name: "Apple",
      logo: IconAppleLogo,
      link: "https://www.apple.com",
    },
    {
      name: "Netflix",
      logo: IconNetflixLogo,
      link: "https://www.netflix.com",
    },
    {
      name: "PayPal",
      logo: IconPayPalLogo,
      link: "https://www.paypal.com",
    },
    {
      name: "Microsoft",
      logo: IconMicrosoftLogo,
      link: "https://www.microsoft.com",
    },
    {
      name: "VISA",
      logo: IconVisaLogo,
      link: "https://www.visa.com",
    },
  ]);

  const openCompanyWebsite = (url: string) => {
    window.open(url);
  };
</script>

<template>
  <footer>
    <div class="footer-container">
      <p class="footer-title">JobLeaders have been hired by:</p>
      <div class="logos-container">
        <template v-for="company in companies" :key="company.name">
          <component
            :is="company.logo"
            @click="openCompanyWebsite(company.link)"
          />
        </template>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
  @use "@/styles/mixins";

  .footer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 12px;
  }
  .footer-title {
    font-size: 18px;
    font-weight: 400;
    color: #404b5b;
  }
  .logos-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 80px;
    svg {
      cursor: pointer;
    }
    @include mixins.desktopSmall {
      gap: 40px;
    }
    @include mixins.tablet {
      gap: 20px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding: 0 10px;
      justify-items: center;
      svg:last-child {
        grid-column: 2;
      }
    }
  }
</style>
