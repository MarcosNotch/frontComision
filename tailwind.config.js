/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'azul1': "#202634",
        'azul2': "#293042",
        'azul3': "#1659C7",
        'azul4': "#3F80EA",
        'azul5': "#272E3F",
        'gris1': "#898C96",
        'celeste': "#1F9BCF",
        'negro': "#343a4b",
        'orange': "#CC8B37",
      },
      fontFamily:{
        'poppins': ["Poppins", "sans-serif"]
      }
    },
  },
}

