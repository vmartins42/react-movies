const movies = [
    {
      id: '1',
      title: 'Oceans 8',
      category: 'Comedy',
      likes: 4,
      dislikes: 1,
      url:"https://fr.web.img6.acsta.net/c_310_420/pictures/18/05/14/12/19/5676009.jpg"
    }, {
      id: '2',
      title: 'Midnight Sun',
      category: 'Comedy',
      likes: 2,
      dislikes: 0,
      url:"https://fr.web.img6.acsta.net/c_310_420/pictures/18/05/04/13/15/4943524.jpg"
    }, {
      id: '3',
      title: 'Les indestructibles 2',
      category: 'Animation',
      likes: 3,
      dislikes: 1,
      url:"https://fr.web.img5.acsta.net/c_310_420/pictures/18/04/13/15/09/0323902.jpg"
    }, {
      id: '4',
      title: 'Sans un bruit',
      category: 'Thriller',
      likes: 6,
      dislikes: 6,
      url:"https://fr.web.img6.acsta.net/c_310_420/pictures/18/03/22/16/48/2454348.jpg"
    }, {
      id: '5',
      title: 'Creed II',
      category: 'Drame',
      likes: 16,
      dislikes: 2,
      url:"https://fr.web.img3.acsta.net/c_310_420/pictures/18/11/27/14/25/1451897.jpg"
    }, {
      id: '6',
      title: 'Pulp Fiction',
      category: 'Thriller',
      likes: 11,
      dislikes: 3,
      url:"https://fr.web.img2.acsta.net/c_310_420/medias/nmedia/18/36/02/52/18846059.jpg"
    }, {
      id: '7',
      title: 'Pulp Fiction',
      category: 'Thriller',
      likes: 12333,
      dislikes: 32,
      url:"https://fr.web.img2.acsta.net/c_310_420/medias/nmedia/18/36/02/52/18846059.jpg"
    }, {
      id: '8',
      title: 'Seven',
      category: 'Thriller',
      likes: 2,
      dislikes: 1,
      url:"https://fr.web.img6.acsta.net/c_310_420/medias/nmedia/18/35/91/33/19255605.jpg"
    }, {
      id: '9',
      title: 'Inception',
      category: 'Thriller',
      likes: 2,
      dislikes: 1,
      url:"https://fr.web.img6.acsta.net/c_310_420/medias/nmedia/18/72/34/14/19476654.jpg"
    }, {
      id: '10',
      title: 'Gone Girl',
      category: 'Thriller',
      likes: 22,
      dislikes: 12,
      url:"https://fr.web.img3.acsta.net/c_310_420/pictures/14/09/11/17/05/508784.jpg"
    },
  ]
  
  export const movies$ = new Promise((resolve, reject) => setTimeout(resolve, 100, movies))
