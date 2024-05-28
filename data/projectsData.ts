type Project = {
  title: string
  description: string
  imgSrc: string
  href: string
}

type ProjectsData = {
  [locale: string]: Project[]
}

const projectsData: ProjectsData = {
  en: [
    {
      title: 'A Search Engine',
      description: `What if you could look up any information in the world? Webpages, images, videos
        and more. Google has many features to help you find exactly what you're looking
        for.`,
      imgSrc: '/static/images/google.png',
      href: 'https://www.google.com',
    },
    {
      title: 'The Time Machine',
      description: `Imagine being able to travel back in time or to the future. Simple turn the knob
        to the desired date and press "Go". No more worrying about lost keys or
        forgotten headphones with this simple yet affordable solution.`,
      imgSrc: '/static/images/time-machine.jpg',
      href: '/blog/the-time-machine',
    },
  ],
  'pt-BR': [
    {
      title: 'Um Motor de Busca',
      description: `E se você pudesse procurar qualquer informação no mundo? Páginas da web, imagens, vídeos
        e mais. O Google tem muitos recursos para ajudar você a encontrar exatamente o que está
        procurando.`,
      imgSrc: '/static/images/google.png',
      href: 'https://www.google.com',
    },
    {
      title: 'A Máquina do Tempo',
      description: `Imagine poder viajar de volta no tempo ou para o futuro. Simplesmente gire o botão
        para a data desejada e pressione "Ir". Não se preocupe mais com chaves perdidas ou
        fones de ouvido esquecidos com esta solução simples e acessível.`,
      imgSrc: '/static/images/time-machine.jpg',
      href: '/blog/the-time-machine',
    },
  ],
}

export default projectsData
