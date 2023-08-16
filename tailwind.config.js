/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        'blackpink-color':"#FD7AA4",
        'hometitle':"#e3c9be",
        'homesubtitle':"#c2b1b5",
        'cretevote':"#F6896E",
        'c2':"#D7C7B1",
        'c21':"#9FD8E0",
      },
      backgroundImage:{
        homepage:"url('/src/styles/bg/bg1.jpg')",
        bg2:"url('/src/styles/bg/bg2.png')",
        navbg:"url('/src/styles/bg/navbg1.jpg')",
        navbg2:"url('/src/styles/bg/navbg2.jpg')",
        cE:"url('/src/styles/rose2.png')",
        cC:"url('/src/styles/lisa.png')",
        cV:"url('/src/styles/jisoo.png')",
        cVote:"url('/src/styles/jenie.png')",
      },
      fontFamily: {
        Monoton: ['Monoton', 'cursive'],
        Codystar: ['Codystar', "cursive"],
        Nanum: ['Nanum Brush Script', 'cursive'],
        VT323: ['VT323', 'monospace'],
        Lobster: ['Lobster Two', 'cursive'],
        Noticia: ['Noticia Text', 'serif'],
        Handlee: ['Handlee', 'cursive'],
       },
    },
  },
  plugins: [],
}