import React from 'react'

// REACT VARIABLES
export const HEADER_TITLE = 'Catálogo de Moda'
export const TITLE_CATEGORIES = 'CATEGORÍAS DE LOOKS'
export const TITLE_RECOMMENDER = 'RECOMENDADOS PARA TÍ'
export const TITLE_LOOK = '¿TIENES UN LOOK EN MENTE?'
export const TITLE_SELECT_LOOKS = 'Estas son las prendas que tenemos para tí'
export const TITLE_CATALOGUE_LOOKS = 'Estos son los looks {0} que tenemos para tí'
export const TITLE_BAG = 'Bolsa de Compras'
export const TITLE_MY_BAGS = 'Mis Compras'

export const TITLE_SIMILAR_PRODUCTS = 'OTROS PRODUCTOS SIMILARES'
// VARIABLES
export const PATH_IMAGE = ''

// CATEGORIES MODA
export const CATEGORIES = [
  { key: 'cover', text: 'Covers' },
  { key: 'top', text: 'Tops' },
  { key: 'dress', text: 'Dresses' },
  { key: 'middle', text: 'Middles' },
  { key: 'bottom', text: 'Bottoms' }
]

// REACT CONFIG
export const BANNER_TOP = [
  {
    src: '/images/banner1-web.png',
    altText: 'Slide 1',
    caption: '',
    header: (<p>
              <span><strong>¡ESCOGE TU LOOK!</strong> Y TE</span> <br/> 
              <span>RECOMENDAMOS LAS</span> <br/> 
              <span>MEJORES PRENDAS</span>
          </p>),
    key: '1'
  }
];

export const BANNER_BOTTOM = [
  {
    src: '/images/banner2-web.png',
    altText: 'Slide 1',
    caption: '',
    // caption: <span>y te enseñamos las prendas que tenemos para tí!!!</span>,
    // header: (<p>
    //           <span>¡SUBE UNA FOTO DEL</span> <br/> 
    //           <span>LOOK QUE QUIERAS!</span>
    //       </p>),
    key: '1'
  }
];


export const LOOK_URBANO = {key:'URBANO', text:'URBANOS'}
export const LOOK_ELEGANTES = {key:'ELEGANTE', text:'ELEGANTES'}
export const LOOK_CASUALES = { key:'CASUAL', text:'CASUALES'}
export const LOOK_DEPORTIVOS = { key:'SPORT', text: 'DEPORTIVOS'}

export const ITEMS_CATEGORIES = [
  {
    id: 1,
    src: '/images/categories/cat_casual.jpg',
    link: '/estilo/casuales',
    look: LOOK_URBANO
  },
  {
    id: 2,
    src: '/images/categories/cat_elegante.jpg',
    link: '/estilo/elegantes',
    look: LOOK_ELEGANTES
  },
  {
    id: 3,
    src: '/images/categories/cat_casa.jpg',
    link: '/estilo/casa',
    look: LOOK_CASUALES
  },
  {
    id: 4,
    src: '/images/categories/cat_deporte.jpg',
    link: '/estilo/deportivos',
    look: LOOK_DEPORTIVOS
  }
]

// SERVICES URL
export const URL_INDEX_RECOMMENDER = 'https://todo-6drzojst7q-uc.a.run.app/skus_by_look_and_gender?look=URBANO&gender=MUJER&limit=4&offset=27'
export const URL_CATALOGUE_LOOK = 'https://todo-6drzojst7q-uc.a.run.app/skus_by_look_and_gender?look={0}&gender=MUJER&limit=20&offset=0'
export const URL_SEARCH_SKU = 'https://todo-6drzojst7q-uc.a.run.app/skus/'
// export const URL_RECOMMENDER_SAMES = 'https://piloto-druid-spsa.appspot.com/ver1/v11/sku_cross/'
export const URL_RECOMMENDER_SAMES = 'https://todo-6drzojst7q-uc.a.run.app/sku_moda_ver1_cross/'
export const URL_RECOMMENDER_CROSS = 'https://todo-6drzojst7q-uc.a.run.app/sku_moda_ver1_fast/'
export const URL_CHECKOUT = 'https://todo-6drzojst7q-uc.a.run.app/checkout/'

// MESSAGES TOAST
export const MESSAGE_ADD_CART = 'Agregó un producto a la bolsa.'
export const MESSAGE_REMOVE_CART = 'Removió un producto de la bolsa.'