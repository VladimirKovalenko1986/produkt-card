import { products } from './js/product';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const refs = {
  list: document.querySelector('.list'),
};

// !!!!!!!!!!!! 1 ВАРІАНТ !!!!!!!!!!!!!!
// renderingMarkup(products);

// function createCardMarkup({ img, name, price }) {
//   return ` <li class="list-items">
//         <img class="list-img" src="${img}" alt="${name}" />
//         <h2 class="list-title">${name}</h2>
//         <p class="list-text">${price}</p>
//       </li>`;
// }

// function renderingMarkup(arr) {
//   const markup = arr.map(createCardMarkup).join('');

//   refs.list.insertAdjacentHTML('beforeend', markup);
// }

// !!!!!!!!!!!! 2 ВАРІАНТ !!!!!!!!!!!!!!

// let markup = '';
// let instance = null;

// for (let product of products) {
//   markup += createCardMarkup(product);
// }

// refs.list.innerHTML = markup;

// const items = refs.list.querySelectorAll('.list-item');

// items.forEach(item => {
//   item.addEventListener('click', onClickItem);
// });

// function onClickItem(e) {
//   const id = Number(e.currentTarget.dataset.id);
//   let info = products.find(item => item.id === id);

//   instance = basicLightbox.create(
//     `
//     <div class="modal">
//       <img class="modal-img" src="${info.img}" alt="" />
//       <h2 class="modal-title">${info.name}</h2>
//        <h3 class="modal-pre-title">${info.description}</h3>
//       <p class="modal-text">Ціна: ${info.price} грн.</p>
//     </div>
// `
//   );
//   instance.show();

//   handleKeyDown(e);

//   window.addEventListener('keydown', handleKeyDown);
// }

// function createCardMarkup({ id, img, name, price }) {
//   const markup = ` <li class="list-item" data-id=${id}>
//                      <img class="list-img" src="${img}" alt="${name}" />
//                      <h2 class="list-title">${name}</h2>
//                      <p class="list-text">Ціна: ${price} грн.</p>
//                    </li>`;
//   return markup;
// }

// function handleKeyDown(e) {
//   if (e.code === 'Escape') {
//     instance.close();
//     window.removeEventListener('keydown', handleKeyDown);
//   }
// }

// !!!!!!!!!!!! 3 ВАРІАНТ більш зрозуміліше !!!!!!!!!!!!!!

let instance = null;
refs.list.innerHTML = createProductMarkup(products);

refs.list.addEventListener('click', onClickModalCardProduct);

function onClickModalCardProduct(e) {
  if (e.target === e.currentTarget) {
    return;
  }
  const card = e.target.closest('.list-item');
  const idClicked = Number(card.dataset.id);

  const { img, name, price, description } = products.find(
    ({ id }) => id === idClicked
  );

  instance = basicLightbox.create(`
                <div class="modal">
                  <img class="modal-img" src="${img}" alt="" />
                  <h2 class="modal-title">${name}</h2>
                  <h3 class="modal-pre-title">${description}</h3>
                  <p class="modal-text">Ціна: ${price} грн.</p>
                </div>
                                  `);
  instance.show();

  handleKeyDown(e);

  window.addEventListener('keydown', handleKeyDown);
}

function createProductMarkup(arr) {
  return arr
    .map(
      ({ id, img, name, price }) => ` 
                  <li class="list-item" data-id=${id}>
                     <img class="list-img" src="${img}" alt="${name}" />
                     <h2 class="list-title">${name}</h2>
                     <p class="list-text">Ціна: ${price} грн.</p>
                   </li>`
    )
    .join('');
}

function handleKeyDown({ code }) {
  if (code === 'Escape') {
    instance.close();
    window.removeEventListener('keydown', handleKeyDown);
  }
}
